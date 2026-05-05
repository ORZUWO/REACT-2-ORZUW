import React, { useState, useEffect, useCallback } from "react";
import { ThumbsUp, MessageSquare, Repeat2, Send, MoreHorizontal, X, Trash2, Edit2, Loader2, Globe } from "lucide-react";
import { usePost, type Post } from "../../hooks/usePost";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { SharePostDialog } from "./SharePostDialog";

interface PostCardProps {
  post: Post;
  onLike?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRepost?: (id: string) => void;
}

const getFullImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('blob:')) return url;
  const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'https://backendaijob.onrender.com';
  return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
};

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onDelete, onRepost }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [reposting, setReposting] = useState(false);
  const navigate = useNavigate();

  const handleAuthorClick = () => {
    if (post.userId) {
      navigate(`/profile/${post.userId}`);
    }
  };

  const handleRepost = async () => {
    if (!onRepost || reposting) return;
    setReposting(true);
    try {
      await onRepost(post.id);
    } finally {
      setReposting(false);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm mb-3 overflow-hidden relative"
    >
      
      <div className="flex justify-between p-3 pb-2">
        <div className="flex gap-2">
          <div 
            onClick={handleAuthorClick}
            className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img 
              src={post.author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.id}`} 
              alt={post.author?.name || "User"} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <h4 
              onClick={handleAuthorClick}
              className="text-sm font-bold text-gray-900 hover:text-[#0a66c2] hover:underline cursor-pointer tracking-tight"
            >
              {post.author?.name || "Professional Name"}
            </h4>
            <p className="text-xs text-gray-500 truncate max-w-[240px] leading-tight mt-0.5">
              {post.author?.title || "Industry Expert"}
            </p>
            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
              {post.createdAt || "Just now"} • <Globe className="w-2.5 h-2.5" />
            </p>
          </div>
        </div>
        <div className="flex items-start gap-1 relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-48 overflow-hidden py-1"
              >
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors font-semibold">
                  <Edit2 className="w-4 h-4" /> Edit post
                </button>
                <button 
                  onClick={() => {
                    onDelete?.(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-semibold"
                >
                  <Trash2 className="w-4 h-4" /> Delete post
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      
      <div className="px-3 pb-3">
        <p className="text-[13.5px] text-gray-800 leading-[1.5] whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      
      {(post.image || post.imageUrl) && (
        <div className="bg-[#f9fafb] border-y border-gray-100 flex justify-center overflow-hidden">
          <img 
            src={getFullImageUrl(post.image || post.imageUrl)} 
            alt="Post content" 
            className="max-w-full h-auto max-h-[520px] object-contain transition-transform hover:scale-[1.01] duration-500" 
          />
        </div>
      )}

      
      <div className="px-3 py-2 flex justify-between border-b border-gray-100 mx-2">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="bg-[#378fe9] rounded-full p-0.5 border border-white z-10">
              <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
            </div>
          </div>
          <span className="text-[11px] text-gray-500 hover:text-[#0a66c2] hover:underline cursor-pointer ml-1">
            {post.likesCount || 0}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="text-[11px] text-gray-500 hover:text-[#0a66c2] hover:underline cursor-pointer">
            {post.commentsCount || 0} comments
          </span>
          <span className="text-[11px] text-gray-500 hover:text-[#0a66c2] hover:underline cursor-pointer">
            {post.repostsCount || 0} reposts
          </span>
        </div>
      </div>

      
      <div className="flex justify-between px-2 py-1">
        <ActionBtn 
          icon={ThumbsUp} 
          label="Like" 
          active={post.isLiked} 
          onClick={() => onLike?.(post.id)}
        />
        <ActionBtn 
          icon={MessageSquare} 
          label="Comment" 
          onClick={() => setShowComments(!showComments)}
        />
        <ActionBtn 
          icon={reposting ? Loader2 : Repeat2} 
          label={reposting ? "Reposting..." : "Repost"} 
          onClick={handleRepost}
          className={reposting ? "animate-pulse" : ""}
        />
        <SharePostDialog post={post}>
          <ActionBtn icon={Send} label="Send" />
        </SharePostDialog>
      </div>

      
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-100"
          >
            <CommentSection postId={post.id} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface CommentSectionProps {
  postId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { getComments, addComment } = usePost();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const data = await getComments(postId);
    setComments(data || []);
    setLoading(false);
  }, [postId, getComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const added = await addComment(postId, newComment);
      setComments((prev) => [...prev, added]);
      setNewComment("");
    } catch (err) {
      
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-3 bg-gray-50/30">
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0 mt-0.5">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" alt="Me" className="w-full h-full" />
        </div>
        <div className="flex-1 relative group">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-white border border-gray-300 rounded-full px-4 py-2 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
          />
          {newComment.trim() && (
            <button
              type="submit"
              disabled={submitting}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a66c2] text-white font-bold text-[11px] px-3 py-1 rounded-full hover:bg-[#004182] disabled:opacity-50 transition-all"
            >
              {submitting ? "..." : "Post"}
            </button>
          )}
        </div>
      </form>

      
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-5 h-5 text-[#0a66c2] animate-spin" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-2 group">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                <img 
                  src={comment.author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.id}`} 
                  alt={comment.author?.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1">
                <div className="bg-[#f2f2f2] rounded-lg p-2.5 relative group-hover:bg-[#ebebeb] transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <h5 className="text-[12px] font-bold text-gray-900 hover:text-[#0a66c2] hover:underline cursor-pointer">{comment.author?.name || "User"}</h5>
                      <p className="text-[10px] text-gray-500 leading-tight truncate max-w-[200px]">{comment.author?.title || "Professional"}</p>
                    </div>
                    <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">{comment.createdAt || "Just now"}</span>
                  </div>
                  <p className="text-[12.5px] text-gray-800 mt-2 leading-relaxed">{comment.content}</p>
                </div>
                <div className="flex gap-3 mt-1 ml-1">
                  <button className="text-[11px] font-bold text-gray-500 hover:text-[#0a66c2] transition-colors">Like</button>
                  <div className="w-[1px] h-[10px] bg-gray-300 self-center"></div>
                  <button className="text-[11px] font-bold text-gray-500 hover:text-[#0a66c2] transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs text-gray-500 text-center py-4 italic">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

const ActionBtn: React.FC<{ 
  icon: any, 
  label: string, 
  active?: boolean, 
  onClick?: () => void,
  className?: string
}> = ({ icon: Icon, label, active, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 rounded-md transition-all ${active ? 'text-[#0a66c2]' : 'text-gray-500'} ${className}`}
  >
    <Icon className={`w-5 h-5 ${label === "Reposting..." ? "animate-spin" : ""}`} fill={active ? "currentColor" : "none"} />
    <span className="text-sm font-semibold">{label}</span>
  </button>
);

export default PostCard;