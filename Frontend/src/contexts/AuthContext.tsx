import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

type Role = "USER" | "ADMIN" | "AGENT" | null;

interface AuthContextType {
  userId: number | null;
  role: Role;
  setUserId: (id: number | null) => void;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<Role>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);

      setUserId(decoded.userId ?? null);
      setRole(decoded.role ?? null);
    } catch (err) {
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        role,
        setUserId,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
