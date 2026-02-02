import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { profileAPI } from '../../services/api';
import { validateProfileForm } from '../../utils/validation';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { UserIcon, EnvelopeIcon, PencilIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ProfileCard = () => {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateProfileForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await profileAPI.updateProfile(formData);
      updateUser(response.data.data.user);
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || ''
    });
    setErrors({});
    setEditing(false);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Profile</h2>
        {!editing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing(true)}
            className="flex items-center gap-2"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </Button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
            icon={UserIcon}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            icon={EnvelopeIcon}
            required
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={200}
              className={`
                block w-full rounded-xl border-0 bg-gray-800/50 text-white placeholder-gray-500
                focus:ring-2 focus:ring-indigo-500 transition-all duration-200
                px-4 py-3 ring-1 ring-gray-700 hover:ring-gray-600 resize-none
                ${errors.bio ? 'ring-2 ring-red-500' : ''}
              `}
            />
            <p className="text-xs text-gray-500 text-right">
              {formData.bio.length}/200 characters
            </p>
            {errors.bio && (
              <p className="text-sm text-red-400">{errors.bio}</p>
            )}
          </div>

          {errors.submit && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50">
              <p className="text-sm text-red-400">{errors.submit}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-3xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{user?.name}</h3>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-700">
              <p className="text-sm text-gray-400 mb-1">Bio</p>
              <p className="text-gray-200">
                {user?.bio || 'No bio added yet.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Member Since</p>
                <p className="text-gray-200">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-gray-700/30 border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Account ID</p>
                <p className="text-gray-200 text-sm font-mono truncate">
                  {user?.id || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
