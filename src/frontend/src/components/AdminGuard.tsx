import { Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function isAdminAuthenticated(): boolean {
  // Check sessionStorage first
  const sessionKey = sessionStorage.getItem("admin-session");
  const sessionActive = sessionStorage.getItem("adminSessionActive");
  if (sessionKey === "active" && sessionActive === "true") {
    return true;
  }
  // Check localStorage for "remember me" sessions
  const localKey = localStorage.getItem("admin-session");
  const localActive = localStorage.getItem("adminSessionActive");
  if (localKey === "active" && localActive === "true") {
    return true;
  }
  return false;
}

export default function AdminGuard() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = isAdminAuthenticated();
    if (!auth) {
      navigate({ to: "/admin-login" });
    } else {
      setAuthenticated(true);
    }
    setChecked(true);
  }, [navigate]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-forest border-t-transparent rounded-full animate-spin" />
          <p className="text-forest font-heading text-sm font-medium">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <Outlet />;
}
