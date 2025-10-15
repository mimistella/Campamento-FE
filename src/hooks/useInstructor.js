import { useState, useEffect, useCallback } from "react";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth.js";

export function useInstructor() {
  const [diasCampamento, setDiasCampamento] = useState(null);
  const [inscriptos, setInscriptos] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState(null);
  const { user } = useAuth();

  const fetchTalleres = useCallback(async () => {
    const res = await api.get("/talleres");
    return Array.isArray(res.data?.data) ? res.data.data : [];
  }, []);

  const fetchInscriptos = useCallback(async () => {
    const res = await api.get("/inscripcion-taller");
    return Array.isArray(res.data?.data) ? res.data.data : [];
  }, []);

  const fetchPeriodoActual = useCallback(async () => {
    const res = await api.get("/periodo/current");

    return res.data?.date ?? null;
  }, []);

  const fetchInstructorData = useCallback(async () => {
    const [tallerRes, inscriptoRes, periodoRes] = await Promise.all([
      fetchTalleres(),
      fetchInscriptos(),
      fetchPeriodoActual(),
    ]);

    setPeriodo(periodoRes || null);

    return {
      talleres: tallerRes,
      inscriptos: inscriptoRes,
    };
  }, [fetchTalleres, fetchInscriptos, fetchPeriodoActual]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchInstructorData();
      setInscriptos(data.inscriptos);
      setTalleres(data.talleres);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Error refreshing instructor data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchInstructorData]);

  const reloadTalleres = useCallback(async () => {
    try {
      setLoading(true);
      const t = await fetchTalleres();
      setTalleres(t);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error("Error reloading talleres:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchTalleres]);

  const reloadInscriptos = useCallback(async () => {
    try {
      setLoading(true);
      const i = await fetchInscriptos();
      setInscriptos(i);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      console.error("Error reloading inscriptos:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchInscriptos]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    if (!periodo?.fechaInicioPer) {
      setDiasCampamento(null);
      return;
    }
    const fechaInicio = new Date(periodo.fechaInicioPer);
    const hoy = new Date();
    const diferencia = Math.ceil((fechaInicio - hoy) / (1000 * 60 * 60 * 24));
    setDiasCampamento(diferencia);
  }, [periodo]);


  const misTalleres = (talleres || []).filter((t) => {
    if (!t?.instructor || !user?.id) return false;
    if (typeof t.instructor === "number") return t.instructor === user.id;
    if (typeof t.instructor === "string") return Number(t.instructor) === user.id;
    return t.instructor?.id === user.id;
  });



  const getAllInscriptosDeMisTalleres = useCallback(() => {
    const ids = misTalleres.map((t) => t.id);
    if (!ids.length) return [];
    return inscriptos.filter((i) => ids.includes(i.taller?.id));
  }, [misTalleres, inscriptos]);


  return {
    diasCampamento,
    inscriptos,
    talleres,
    misTalleres,
    getAllInscriptosDeMisTalleres,
    // reloads / refresh
    refreshData,
    reloadTalleres,
    reloadInscriptos,
    // estado
    loading,
    lastUpdated,
    periodo,
  };
}