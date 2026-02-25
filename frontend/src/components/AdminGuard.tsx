import React, { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../hooks/useActor';
import { UserRole } from '../backend';
import { Leaf, Lock, User } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

function ProfileSetupModal({ onComplete }: { onComplete: () => void }) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const saveMutation = useMutation({
    mutationFn: async (displayName: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile({
        name: displayName,
        role: UserRole.user,
        trialStartTime: 0n,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      queryClient.invalidateQueries({ queryKey: ['trialStatus'] });
      onComplete();
    },
    onError: (err: any) => {
      setError(err.message || 'Failed to save profile');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('Please enter your name'); return; }
    saveMutation.mutate(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="w-full max-w-md rounded-2xl shadow-warm-xl p-8 animate-scale-in" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--forest-green)' }}>
            <Leaf size={28} style={{ color: 'var(--gold-accent)' }} />
          </div>
          <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--forest-green)' }}>Welcome!</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--earthy-brown)' }}>Please enter your name to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors"
            style={{ borderColor: 'var(--forest-green)', backgroundColor: 'white', color: 'var(--earthy-brown)' }}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60"
            style={{ backgroundColor: 'var(--forest-green)', color: 'var(--warm-cream)' }}
          >
            {saveMutation.isPending ? 'Saving...' : 'Continue to Admin Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();
  const [loginError, setLoginError] = useState('');

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const profileQuery = useQuery({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const adminQuery = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const profileLoading = actorFetching || profileQuery.isLoading;
  const profileFetched = !!actor && profileQuery.isFetched;
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && profileQuery.data === null;
  const isAdmin = adminQuery.data === true;

  const handleLogin = async () => {
    setLoginError('');
    try {
      await login();
    } catch (error: any) {
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        setLoginError('Login failed. Please try again.');
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  // Loading state
  if (isInitializing || (isAuthenticated && actorFetching)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse" style={{ backgroundColor: 'var(--forest-green)' }}>
            <Leaf size={28} style={{ color: 'var(--gold-accent)' }} />
          </div>
          <p className="font-display text-lg" style={{ color: 'var(--forest-green)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          backgroundColor: 'var(--warm-cream)',
          backgroundImage: 'url(/assets/generated/leaf-pattern-bg.dim_400x400.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
      >
        <div className="w-full max-w-md">
          <div className="rounded-2xl shadow-warm-xl overflow-hidden animate-scale-in">
            {/* Header */}
            <div className="p-8 text-center" style={{ backgroundColor: 'var(--forest-green)' }}>
              <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-4" style={{ borderColor: 'var(--gold-accent)' }}>
                <img
                  src="/assets/generated/neem-leaf-logo.dim_256x256.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--warm-cream)' }}>
                Bevinamarada
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--gold-accent-light)' }}>
                Ayurvedic Store — Admin Panel
              </p>
            </div>

            {/* Login form */}
            <div className="p-8" style={{ backgroundColor: 'var(--warm-cream)' }}>
              <h2 className="font-display text-xl font-semibold mb-6 text-center" style={{ color: 'var(--forest-green)' }}>
                Secure Admin Login
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl border-2" style={{ borderColor: 'var(--forest-green)', backgroundColor: 'white' }}>
                  <Lock size={18} style={{ color: 'var(--forest-green)' }} />
                  <span className="text-sm" style={{ color: 'var(--earthy-brown)' }}>
                    This admin panel is secured with Internet Identity — a cryptographic authentication system.
                  </span>
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg text-sm text-red-700 bg-red-50 border border-red-200">
                    {loginError}
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--forest-green)', color: 'var(--warm-cream)' }}
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <User size={18} />
                      Login with Internet Identity
                    </>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--earthy-brown)', opacity: 0.7 }}>
                  Powered by Internet Computer's decentralized identity system
                </p>
              </div>
            </div>
          </div>

          {/* Back to store */}
          <div className="text-center mt-4">
            <a href="/" className="text-sm hover:underline" style={{ color: 'var(--forest-green)' }}>
              ← Back to Store
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Profile setup
  if (showProfileSetup) {
    return <ProfileSetupModal onComplete={() => profileQuery.refetch()} />;
  }

  // Not admin
  if (profileFetched && adminQuery.isFetched && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--warm-cream)' }}>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'var(--red-danger)' }}>
            <Lock size={28} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--forest-green)' }}>Access Denied</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--earthy-brown)' }}>
            You don't have admin privileges to access this panel.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: 'var(--forest-green)', color: 'var(--warm-cream)' }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
