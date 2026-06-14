import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp?: number;
  role?: string;
  [key: string]: any;
}

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getAuthState = (requiredRole: string): 0 | 1 | 2 => {
  const token = getToken();

  if (!token) return 0;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    console.log("Decoded JWT:", decoded);

    if (!decoded.exp || !decoded.role) {
      return 0;
    }

    if (decoded.exp * 1000 < Date.now()) {
      return 0;
    }

    if (requiredRole !== "ANY" && decoded.role !== requiredRole) {
      return 1;
    }

    return 2;
  } catch (err) {
    return 0;
  }
};