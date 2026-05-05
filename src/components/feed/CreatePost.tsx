import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Calendar, FileText, Layout, Send, X, Loader2 } from 'lucide-react';
import { usePost } from '../../hooks/usePost';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../lib/axios';
import toast from 'react-hot-toast';

const CreatePost: React.FC = () => {
  const { createPost } = usePost();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    setIsExpanding(true); 
    try {
      const response = await api.post('/Upload/photo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setImageUrl(response.data.url);
    } catch (err: any) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
      
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleMediaClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!content.trim() && !imageUrl) return;
    await createPost(content, imageUrl || undefined);
    setContent('');
    setImageUrl(null);
    setIsExpanding(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-3">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 shadow-inner">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" 
            alt="Me" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="flex-1">
          <button
            onClick={() => setIsExpanding(true)}
            className={`w-full text-left bg-white border border-gray-300 rounded-full py-3 px-5 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all ${isExpanding ? 'hidden' : 'block'}`}
          >
            Start a post
          </button>

          <AnimatePresence>
            {isExpanding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-3"
              >
                <textarea
                  autoFocus
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What do you want to talk about?"
                  className="w-full bg-white text-sm font-medium text-gray-800 focus:outline-none min-h-[120px] resize-none"
                />
                
                {uploading && (
                  <div className="flex justify-center items-center py-4 bg-gray-50 rounded-lg">
                    <Loader2 className="w-6 h-6 text-[#0a66c2] animate-spin" />
                  </div>
                )}

                {imageUrl && !uploading && (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    <img src={imageUrl} alt="Upload preview" className="w-full max-h-[300px] object-contain bg-gray-50" />
                    <button 
                      onClick={() => setImageUrl(null)}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                  <div className="flex gap-1">
                    <button 
                      onClick={handleMediaClick}
                      disabled={uploading}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 disabled:opacity-50"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                      <Calendar className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setIsExpanding(false);
                        setImageUrl(null);
                        setContent('');
                      }}
                      className="px-4 py-1.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmit}
                      disabled={(!content.trim() && !imageUrl) || uploading}
                      className="px-4 py-1.5 bg-[#0a66c2] text-white text-sm font-semibold rounded-full hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {!isExpanding && (
        <div className="flex justify-between mt-3 px-1">
          <PostAction icon={ImageIcon} label="Media" color="text-[#378fe9]" onClick={handleMediaClick} />
          <PostAction icon={Calendar} label="Event" color="text-[#c37d16]" />
          <PostAction icon={Layout} label="Write article" color="text-[#e06847]" />
        </div>
      )}
    </div>
  );
};

const PostAction: React.FC<{ icon: any, label: string, color: string, onClick?: () => void }> = ({ icon: Icon, label, color, onClick }) => (
  <button 
    onClick={onClick}
    className="flex-1 flex items-center justify-center gap-2 py-3 hover:bg-gray-100 rounded transition-colors group"
  >
    <Icon className={`w-5 h-5 ${color}`} />
    <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">{label}</span>
  </button>
);

export default CreatePost;
