import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Eye, EyeOff, Leaf, Lock, User } from "lucide-react";
import type React from "react";
import { useState } from "react";

const ADMIN_USERNAME = "baslxr";
const ADMIN_PASSWORD = "bas12345";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
      }
      navigate({ to: "/admin/owner-dashboard" });
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      {/* Background overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('/assets/generated/herbal-background.dim_1920x1080.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="gradient-forest px-8 py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading font-bold text-white text-2xl">
              Admin Portal
            </h1>
            <p className="text-white/70 text-sm mt-1">
              Bevinamarada Ayurvedic Store
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <h2 className="font-heading font-semibold text-foreground text-lg mb-6 text-center">
              Sign in to continue
            </h2>

            {error && (
              <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-5">
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="login-username"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="login-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-forest focus:ring-forest/30"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-forest text-white font-semibold py-3 rounded-lg hover:bg-forest-dark transition-colors shadow-pharma mt-2"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Authorized personnel only. All access is logged.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/60 text-xs mt-4">
          © {new Date().getFullYear()} Bevinamarada Ayurvedic Store
        </p>
      </div>
    </div>
  );
}
