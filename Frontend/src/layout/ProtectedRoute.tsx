import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthState } from "../utils/auth";

interface ProtectedRouteProps {
  Role: "USER" | "ADMIN" | "AGENT" | "ANY";
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, Role }) => {
  const auth = getAuthState(Role);

  if (auth === 0) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  if (auth === 1) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
