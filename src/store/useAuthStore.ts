import { create } from "zustand";
import { api } from "../lib/axios";
import axios from "axios";

interface User {
  id?: string | number;
  email: string;
  fullName: string;
  role?: string;
  organizationId?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  loginSuccess: (token: string, user?: any) => void;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const extractUserFromToken = (token: string, fallbackEmail: string, fallbackName?: string) => {
  const decoded = parseJwt(token);
  if (!decoded) return { email: fallbackEmail, fullName: fallbackName || fallbackEmail.split("@")[0] };
  
  const id = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || decoded.nameid || decoded.sub || decoded.id;
  const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;
  const email = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || decoded.email || fallbackEmail;
  const fullName = decoded.name || fallbackName || email.split("@")[0];
  
  return { id, email, role, fullName };
};

const extractErrorMessage = (err: any, defaultMsg: string) => {
  const data = err.response?.data;
  if (!data) return err.message || defaultMsg;
  
  if (Array.isArray(data.message)) return data.message.join(", ");
  if (typeof data.message === "string") return data.message;
  
  if (Array.isArray(data)) {
    return data.map(e => e.message || JSON.stringify(e)).join(", ");
  }
  
  return data.title || data.error || defaultMsg;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const payload = {
        email,
        password
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auth/login`, payload);
      const data = response.data;

      const token =
        typeof data === "string"
          ? data
          : data.token || data.data?.token || data.data;

      if (!token || typeof token !== "string") {
        throw new Error("Token не пришёл с backend");
      }

      let user = data.user || data.data?.user;
      if (!user || !user.id) {
        user = { ...user, ...extractUserFromToken(token, email) };
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,
        user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err: any) {
      const message = extractErrorMessage(err, "Login error");
      
      set({
        error: message,
        loading: false,
      });

      throw new Error(message);
    }
  },

  loginSuccess: (token, userData) => {
    let user = userData;
    if (!user || !user.id) {
      user = { ...user, ...extractUserFromToken(token, user?.email || "user@example.com") };
    }
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    
    set({
      token,
      user,
      isAuthenticated: true,
      loading: false,
    });
  },

  register: async (userData) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/Auth/register`, {
        ...userData,
        role: userData.role || "Candidate",
      });

      const data = response.data;

      const token =
        typeof data === "string"
          ? data
          : data.token || data.data?.token || data.data;

      let user = data.user || data.data?.user;
      if (token && typeof token === "string") {
        if (!user || !user.id) {
          user = { ...user, ...extractUserFromToken(token, userData.email, userData.fullName) };
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        set({
          token,
          user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
    } catch (err: any) {
      const message = extractErrorMessage(err, "Register error");
      set({
        error: message,
        loading: false,
      });

      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));