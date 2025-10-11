import { useAuthContext } from "@context/AuthContext";
import api from "@hooks/useApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const { user, setUser, loading } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, contrasena) => {
    const _res = await api.post("/auth/login", { email, contrasena });
    const who = await api.get("/auth/me",{ withCredentials: true });
    setUser(who.data);
    return who.data;
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    navigate("/login"); 
  };

  return { user, loading, login, logout };
}