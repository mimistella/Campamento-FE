import { useState, useEffect } from "react";
import { AuthContext } from "@context/AuthContext";
import api from "@hooks/useApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mydata, setMyData] = useState(null); // <--- agregalo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");

        if (res.data.data && res.data.data.email) {
          setUser(res.data.data);

          // Cargar perfil completo
          const profileRes = await api.get("/auth/profile");
          setMyData(profileRes.data.data);
        } else {
          setUser(null);
          setMyData(null);
        }
      } catch (err) {
        console.error("No hay sesión activa o token inválido:", err.response?.data || err.message);
        setUser(null);
        setMyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    setMyData(null);
  };

  return (
    <AuthContext.Provider value={{ user, mydata, setUser, setMyData, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};