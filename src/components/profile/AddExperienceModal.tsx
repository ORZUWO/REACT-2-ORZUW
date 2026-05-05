import React, { useState } from 'react';
import { X, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import { api } from '../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileStore } from '../../store/useProfileStore';
import toast from 'react-hot-toast';

interface AddExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExperienceModal: React.FC<AddExperienceModalProps> = ({ isOpen, onClose }) => {
  const { addExperience } = useProfileStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addExperience({
        ...form,
        imageUrl: imageUrl, // Adding the uploaded image URL
        startDate: form.startDate ? new Date(form.startDate).toISOString().split('T')[0] : '',
        endDate: form.isCurrent ? null : (form.endDate ? new Date(form.endDate).toISOString().split('T')[0] : null)
      });
      toast.success('Experience added successfully');
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to add experience');
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
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Add experience</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            <p className="text-sm text-gray-500 mb-4">* Indicates required</p>
            
            <form id="experience-form" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Ex: Retail Sales Manager"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Ex: Microsoft"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Ex: London, United Kingdom"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="isCurrent"
                  name="isCurrent"
                  checked={form.isCurrent}
                  onChange={handleChange}
                  className="w-5 h-5 text-[#0a66c2] border-gray-300 rounded focus:ring-[#0a66c2]"
                />
                <label htmlFor="isCurrent" className="text-sm text-gray-700">I am currently working in this role</label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start date *</label>
                  <input
                    type="date"
                    name="startDate"
                    required
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                  />
                </div>
                {!form.isCurrent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End date *</label>
                    <input
                      type="date"
                      name="endDate"
                      required={!form.isCurrent}
                      value={form.endDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo / Image</label>
                <div className="flex items-center gap-4">
                  {imageUrl ? (
                    <div className="w-16 h-16 rounded border border-gray-200 overflow-hidden shrink-0">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="exp-image"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                    <label
                      htmlFor="exp-image"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                />
              </div>
            </form>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="experience-form"
              disabled={loading || !form.title || !form.company || !form.startDate || (!form.isCurrent && !form.endDate)}
              className="px-4 py-2 bg-[#0a66c2] text-white font-semibold rounded-full hover:bg-[#004182] disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddExperienceModal;
