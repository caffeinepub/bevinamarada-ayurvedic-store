import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';

const ADMIN_USERNAME = 'baslxr';
const ADMIN_PASSWORD = 'bas12345';

const LS_USERNAME_KEY = 'adminSavedUsername';
const LS_PASSWORD_KEY = 'adminSavedPassword';
const LS_REMEMBER_KEY = 'adminRememberMe';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill from localStorage on mount
  useEffect(() => {
    const savedRemember = localStorage.getItem(LS_REMEMBER_KEY) === 'true';
    if (savedRemember) {
      const savedUsername = localStorage.getItem(LS_USERNAME_KEY) || '';
      const savedPassword = localStorage.getItem(LS_PASSWORD_KEY) || '';
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // If already logged in via session, redirect
  useEffect(() => {
    if (sessionStorage.getItem('adminSessionActive') === 'true') {
      navigate({ to: '/admin' });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a brief loading state for UX
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set session
      sessionStorage.setItem('adminSessionActive', 'true');

      // Handle remember me
      if (rememberMe) {
        localStorage.setItem(LS_USERNAME_KEY, username);
        localStorage.setItem(LS_PASSWORD_KEY, password);
        localStorage.setItem(LS_REMEMBER_KEY, 'true');
      } else {
        localStorage.removeItem(LS_USERNAME_KEY);
        localStorage.removeItem(LS_PASSWORD_KEY);
        localStorage.removeItem(LS_REMEMBER_KEY);
      }

      navigate({ to: '/admin' });
    } else {
      setError('Invalid username or password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-forest-50 via-sage-50 to-forest-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-forest-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-800 to-sage-800 px-8 py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-saffron-400 to-gold-500 flex items-center justify-center shadow-lg">
              <img
                src="/assets/generated/neem-leaf-logo.dim_256x256.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white font-display">Admin Portal</h1>
            <p className="text-forest-300 text-sm mt-1">Bevinamarada Ayurvedic Store</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-forest-600" />
              <h2 className="text-lg font-semibold text-forest-800">Sign in to continue</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-forest-700 mb-1.5"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-forest-200 bg-forest-50/50 text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-forest-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2.5 pr-11 rounded-xl border border-forest-200 bg-forest-50/50 text-forest-900 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 hover:text-forest-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2.5">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-forest-300 text-forest-600 focus:ring-forest-500 cursor-pointer accent-forest-600"
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm text-forest-600 cursor-pointer select-none"
                >
                  Remember username &amp; password
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-gradient-to-r from-forest-600 to-sage-600 text-white rounded-xl font-semibold hover:from-forest-700 hover:to-sage-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-forest-500 mt-4">
          &copy; {new Date().getFullYear()} Bevinamarada Ayurvedic Store
        </p>
      </div>
    </div>
  );
}
