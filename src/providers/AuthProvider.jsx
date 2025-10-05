import { useState, useEffect } from "react";
import { AuthContext } from "@context/AuthContext";
import api from "@hooks/useApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/auth/me?ts=${Date.now()}`, { withCredentials: true });

    
        if (res.data && res.data.email) {
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("No hay sesión activa o token inválido:", err.response?.data || err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
