import React, { useState, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { api } from '../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfileStore } from '../../store/useProfileStore';
import type { Experience } from '../../store/useProfileStore';
import toast from 'react-hot-toast';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience?: Experience | null;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose, experience }) => {
  const { addExperience, updateExperience, deleteExperience } = useProfileStore();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: ''
  });

  useEffect(() => {
    if (experience) {
      setForm({
        title: experience.title || '',
        company: experience.company || '',
        location: experience.location || '',
        startDate: experience.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
        endDate: experience.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
        isCurrent: !experience.endDate,
        description: experience.description || ''
      });
      setImageUrl((experience as any).imageUrl || null);
    } else {
      setForm({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: ''
      });
      setImageUrl(null);
    }
    setShowDeleteConfirm(false);
  }, [experience, isOpen]);

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
      const payload = {
        ...form,
        imageUrl: imageUrl,
        startDate: form.startDate ? new Date(form.startDate).toISOString().split('T')[0] : '',
        endDate: form.isCurrent ? null : (form.endDate ? new Date(form.endDate).toISOString().split('T')[0] : null)
      };

      if (experience?.id) {
        await updateExperience(experience.id, payload);
        toast.success('Experience updated successfully');
      } else {
        await addExperience(payload);
        toast.success('Experience added successfully');
      }
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!experience?.id) return;
    setLoading(true);
    try {
      await deleteExperience(experience.id);
      toast.success('Experience deleted');
      onClose();
    } catch (err: any) {
      toast.error('Failed to delete experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">{experience ? 'Edit experience' : 'Add experience'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar">
            {showDeleteConfirm ? (
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete experience?</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Are you sure you want to delete this experience from your profile? This action cannot be undone.</p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Delete'}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="w-full py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form id="experience-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ex: Senior Product Designer"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Company name *</label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Ex: Google"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Ex: Mountain View, CA"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent bg-gray-50/50"
                  />
                </div>

                <div className="flex items-center gap-3 p-1">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    name="isCurrent"
                    checked={form.isCurrent}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#0a66c2] border-gray-300 rounded-lg focus:ring-[#0a66c2] cursor-pointer"
                  />
                  <label htmlFor="isCurrent" className="text-sm font-semibold text-gray-700 cursor-pointer">I am currently working in this role</label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Start date *</label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      value={form.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent bg-gray-50/50"
                    />
                  </div>
                  {!form.isCurrent && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">End date *</label>
                      <input
                        type="date"
                        name="endDate"
                        required={!form.isCurrent}
                        value={form.endDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent bg-gray-50/50"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Logo / Image</label>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                    {imageUrl ? (
                      <div className="relative w-20 h-20 rounded-xl border border-gray-200 overflow-hidden shrink-0 shadow-sm">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          onClick={() => setImageUrl(null)}
                          className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                        <Building2 className="w-8 h-8 text-gray-300" />
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
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700 hover:bg-gray-50 cursor-pointer transition-all active:scale-95"
                      >
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin text-[#0a66c2]" /> : <Upload className="w-4 h-4 text-[#0a66c2]" />}
                        {uploading ? 'Uploading...' : 'Change Logo'}
                      </label>
                      <p className="text-[11px] text-gray-400 mt-2 font-medium">Recommended: Square PNG or JPG, max 5MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your responsibilities and achievements..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent bg-gray-50/50 resize-none"
                  />
                </div>
              </form>
            )}
          </div>

          <div className="p-5 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              {experience && !showDeleteConfirm && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2.5 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
            {!showDeleteConfirm && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="experience-form"
                  disabled={loading || !form.title || !form.company || !form.startDate || (!form.isCurrent && !form.endDate)}
                  className="px-8 py-2.5 bg-[#0a66c2] text-white font-bold rounded-xl hover:bg-[#004182] disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/10 active:scale-95"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {experience ? 'Update' : 'Save'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExperienceModal;

import { Building2 } from 'lucide-react';
