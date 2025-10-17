import { useState, useEffect, useCallback } from "react";
import api from "@hooks/useApi";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [trigger, setTrigger] = useState(0); // contador para forzar refetch

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);

      const [adminsRes, instructoresRes, campistasRes] = await Promise.all([
        api.get("/admin"),
        api.get("/instructor"),
        api.get("/campista"),
      ]);

      const admins =
        adminsRes.data?.data?.map((u) => ({ ...u, role: "admin" })) ?? [];
      const instructores =
        instructoresRes.data?.data?.map((u) => ({ ...u, role: "instructor" })) ?? [];
      const campistas =
        campistasRes.data?.data?.map((u) => ({ ...u, role: "campista" })) ?? [];

      const allUsers = [...admins, ...instructores, ...campistas];

      setUsuarios(allUsers);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios, trigger]); // se vuelve a ejecutar cada vez que cambie trigger


  return {
    usuarios,
    loading,
    lastUpdated,
    refreshData: fetchUsuarios,
  };
}