import React, { useState, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { api } from '../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileStore } from '../../store/useProfileStore';
import toast from 'react-hot-toast';

interface EditAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAbout: string;
  currentImage?: string | null;
}

const EditAboutModal: React.FC<EditAboutModalProps> = ({ isOpen, onClose, currentAbout, currentImage }) => {
  const { updateAbout } = useProfileStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [about, setAbout] = useState(currentAbout);
  const [imageUrl, setImageUrl] = useState<string | null>(currentImage || null);

  useEffect(() => {
    setAbout(currentAbout);
    setImageUrl(currentImage || null);
  }, [currentAbout, currentImage, isOpen]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateAbout(about, imageUrl);
      toast.success('About section updated successfully');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update about section');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await api.post('/Upload/photo', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImageUrl(res.data.url);
      toast.success('Image uploaded!');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await updateAbout('', null);
      toast.success('About section removed');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove about section');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Edit about</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.
            </p>
            
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={6}
              placeholder="Ex: I'm a software engineer with 5 years of experience..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent resize-y mb-4"
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Image (Optional)</label>
              <div className="flex items-center gap-4">
                {imageUrl ? (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                    <img src={imageUrl} alt="About preview" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setImageUrl(null)}
                      className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-8 h-8 mb-1" />
                    <span className="text-[10px]">No image</span>
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    id="about-image-upload"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <label
                    htmlFor="about-image-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
            <button
              onClick={handleDelete}
              disabled={loading || !currentAbout}
              className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50"
            >
              Delete
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-[#0a66c2] text-white font-semibold rounded-full hover:bg-[#004182] disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditAboutModal;
