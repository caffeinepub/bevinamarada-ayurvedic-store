import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import ProfileSetupModal from './ProfileSetupModal';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { Loader2, ShieldX } from 'lucide-react';
import { UserRole } from '../backend';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function AdminLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 to-sage-50 flex">
      {/* Sidebar skeleton */}
      <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-forest-900 to-sage-900 p-4 gap-4">
        <div className="flex items-center gap-3 px-2 py-3">
          <Skeleton className="w-10 h-10 rounded-xl bg-white/10" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28 bg-white/10" />
            <Skeleton className="h-3 w-20 bg-white/10" />
          </div>
        </div>
        <div className="space-y-2 mt-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl bg-white/10" />
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Top header skeleton */}
        <div className="h-16 bg-white border-b border-forest-100 flex items-center justify-between px-6">
          <Skeleton className="h-6 w-40" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>

        {/* Dashboard content skeleton */}
        <div className="flex-1 p-6 space-y-6">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminGuard() {
  const navigate = useNavigate();

  // Check admin portal session first
  const hasAdminSession = sessionStorage.getItem('adminSessionActive') === 'true';

  useEffect(() => {
    if (!hasAdminSession) {
      navigate({ to: '/admin-login' });
    }
  }, [hasAdminSession, navigate]);

  const { identity, loginStatus, login } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;
  const isAdmin = userProfile?.role === UserRole.admin;
  const isAccessDenied = isAuthenticated && !profileLoading && isFetched && userProfile !== null && !isAdmin;

  // While redirecting (no session), show nothing
  if (!hasAdminSession) {
    return null;
  }

  // Not yet authenticated — show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-50 to-sage-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-forest-500 to-sage-600 flex items-center justify-center shadow-lg">
            <img src="/assets/generated/neem-leaf-logo.dim_256x256.png" alt="Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-forest-800 mb-2 font-display">Admin Portal</h1>
          <p className="text-forest-600 mb-8">Bevinamarada Ayurvedic Store</p>
          <p className="text-forest-700 mb-6">Please log in to access the admin dashboard.</p>
          <button
            onClick={login}
            disabled={isLoggingIn}
            className="w-full py-3 px-6 bg-gradient-to-r from-forest-600 to-sage-600 text-white rounded-xl font-semibold hover:from-forest-700 hover:to-sage-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login with Internet Identity'
            )}
          </button>
        </div>
      </div>
    );
  }

  // Authenticated but profile still loading — show full skeleton immediately
  if (profileLoading || !isFetched) {
    return <AdminLoadingSkeleton />;
  }

  if (showProfileSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-50 to-sage-50">
        <ProfileSetupModal
          open={true}
          onComplete={() => {}}
        />
      </div>
    );
  }

  if (isAccessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-50 to-sage-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldX className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-forest-800 mb-2 font-display">Access Denied</h1>
          <p className="text-forest-600 mb-4">You don't have admin privileges to access this area.</p>
          <p className="text-sm text-forest-500">Contact the store owner to request admin access.</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
