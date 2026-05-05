import { create } from "zustand";
import { api } from "../lib/axios";
import { cachedGet } from "../lib/apiCache";
import toast from "react-hot-toast";

export interface Post {
  id: string;
  userId?: string;
  author?: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  image?: string;
  imageUrl?: string;
  createdAt?: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author?: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  createdAt?: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;

  setPosts: (posts: Post[]) => void;
  getFeed: () => Promise<void>;
  createPost: (content: string, imageUrl?: string) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  addComment: (postId: string, content: string) => Promise<Comment>;
  getComments: (postId: string) => Promise<Comment[]>;
  repostPost: (id: string) => Promise<void>;
}


const getLikedSet = (): Set<string> => {
  try { return new Set(JSON.parse(localStorage.getItem('aijob_liked_posts') || '[]')); }
  catch { return new Set(); }
};
const saveLiked = (ids: Set<string>) => {
  localStorage.setItem('aijob_liked_posts', JSON.stringify([...ids]));
};

const getLocalComments = () => {
  try { return JSON.parse(localStorage.getItem('aijob_local_comments') || '{}'); }
  catch { return {}; }
};
const saveLocalComments = (commentsMap: any) => {
  localStorage.setItem('aijob_local_comments', JSON.stringify(commentsMap));
};


const getFallbackAuthor = (id: string | number = 'default', name = 'User') => ({
  name: name || "User",
  title: "Professional",
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || id}`,
});


const mapApiPost = (post: any): Post => {
  const likedSet = getLikedSet();
  const localComments = getLocalComments();
  
  const apiIsLiked = post.isLiked ?? post.likedByMe ?? false;
  const isLiked = apiIsLiked || likedSet.has(post.id?.toString());
  const apiLikesCount = post.likesCount ?? post.likeCount ?? 0;
  const apiCommentsCount = post.commentsCount ?? post.commentCount ?? 0;
  
  const savedComments = localComments[post.id?.toString()] || [];

  return {
    ...post,
    id: post.id?.toString(),
    userId: post.userId?.toString() || post.user?.id?.toString(),
    author: post.author || (post.user ? {
      name: post.user.fullName || post.user.name || post.authorName || "User",
      title: post.user.title || post.user.role || "Professional",
      avatar: post.user.avatar || post.user.profilePicture || post.authorImageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user.fullName || post.id}`,
    } : getFallbackAuthor(post.id, post.authorName)),
    image: post.imageUrl || post.image,
    likesCount: isLiked && !apiIsLiked ? apiLikesCount + 1 : apiLikesCount,
    commentsCount: apiCommentsCount + savedComments.length,
    repostsCount: post.repostsCount ?? post.repostCount ?? 0,
    isLiked,
    createdAt: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Just now"
  };
};

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  setPosts: (posts) => set({ posts }),

  getFeed: async () => {
    set({ loading: true, error: null });
    try {
      const rawData = await cachedGet("/Post/feed");
      
      const likedSet = getLikedSet();
      const localComments = getLocalComments();

      const data = Array.isArray(rawData) ? rawData.map(mapApiPost) : [];
      set({ posts: data, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch feed" });
    }
  },

  createPost: async (content, imageUrl) => {
    try {
      
      const response = await api.post("/Post", { content, imageUrl });
      const rawPost = response.data.data || response.data;
      
      const newPost = mapApiPost(rawPost);
      newPost.createdAt = "Just now"; 

      set((state) => ({ posts: [newPost, ...state.posts] }));
      toast.success("Post created");
      return newPost;
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create post");
      throw err;
    }
  },

  deletePost: async (id) => {
    try {
      await api.delete(`/Post/${id}`);
      set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
      toast.success("Post deleted");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete post");
    }
  },

  likePost: async (id) => {
    const { posts } = get();
    const originalPosts = [...posts];

    const likedSet = getLikedSet();
    const currentPost = posts.find(p => p.id === id);
    const wasLiked = currentPost?.isLiked ?? false;
    const nowLiked = !wasLiked;

    if (nowLiked) likedSet.add(id);
    else likedSet.delete(id);
    saveLiked(likedSet);

    
    set({
      posts: posts.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: nowLiked,
              likesCount: nowLiked ? post.likesCount + 1 : Math.max(0, post.likesCount - 1),
            }
          : post
      ),
    });

    try {
      const response = await api.post(`/Post/${id}/like`);
      const data = response.data.data || response.data;

      if (data && typeof data.likeCount === 'number') {
        set({
          posts: get().posts.map((post) =>
            post.id === id
              ? { ...post, likesCount: data.likeCount, isLiked: data.likedByMe }
              : post
          ),
        });
      }
    } catch (err) {
      if (nowLiked) likedSet.delete(id);
      else likedSet.add(id);
      saveLiked(likedSet);
      set({ posts: originalPosts });
      toast.error("Failed to like post");
    }
  },

  repostPost: async (id) => {
    try {
      const response = await api.post(`/Post/${id}/repost`);
      
      
      await get().getFeed();
      
      toast.success("Reposted successfully");
    } catch (err: any) {
      console.error("Repost error:", err);
      toast.error(err.response?.data?.message || "Failed to repost");
    }
  },

  getComments: async (postId) => {
    try {
      const response = await api.get(`/Post/${postId}/comments`);
      const rawData = response.data.data || response.data;
      
      const localCommentsMap = getLocalComments();
      const localComments = localCommentsMap[postId] || [];
      
      const apiComments = Array.isArray(rawData) ? rawData.map((comment: any) => ({
        ...comment,
        id: comment.id?.toString(),
        author: comment.author || (comment.user ? {
          name: comment.user.fullName || comment.user.name || "User",
          avatar: comment.user.avatar || comment.user.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.id}`,
        } : {
          name: "User",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.id}`,
        }),
        createdAt: comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Just now"
      })) : [];

      
      const mergedCommentsMap = new Map();
      apiComments.forEach((c: any) => mergedCommentsMap.set(c.id, c));
      localComments.forEach((c: any) => {
          if (!mergedCommentsMap.has(c.id)) {
             mergedCommentsMap.set(c.id, c);
          }
      });
      return Array.from(mergedCommentsMap.values()).sort((a: any, b: any) => {
        if (a.isOptimistic) return 1;
        if (b.isOptimistic) return -1;
        return 0;
      });
    } catch (err) {
      const localCommentsMap = getLocalComments();
      return localCommentsMap[postId] || [];
    }
  },

  addComment: async (postId, content) => {
    
    const optimisticId = `temp-${Date.now()}`;
    const localComments = getLocalComments();
    const postComments = localComments[postId] || [];
    
    const optimisticComment = {
      id: optimisticId,
      author: {
        name: "You",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${optimisticId}`,
      },
      content,
      createdAt: "Just now",
      isOptimistic: true
    };
    
    localComments[postId] = [...postComments, optimisticComment];
    saveLocalComments(localComments);

    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, commentsCount: (post.commentsCount || 0) + 1 }
          : post
      ),
    }));

    try {
      const response = await api.post(`/Post/${postId}/comments`, { content });
      const rawComment = response.data.data || response.data;
      
      const mappedComment = {
        ...rawComment,
        id: rawComment.id?.toString(),
        author: rawComment.author || (rawComment.user ? {
          name: rawComment.user.fullName || rawComment.user.name || "User",
          avatar: rawComment.user.avatar || rawComment.user.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rawComment.id}`,
        } : {
          name: "User",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${rawComment.id}`,
        }),
        createdAt: "Just now"
      };

      
      const updatedLocalComments = getLocalComments();
      updatedLocalComments[postId] = (updatedLocalComments[postId] || []).filter((c: any) => c.id !== optimisticId);
      saveLocalComments(updatedLocalComments);

      return mappedComment;
    } catch (err: any) {
      
      const updatedLocalComments = getLocalComments();
      updatedLocalComments[postId] = (updatedLocalComments[postId] || []).filter((c: any) => c.id !== optimisticId);
      saveLocalComments(updatedLocalComments);

      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === postId
            ? { ...post, commentsCount: Math.max(0, (post.commentsCount || 1) - 1) }
            : post
        ),
      }));

      toast.error(err.response?.data?.message || "Failed to add comment");
      throw err;
    }
  },
}));
