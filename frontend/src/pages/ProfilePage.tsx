import React, { useState, useEffect } from 'react';
import { User, Shield, Clock, Edit3, Save, X, Copy, Check } from 'lucide-react';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useGetTrialStatus } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRole } from '../backend';

export default function ProfilePage() {
  const { identity } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: trialStatus, isLoading: trialLoading } = useGetTrialStatus();
  const saveMutation = useSaveCallerUserProfile();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (profile) setName(profile.name);
  }, [profile]);

  const principalId = identity?.getPrincipal().toString() ?? '';

  const handleSave = async () => {
    if (!profile) return;
    await saveMutation.mutateAsync({
      name,
      role: profile.role,
      trialStartTime: profile.trialStartTime ?? 0n,
    });
    setEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(principalId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const trialDaysRemaining = Number(trialStatus?.daysRemaining ?? 0n);
  const trialActive = trialStatus?.trialActive ?? false;

  const initials = (profile?.name ?? 'A')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6 animate-fade-in-up max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-saffron flex items-center justify-center shadow-saffron">
            <User size={20} className="text-white" />
          </div>
          My Profile
        </h1>
        <p className="text-muted-foreground mt-1">Manage your admin account details</p>
      </div>

      {/* Profile Card */}
      <div className="admin-card overflow-hidden">
        {/* Banner */}
        <div className="gradient-hero h-28 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl gradient-saffron flex items-center justify-center text-white text-2xl font-bold shadow-saffron border-4 border-card">
              {profileLoading ? '?' : initials}
            </div>
          </div>
        </div>

        <div className="pt-14 px-6 pb-6">
          {profileLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-32" />
            </div>
          ) : (
            <>
              {editing ? (
                <div className="flex items-center gap-3 mb-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-xl font-bold bg-muted border border-border rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron"
                    autoFocus
                  />
                  <button
                    onClick={handleSave}
                    disabled={saveMutation.isPending}
                    className="p-2 rounded-xl gradient-saffron text-white shadow-saffron hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    <Save size={16} />
                  </button>
                  <button
                    onClick={() => { setEditing(false); setName(profile?.name ?? ''); }}
                    className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-border transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{profile?.name ?? 'Admin'}</h2>
                  <button
                    onClick={() => setEditing(true)}
                    className="p-1.5 rounded-lg bg-saffron-light text-saffron hover:bg-saffron hover:text-white transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              )}
              <span className="badge-saffron capitalize">
                <Shield size={11} />
                {String(profile?.role ?? 'admin')}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Details Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Principal ID */}
        <div className="admin-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center">
              <Shield size={15} className="text-white" />
            </div>
            <h3 className="font-semibold text-foreground">Principal ID</h3>
          </div>
          <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
            <code className="text-xs font-mono text-foreground flex-1 truncate">
              {principalId || 'Not available'}
            </code>
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Your unique blockchain identity</p>
        </div>

        {/* Role */}
        <div className="admin-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-saffron flex items-center justify-center">
              <User size={15} className="text-white" />
            </div>
            <h3 className="font-semibold text-foreground">Account Role</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-saffron text-sm capitalize px-3 py-1">
              <Shield size={13} />
              {String(profile?.role ?? 'admin')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Your access level in the system</p>
        </div>
      </div>

      {/* Trial Status */}
      <div className="admin-card overflow-hidden">
        <div className={`px-6 py-4 ${trialActive ? 'gradient-teal' : 'gradient-coral'}`}>
          <div className="flex items-center gap-2 text-white">
            <Clock size={18} />
            <h3 className="font-bold text-lg">Trial Status</h3>
          </div>
        </div>
        <div className="p-6">
          {trialLoading ? (
            <Skeleton className="h-16 w-full rounded-xl" />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground text-lg">
                  {trialActive ? `${trialDaysRemaining} days remaining` : 'Trial Expired'}
                </p>
                <p className="text-muted-foreground text-sm mt-0.5">
                  {trialActive
                    ? 'Your trial is currently active'
                    : 'Your trial period has ended'}
                </p>
                {trialStatus?.trialStartTime && Number(trialStatus.trialStartTime) > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Started: {new Date(Number(trialStatus.trialStartTime) / 1_000_000).toLocaleDateString('en-IN')}
                  </p>
                )}
              </div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${trialActive ? 'gradient-teal shadow-teal' : 'gradient-coral shadow-coral'}`}>
                <Clock size={28} className="text-white" />
              </div>
            </div>
          )}
          {trialActive && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                <span>Trial Progress</span>
                <span>{7 - trialDaysRemaining}/7 days used</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-teal rounded-full transition-all duration-500"
                  style={{ width: `${((7 - trialDaysRemaining) / 7) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Admin Details */}
      <div className="admin-card overflow-hidden">
        <div className="gradient-violet px-6 py-4">
          <h3 className="font-bold text-lg text-white">Admin Details</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground text-sm font-medium">Display Name</span>
            <span className="font-semibold text-foreground">{profile?.name ?? '—'}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground text-sm font-medium">Role</span>
            <span className="badge-saffron capitalize">{String(profile?.role ?? 'admin')}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-muted-foreground text-sm font-medium">Principal ID</span>
            <code className="text-xs font-mono text-foreground bg-muted px-2 py-1 rounded-lg max-w-32 truncate">
              {principalId ? `${principalId.slice(0, 16)}...` : '—'}
            </code>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-muted-foreground text-sm font-medium">Trial Status</span>
            <span className={trialActive ? 'badge-teal' : 'badge-coral'}>
              {trialActive ? `Active (${trialDaysRemaining}d)` : 'Expired'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
