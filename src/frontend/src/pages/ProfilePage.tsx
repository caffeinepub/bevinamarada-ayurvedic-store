import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Loader2, Save, Shield, Store, User } from "lucide-react";
import { useEffect, useState } from "react";
import { UserRole } from "../backend";
import {
  useGetCallerUserProfile,
  useSaveCallerUserProfile,
} from "../hooks/useQueries";

export default function ProfilePage() {
  const { data: profile, isLoading } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();
  const [name, setName] = useState("");
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
      <div
        className="flex items-center justify-center h-64"
        data-ocid="profile.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-forest" />
          <p className="text-muted-foreground text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  const initials = (name || "Admin").charAt(0).toUpperCase();

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-card-green flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground font-heading">
            Profile Settings
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your account information
          </p>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
        {/* Profile Banner */}
        <div className="gradient-forest px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold font-heading shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-white text-lg font-heading">
                {name || "Admin"}
              </p>
              <p className="text-white/70 text-sm capitalize">
                {profile?.role ?? "admin"}
              </p>
            </div>
          </div>
        </div>

        {/* Admin Details */}
        <div className="px-6 py-5 border-b border-border space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Store Information
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
              <Store className="w-4 h-4 text-forest" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Store Name</p>
              <p className="text-sm font-semibold text-foreground">
                Bevinamarada Ayurvedic Store
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-forest" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Username</p>
              <p className="text-sm font-semibold text-foreground font-mono">
                baslxr
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-forest" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="text-sm font-semibold text-foreground">
                Admin / Owner
              </p>
            </div>
          </div>
          {profile?.trialStartTime !== undefined && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-gold-dark" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Account Created</p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(
                    Number(profile.trialStartTime) / 1_000_000,
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Edit Display Name */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Edit Profile
          </h2>

          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-foreground font-medium">
              Display Name
            </Label>
            <Input
              id="name"
              data-ocid="profile.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
              className="border-border focus:border-forest focus:ring-forest/20"
            />
          </div>

          {saved && (
            <div
              className="p-3 bg-forest/5 border border-forest/20 rounded-xl text-forest text-sm font-medium"
              data-ocid="profile.success_state"
            >
              ✓ Profile updated successfully!
            </div>
          )}

          {saveProfile.isError && (
            <div
              className="p-3 bg-destructive/5 border border-destructive/20 rounded-xl text-destructive text-sm"
              data-ocid="profile.error_state"
            >
              Failed to save. Please try again.
            </div>
          )}

          <Button
            type="submit"
            data-ocid="profile.submit_button"
            disabled={!name.trim() || saveProfile.isPending}
            className="bg-forest hover:bg-forest-dark text-white"
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
