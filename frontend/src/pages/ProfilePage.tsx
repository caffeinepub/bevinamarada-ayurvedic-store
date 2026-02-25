import { useState, useEffect } from 'react';
import { User, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '../hooks/useQueries';
import { UserRole } from '../backend';

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile?.name) setName(profile.name);
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    await saveProfile.mutateAsync({
      name: name.trim(),
      role: profile?.role ?? UserRole.admin,
      trialStartTime: profile?.trialStartTime ?? 0n,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-forest-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-forest-800 font-display">Profile Settings</h1>
          <p className="text-forest-500 text-sm">Manage your account information</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-forest-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-forest-100">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <p className="font-bold text-forest-800 text-lg">{name || 'Admin'}</p>
            <p className="text-forest-500 text-sm capitalize">{profile?.role ?? 'admin'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-forest-700">Display Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="border-forest-200 focus:border-forest-500"
            />
          </div>

          {saved && (
            <div className="p-3 bg-forest-50 border border-forest-200 rounded-xl text-forest-700 text-sm">
              ✓ Profile updated successfully!
            </div>
          )}

          <Button
            type="submit"
            disabled={!name.trim() || saveProfile.isPending}
            className="bg-gradient-to-r from-forest-600 to-sage-600 hover:from-forest-700 hover:to-sage-700 text-white"
          >
            {saveProfile.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
