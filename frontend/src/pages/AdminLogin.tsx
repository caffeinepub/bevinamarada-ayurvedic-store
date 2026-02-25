import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, Lock, User, Zap } from 'lucide-react';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set session in sessionStorage always
        sessionStorage.setItem('admin-session', 'active');
        sessionStorage.setItem('adminSessionActive', 'true');

        // Also set in localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem('admin-session', 'active');
          localStorage.setItem('adminSessionActive', 'true');
        }

        navigate({ to: '/admin/owner-dashboard' });
      } else {
        setError('Invalid credentials. Use admin / admin123');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-neon-black flex items-center justify-center relative overflow-hidden bg-grid-neon">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-green opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-neon-green neon-glow mb-4 animate-pulse-glow">
            <Zap className="w-8 h-8 text-neon-green" />
          </div>
          <h1 className="font-orbitron text-2xl font-bold text-neon-green neon-text-glow mb-1">
            ADMIN PORTAL
          </h1>
          <p className="text-gray-500 font-mono text-sm">Bevinamarada Ayurvedic Store</p>
        </div>

        {/* Login Card */}
        <div className="neon-card rounded-lg p-8">
          <h2 className="font-orbitron text-lg font-semibold text-white mb-6 text-center">
            SECURE ACCESS
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 neon-input rounded-md font-mono text-sm"
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 neon-input rounded-md font-mono text-sm"
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-neon-green transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-neon-green cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer font-mono">
                Remember me
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-md border border-red-500/50 bg-red-500/10">
                <p className="text-red-400 text-sm font-mono">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 neon-btn-solid rounded-md font-orbitron text-sm font-bold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-neon-black border-t-transparent rounded-full animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : (
                'ACCESS PORTAL'
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neon-border">
            <p className="text-center text-xs text-gray-600 font-mono">
              Credentials: admin / admin123
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-neon-green transition-colors font-mono"
          >
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  );
}
