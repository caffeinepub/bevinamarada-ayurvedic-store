import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff, Lock, User, Shield, AlertCircle } from 'lucide-react';

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
      if (username === 'baslxr' && password === 'bas12345') {
        sessionStorage.setItem('admin-session', 'true');
        sessionStorage.setItem('adminSessionActive', 'true');
        navigate({ to: '/admin/owner-dashboard' });
      } else {
        setError('Invalid username or password. Please try again.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.97_0.01_200)] via-[oklch(0.95_0.02_195)] to-[oklch(0.93_0.03_190)] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[oklch(0.45_0.15_195)] opacity-5"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[oklch(0.5_0.15_155)] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.45_0.1_195)] opacity-3"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[oklch(0.45_0.15_195)] shadow-lg mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[oklch(0.15_0.02_220)] font-heading">Admin Portal</h1>
          <p className="text-[oklch(0.5_0.03_200)] text-sm mt-1">BASL Pharma Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-modal border border-[oklch(0.88_0.01_200)] p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[oklch(0.15_0.02_220)] font-heading">Sign In</h2>
            <p className="text-[oklch(0.5_0.03_200)] text-sm mt-1">Enter your credentials to access the admin portal</p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2 p-3 bg-[oklch(0.97_0.03_25)] border border-[oklch(0.85_0.08_25)] rounded-lg text-[oklch(0.45_0.18_25)] text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-[oklch(0.25_0.03_220)] mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-[oklch(0.6_0.03_200)]" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-[oklch(0.88_0.01_200)] rounded-lg text-[oklch(0.15_0.02_220)] placeholder-[oklch(0.7_0.02_200)] bg-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.15_195)] focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[oklch(0.25_0.03_220)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-[oklch(0.6_0.03_200)]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-[oklch(0.88_0.01_200)] rounded-lg text-[oklch(0.15_0.02_220)] placeholder-[oklch(0.7_0.02_200)] bg-white focus:outline-none focus:ring-2 focus:ring-[oklch(0.45_0.15_195)] focus:border-transparent transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[oklch(0.6_0.03_200)] hover:text-[oklch(0.45_0.15_195)] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[oklch(0.88_0.01_200)] text-[oklch(0.45_0.15_195)] focus:ring-[oklch(0.45_0.15_195)]"
              />
              <label htmlFor="rememberMe" className="text-sm text-[oklch(0.4_0.03_220)]">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[oklch(0.45_0.15_195)] hover:bg-[oklch(0.4_0.15_195)] text-white font-semibold rounded-lg transition-all duration-200 shadow-pharma-sm hover:shadow-pharma disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[oklch(0.6_0.03_200)] mt-6">
          Secure admin access — authorized personnel only
        </p>
      </div>
    </div>
  );
}
