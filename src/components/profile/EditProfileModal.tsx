import React, { useState } from 'react';
import { X, Loader2, Camera, Upload } from 'lucide-react';
import type { UserProfile } from '../../store/useProfileStore';
import { useProfileStore } from '../../store/useProfileStore';
import toast from 'react-hot-toast';

interface EditProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ profile, isOpen, onClose }) => {
  const { updateProfile, updateAbout } = useProfileStore();
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    headline: profile.title || '',
    bio: profile.about || '',
    location: profile.location || '',
    avatarUrl: profile.avatar || '',
    bannerUrl: profile.coverImage || '',
    website: '',
    phone: '',
    openToWork: false,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isAvatar = type === 'avatar';
    if (isAvatar) setUploadingAvatar(true);
    else setUploadingBanner(true);

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await api.post('/Upload/photo', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const url = res.data.url;
      setFormData(prev => ({ 
        ...prev, 
        [isAvatar ? 'avatarUrl' : 'bannerUrl']: url 
      }));
      toast.success(`${isAvatar ? 'Avatar' : 'Banner'} uploaded!`);
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      if (isAvatar) setUploadingAvatar(false);
      else setUploadingBanner(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      await updateAbout(formData.bio);

      
      const payload = {
        userId: Number(profile.userId),
        ...formData
      };
      await updateProfile(profile.id || profile.userId, payload);
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Edit intro</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
          <p className="text-sm text-gray-500 mb-6">* Indicates required</p>

          <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">First name & Last name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                placeholder="Ex: John Doe"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Headline *</label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Bio / About</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Camera className="w-4 h-4" /> Avatar
                </label>
                <div className="flex flex-col gap-2">
                  {formData.avatarUrl && (
                    <img src={formData.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'avatar')}
                      className="hidden"
                      id="avatar-upload"
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg cursor-pointer transition-colors"
                    >
                      {uploadingAvatar ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploadingAvatar ? 'Uploading...' : 'Upload Photo'}
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Banner
                </label>
                <div className="flex flex-col gap-2">
                  {formData.bannerUrl && (
                    <div className="h-16 w-full rounded-lg overflow-hidden border border-gray-200">
                      <img src={formData.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'banner')}
                      className="hidden"
                      id="banner-upload"
                    />
                    <label
                      htmlFor="banner-upload"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg cursor-pointer transition-colors"
                    >
                      {uploadingBanner ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploadingBanner ? 'Uploading...' : 'Upload Banner'}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 pb-4">
              <input
                type="checkbox"
                id="openToWork"
                name="openToWork"
                checked={formData.openToWork}
                onChange={handleChange}
                className="w-4 h-4 text-[#0a66c2] border-gray-300 rounded focus:ring-[#0a66c2]"
              />
              <label htmlFor="openToWork" className="text-sm font-semibold text-gray-700">
                Open to work
              </label>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 text-gray-600 font-semibold hover:bg-gray-200 bg-gray-100 rounded-full transition-colors"
          >
            Cancel
          </button>
          <button
            form="edit-profile-form"
            type="submit"
            disabled={loading}
            className="px-5 py-1.5 bg-[#0a66c2] text-white font-semibold rounded-full hover:bg-[#004182] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
