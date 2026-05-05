import { create } from "zustand";
import { api } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  userId: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  endorsements: number;
}

export interface UserProfile {
  id: string;
  userId: string;
  fullName: string;
  title: string;
  location: string;
  connections: number;
  avatar: string;
  coverImage: string;
  about: string;
  aboutImage?: string | null;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (id: string, data: any) => Promise<void>;
  updateAbout: (newAbout: string, imageUrl?: string | null) => Promise<void>;
  addExperience: (data: any) => Promise<void>;
  updateExperience: (id: string, data: any) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
  addEducation: (data: any) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  fetchProfile: async (userId: string) => {
    set({ loading: true, error: null });
    
    
    const authUser = useAuthStore.getState().user;
    const isOwnProfile = authUser?.id?.toString() === userId;

    
    const fetchUserInfo = async (): Promise<{ fullName: string; role: string; email: string } | null> => {
      try {
        const res = await api.get('/User/directory');
        const users = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        const found = users.find((u: any) => u.id?.toString() === userId);
        if (found) {
          return {
            fullName: found.fullName || found.userName || "User",
            role: found.role || "Professional",
            email: found.email || "",
          };
        }
      } catch {}
      return null;
    };

    try {
      
      const response = await api.get(`/Profile/by-user/${userId}`);
      const rawData = response.data?.data || response.data || {};
      
      
      let userName = rawData.fullName || rawData.user?.fullName;
      let userTitle = rawData.headline || rawData.title || rawData.user?.title;
      let userAvatar = rawData.avatarUrl || rawData.profilePicture || rawData.avatar || rawData.imageUrl;
      
      if (!userName) {
        if (isOwnProfile) {
          userName = authUser?.fullName || authUser?.email?.split('@')[0] || "User";
          userTitle = userTitle || authUser?.role || "Professional";
        } else {
          const dirUser = await fetchUserInfo();
          if (dirUser) {
            userName = dirUser.fullName;
            userTitle = userTitle || dirUser.role;
          } else {
            userName = "User";
          }
        }
      }

      if (!userAvatar) {
        userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName || userId}`;
      }

      
      let experiences = [];
      try {
        const expRes = await api.get(`/UserExperience/by-user/${userId}`);
        experiences = Array.isArray(expRes.data) ? expRes.data : (expRes.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch experiences', err);
        experiences = Array.isArray(rawData.experiences) ? rawData.experiences : [];
      }

      
      let education = [];
      try {
        const eduRes = await api.get(`/UserEducation/by-user/${userId}`);
        education = Array.isArray(eduRes.data) ? eduRes.data : (eduRes.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch education', err);
        education = Array.isArray(rawData.education) ? rawData.education : [];
      }

      const mappedProfile: UserProfile = {
        id: rawData.id?.toString() || userId,
        userId: userId,
        fullName: userName,
        title: userTitle || "Professional",
        location: rawData.location || rawData.city || "",
        connections: rawData.connections ?? rawData.connectionsCount ?? 0,
        avatar: userAvatar,
        coverImage: rawData.bannerUrl || rawData.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000",
        about: localStorage.getItem(`profile-about-${userId}`) || rawData.bio || rawData.about || rawData.summary || "",
        aboutImage: localStorage.getItem(`profile-about-image-${userId}`) || null,
        experiences: experiences,
        education: education,
        skills: Array.isArray(rawData.skills) && rawData.skills.length > 0
          ? rawData.skills
          : [],
      };

      set({ profile: mappedProfile, loading: false });
    } catch (err: any) {
      
      let userName = "User";
      let userTitle = "Professional";

      if (isOwnProfile) {
        userName = authUser?.fullName || authUser?.email?.split('@')[0] || "User";
        userTitle = authUser?.role || "Professional";
      } else {
        const dirUser = await fetchUserInfo();
        if (dirUser) {
          userName = dirUser.fullName;
          userTitle = dirUser.role;
        }
      }

      const fallbackProfile: UserProfile = {
        id: userId,
        userId: userId,
        fullName: userName,
        title: userTitle,
        location: "",
        connections: 0,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName || userId}`,
        coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=1000",
        about: localStorage.getItem(`profile-about-${userId}`) || "",
        aboutImage: localStorage.getItem(`profile-about-image-${userId}`) || null,
        experiences: [],
        education: [],
        skills: [],
      };
      
      set({ profile: fallbackProfile, loading: false, error: "Profile not yet created." });
    }
  },

  updateProfile: async (id: string, data: any) => {
    set({ loading: true, error: null });
    try {
      try {
        await api.put(`/Profile/${id}`, data);
      } catch (err: any) {
        if (err.response?.status === 404) {
          
          await api.post(`/Profile`, data);
        } else {
          throw err;
        }
      }
      
      
      const userId = get().profile?.userId || id;
      await get().fetchProfile(userId);
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update profile",
        loading: false,
      });
      throw err;
    }
  },

  updateAbout: async (newAbout: string, imageUrl?: string | null) => {
    const profile = get().profile;
    if (!profile) return;
    
    
    if (newAbout !== undefined) {
      localStorage.setItem(`profile-about-${profile.userId}`, newAbout);
    }
    if (imageUrl !== undefined) {
      if (imageUrl) localStorage.setItem(`profile-about-image-${profile.userId}`, imageUrl);
      else localStorage.removeItem(`profile-about-image-${profile.userId}`);
    }

    
    set({ profile: { ...profile, about: newAbout, aboutImage: imageUrl ?? profile.aboutImage } });
    
    try {
      const payload = {
        userId: profile.userId,
        fullName: profile.fullName,
        title: profile.title,
        location: profile.location,
        avatarUrl: profile.avatar,
        bannerUrl: profile.coverImage,
        bio: newAbout,
        about: newAbout
      };
      
      try {
        await api.put(`/Profile/${profile.id}`, payload);
      } catch (err: any) {
        if (err.response?.status === 404) {
          await api.post(`/Profile`, payload);
        } else {
          console.warn("Backend update failed, keeping local state:", err);
        }
      }
    } catch (err) {
      console.error("Failed to sync about section to server", err);
    }
  },

  addExperience: async (data: any) => {
    set({ loading: true, error: null });
    try {
      const authUser = useAuthStore.getState().user;
      if (!authUser?.id) throw new Error("Not authenticated");

      const payload = {
        userId: authUser.id,
        title: data.title,
        company: data.company,
        location: data.location || "Remote",
        startDate: data.startDate,
        endDate: data.endDate || null,
        isCurrent: data.isCurrent || false,
        description: data.description || ""
      };

      await api.post(`/UserExperience`, payload);
      
      
      await get().fetchProfile(authUser.id.toString());
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to add experience",
        loading: false,
      });
      throw err;
    }
  },

  updateExperience: async (id: string, data: any) => {
    set({ loading: true, error: null });
    try {
      const authUser = useAuthStore.getState().user;
      if (!authUser?.id) throw new Error("Not authenticated");

      const payload = {
        userId: authUser.id,
        title: data.title,
        company: data.company,
        location: data.location || "Remote",
        startDate: data.startDate,
        endDate: data.isCurrent ? null : data.endDate,
        isCurrent: data.isCurrent || false,
        description: data.description || "",
        imageUrl: data.imageUrl
      };

      await api.put(`/UserExperience/${id}`, payload);
      await get().fetchProfile(authUser.id.toString());
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update experience",
        loading: false,
      });
      throw err;
    }
  },

  deleteExperience: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const authUser = useAuthStore.getState().user;
      await api.delete(`/UserExperience/${id}`);
      if (authUser?.id) {
        await get().fetchProfile(authUser.id.toString());
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to delete experience",
        loading: false,
      });
      throw err;
    }
  },

  addEducation: async (data: any) => {
    set({ loading: true, error: null });
    try {
      const authUser = useAuthStore.getState().user;
      if (!authUser?.id) throw new Error("Not authenticated");

      const payload = {
        userId: authUser.id,
        institution: data.institution,
        degree: data.degree,
        field: data.field || "",
        startDate: data.startDate,
        endDate: data.endDate || null,
        description: data.description || ""
      };

      await api.post(`/UserEducation`, payload);
      
      
      await get().fetchProfile(authUser.id.toString());
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to add education",
        loading: false,
      });
      throw err;
    }
  },
}));

