import { useState, useEffect } from "react";
import api from "@hooks/useApi";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchUsuarios = async () => {
    try {
      setLoading(true);

      const [adminsRes, instructoresRes, campistasRes] = await Promise.all([
        api.get("/admin"),
        api.get("/instructor"),
        api.get("/campista"),
      ]);

      const admins =
        adminsRes.data?.data?.map((u) => ({ ...u, rol: "admin" })) ?? [];
      const instructores =
        instructoresRes.data?.data?.map((u) => ({ ...u, rol: "instructor" })) ?? [];
      const campistas =
        campistasRes.data?.data?.map((u) => ({ ...u, rol: "campista" })) ?? [];

      const allUsers = [...admins, ...instructores, ...campistas];

      setUsuarios(allUsers);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    lastUpdated,
    refreshData: fetchUsuarios,
  };
}