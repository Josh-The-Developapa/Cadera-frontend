// src/components/RequireAuth.tsx

import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/user"; // or your context/state

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useUserStore(state => state.user);
  const loading = useUserStore(state => state.loading); // if loading whoami
  const location = useLocation();

  if (loading) return <div>Loading...</div>; // or skeleton

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

