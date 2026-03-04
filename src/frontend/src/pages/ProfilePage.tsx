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
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  const initials = (name || "Admin").charAt(0).toUpperCase();

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-6 page-enter">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "oklch(0.75 0.22 150 / 0.12)" }}
        >
          <User className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">
            Profile Settings
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your account information
          </p>
        </div>
      </div>

      {/* Admin Info Card */}
      <div
        className="rounded-2xl overflow-hidden shadow-card"
        style={{
          background: "oklch(0.14 0.008 250)",
          border: "1px solid oklch(0.22 0.015 250)",
        }}
      >
        {/* Profile Banner */}
        <div
          className="px-6 py-8 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.11 0.006 250) 0%, oklch(0.75 0.22 150 / 0.15) 100%)",
            borderBottom: "1px solid oklch(0.75 0.22 150 / 0.2)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "oklch(0.75 0.22 150 / 0.06)",
              filter: "blur(20px)",
            }}
          />
          <div className="relative flex items-center gap-5">
            <div
              className="w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center text-2xl font-bold font-display shrink-0 neon-glow-green"
              style={{
                background: "oklch(0.75 0.22 150 / 0.15)",
                border: "2px solid oklch(0.75 0.22 150 / 0.4)",
                color: "oklch(0.75 0.22 150)",
              }}
            >
              {initials}
            </div>
            <div>
              <p className="font-bold text-foreground text-xl font-display">
                {name || "Admin"}
              </p>
              <p className="text-muted-foreground text-sm font-medium capitalize mt-0.5">
                {profile?.role ?? "admin"}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Shield className="w-3.5 h-3.5 text-muted-foreground/50" />
                <p className="text-muted-foreground/50 text-xs">
                  Authorized Administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Store Information */}
        <div
          className="px-6 py-5 space-y-4"
          style={{ borderBottom: "1px solid oklch(0.22 0.015 250)" }}
        >
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Store Information
          </h2>
          <div className="flex items-center gap-3.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.75 0.22 150 / 0.1)" }}
            >
              <Store className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Store Name
              </p>
              <p className="text-sm font-bold text-foreground">
                Bevinamarada Ayurvedic Store
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.72 0.18 200 / 0.1)" }}
            >
              <Shield
                className="w-4 h-4"
                style={{ color: "oklch(0.72 0.18 200)" }}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Username
              </p>
              <p className="text-sm font-bold text-foreground font-mono">
                baslxr
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "oklch(0.65 0.22 250 / 0.1)" }}
            >
              <User
                className="w-4 h-4"
                style={{ color: "oklch(0.65 0.22 250)" }}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Role</p>
              <p className="text-sm font-bold text-foreground">Admin / Owner</p>
            </div>
          </div>
          {profile?.trialStartTime !== undefined && (
            <div className="flex items-center gap-3.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "oklch(0.75 0.18 72 / 0.1)" }}
              >
                <Clock
                  className="w-4 h-4"
                  style={{ color: "oklch(0.75 0.18 72)" }}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  Account Created
                </p>
                <p className="text-sm font-bold text-foreground">
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
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Edit Profile
          </h2>

          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-foreground font-semibold text-sm"
            >
              Display Name
            </Label>
            <Input
              id="name"
              data-ocid="profile.input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your display name"
              className="rounded-xl"
              style={{
                background: "oklch(0.18 0.01 250)",
                border: "1px solid oklch(0.22 0.015 250)",
                color: "oklch(0.94 0.01 250)",
              }}
            />
          </div>

          {saved && (
            <div
              className="p-3.5 rounded-xl text-sm font-semibold flex items-center gap-2"
              style={{
                background: "oklch(0.75 0.22 150 / 0.1)",
                border: "1px solid oklch(0.75 0.22 150 / 0.25)",
                color: "oklch(0.75 0.22 150)",
              }}
              data-ocid="profile.success_state"
            >
              ✓ Profile updated successfully!
            </div>
          )}

          {saveProfile.isError && (
            <div
              className="p-3.5 rounded-xl text-sm font-medium"
              style={{
                background: "oklch(0.62 0.22 25 / 0.1)",
                border: "1px solid oklch(0.62 0.22 25 / 0.2)",
                color: "oklch(0.62 0.22 25)",
              }}
              data-ocid="profile.error_state"
            >
              Failed to save. Please try again.
            </div>
          )}

          <Button
            type="submit"
            data-ocid="profile.submit_button"
            disabled={!name.trim() || saveProfile.isPending}
            className="bg-primary text-primary-foreground font-semibold rounded-xl neon-btn"
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
