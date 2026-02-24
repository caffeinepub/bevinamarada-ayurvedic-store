import React, { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Leaf, Loader2, ShieldX, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useGetCallerUserProfile, useSaveCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [profileName, setProfileName] = useState('');

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const saveProfile = useSaveCallerUserProfile();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      if (error.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim()) return;
    await saveProfile.mutateAsync({ name: profileName.trim() });
  };

  // Loading state
  if (isInitializing || (isAuthenticated && (profileLoading || adminLoading))) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto animate-pulse">
            <Leaf className="w-8 h-8 text-primary" />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="font-semibold text-lg">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card animate-scale-in">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4 shadow-green">
                <Leaf className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                Bevinamarada
              </h1>
              <p className="text-primary font-bold text-lg">Ayurvedic Store</p>
              <p className="text-muted-foreground text-sm mt-2 font-medium">Owner Dashboard</p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-4 border border-border">
                <p className="text-foreground/80 text-sm font-semibold text-center">
                  🌿 Sign in to manage your store inventory, track sales, and monitor revenue
                </p>
              </div>

              <Button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="w-full h-12 text-base font-bold btn-transition bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-green"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In to Dashboard
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile setup
  const showProfileSetup = isAuthenticated && !profileLoading && profileFetched && userProfile === null;
  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card animate-scale-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Welcome!</h2>
              <p className="text-muted-foreground text-sm mt-1 font-medium">Set up your profile to continue</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground font-semibold text-sm mb-1.5 block">
                  Your Name
                </Label>
                <Input
                  id="name"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Enter your name"
                  className="h-11 bg-muted/50 border-border focus:border-primary rounded-xl font-medium"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveProfile()}
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={!profileName.trim() || saveProfile.isPending}
                className="w-full h-11 font-bold btn-transition bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
              >
                {saveProfile.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                ) : (
                  'Continue to Dashboard'
                )}
              </Button>

              <Button variant="ghost" onClick={handleLogout} className="w-full font-semibold text-muted-foreground hover:text-foreground">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Access denied
  if (!adminLoading && isAdmin === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-md text-center">
          <div className="bg-card border border-destructive/30 rounded-2xl p-8 shadow-card animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center mx-auto mb-4">
              <ShieldX className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Access Denied</h2>
            <p className="text-muted-foreground font-medium mb-6">
              You don't have permission to access the owner dashboard.
            </p>
            <Button onClick={handleLogout} variant="outline" className="font-bold border-border hover:bg-muted rounded-xl">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
