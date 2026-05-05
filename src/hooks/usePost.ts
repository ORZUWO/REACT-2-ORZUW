import { usePostStore, type Post, type Comment } from "../store/usePostStore";
import { useCallback } from "react";

export { type Post, type Comment };

export const usePost = () => {
  const {
    posts,
    loading,
    error,
    getFeed,
    createPost,
    deletePost,
    likePost,
    getComments,
    addComment,
    repostPost,
  } = usePostStore();

  return {
    posts,
    loading,
    error,
    refreshFeed: getFeed,
    createPost,
    deletePost,
    likePost,
    getComments,
    addComment,
    repostPost,
  };
};