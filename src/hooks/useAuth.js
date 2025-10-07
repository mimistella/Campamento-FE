import { useAuthContext } from "@context/AuthContext";
import api from "@hooks/useApi";

export function useAuth() {
  const { user, setUser, loading } = useAuthContext();

  const login = async (email, contrasena) => {
    const _res = await api.post("/auth/login", { email, contrasena });
    const who = await api.get("/auth/me",{ withCredentials: true });
    setUser(who.data);
    return who.data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return { user, loading, login, logout };
}