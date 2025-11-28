import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "@/stores/userStore";

type Props = {
  children: ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const isAuthenticated = userStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
