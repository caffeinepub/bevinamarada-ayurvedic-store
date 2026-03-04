import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Leaf,
  Lock,
  Shield,
  User,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

const ADMIN_USERNAME = "baslxr";
const ADMIN_PASSWORD = "bas12345";

// Generate stable particle positions
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 5) % 95}%`,
  top: `${(i * 23 + 8) % 90}%`,
  size: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2,
  delay: `${(i * 0.4) % 6}s`,
  duration: `${5 + (i % 4)}s`,
  color:
    i % 3 === 0
      ? "oklch(0.75 0.22 150 / 0.5)"
      : i % 3 === 1
        ? "oklch(0.72 0.18 200 / 0.4)"
        : "oklch(0.65 0.22 250 / 0.35)",
}));

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("remember-admin-username") || "";
    }
    return "";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("remember-admin-username");
    }
    return false;
  });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-session", "active");
      sessionStorage.setItem("adminSessionActive", "true");
      if (rememberMe) {
        localStorage.setItem("admin-session", "active");
        localStorage.setItem("adminSessionActive", "true");
        localStorage.setItem("remember-admin-username", username);
      } else {
        localStorage.removeItem("admin-session");
        localStorage.removeItem("adminSessionActive");
        localStorage.removeItem("remember-admin-username");
      }
      navigate({ to: "/admin/owner-dashboard" });
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden animated-gradient-bg flex items-center justify-center p-4">
      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationName: "float-particle",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}

      {/* Large background glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.75 0.22 150 / 0.04)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.72 0.18 200 / 0.05)",
          filter: "blur(60px)",
        }}
      />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[380px]">
        <div
          className="glass-card rounded-2xl p-8 shadow-modal"
          data-ocid="login.dialog"
        >
          {/* Brand badge */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 neon-glow-green"
              style={{
                background: "oklch(0.14 0.008 250)",
                border: "1.5px solid oklch(0.75 0.22 150 / 0.5)",
              }}
            >
              <Leaf className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-display font-bold text-foreground text-center text-sm leading-tight">
              Bevinamarada Ayurvedic Store
            </h1>
          </div>

          {/* Form heading */}
          <div className="mb-6 text-center">
            <h2 className="font-display font-bold text-foreground text-2xl mb-1">
              Admin Portal
            </h2>
            <p className="text-muted-foreground text-sm">
              Sign in to manage your store
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              data-ocid="login.error_state"
              className="flex items-center gap-2.5 rounded-xl p-3.5 mb-5"
              style={{
                background: "oklch(0.62 0.22 25 / 0.12)",
                border: "1px solid oklch(0.62 0.22 25 / 0.3)",
              }}
            >
              <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="login-username"
                className="block text-sm font-semibold text-foreground mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="login-username"
                  data-ocid="login.username.input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-foreground text-sm font-medium transition-all placeholder:text-muted-foreground/50 neon-input"
                  style={{
                    background: "oklch(0.18 0.01 250)",
                    border: "1px solid oklch(0.22 0.015 250)",
                  }}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-foreground mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="login-password"
                  data-ocid="login.password.input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-foreground text-sm font-medium transition-all placeholder:text-muted-foreground/50 neon-input"
                  style={{
                    background: "oklch(0.18 0.01 250)",
                    border: "1px solid oklch(0.22 0.015 250)",
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="remember"
                data-ocid="login.remember.checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
                style={{ accentColor: "oklch(0.75 0.22 150)" }}
              />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
              >
                Remember me
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              data-ocid="login.submit_button"
              className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl text-sm tracking-wide neon-btn neon-pulse mt-1"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Footer note */}
          <div
            className="flex items-center justify-center gap-1.5 mt-6 pt-5"
            style={{ borderTop: "1px solid oklch(0.22 0.015 250)" }}
          >
            <Shield className="w-3.5 h-3.5 text-muted-foreground/60" />
            <p className="text-center text-xs text-muted-foreground/70">
              Authorized personnel only
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground/40 mt-5">
          © {new Date().getFullYear()} Bevinamarada Ayurvedic Store
        </p>
      </div>
    </div>
  );
}
