import { useState, useEffect, useCallback } from "react";
import api from "./useApi";
import { useLocalStorage } from "./useLocalStorage";
import { usePeriodo } from "./usePeriodo"; 

export function useTalleres() {
  const [talleres, setTalleres] = useLocalStorage("talleres", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [trigger, setTrigger] = useState(0); 

  const { periodos } = usePeriodo();

  const fetchTalleres = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/talleres");
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setTalleres(data);
      setLastUpdated(new Date().toISOString());
      setError(null);
    } catch (err) {
      console.error("Error fetching talleres:", err);
      setError("No se pudieron cargar los talleres");
    } finally {
      setLoading(false);
    }
  }, [setTalleres]);

  const fetchInscripciones = useCallback(async () => {
    try {
      const res = await api.get("/inscripcion-taller");
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setInscripciones(data);
    } catch (err) {
      console.error("Error fetching inscripciones:", err);
      setInscripciones([]);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await fetchTalleres();
    await fetchInscripciones();
  }, [fetchTalleres, fetchInscripciones]);


  useEffect(() => {
    refreshData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const talleresActivos = talleres.filter((taller) =>
    inscripciones.some((t) => t.taller.id === taller.id)
  );

  // 🔹 función para disparar refetch automático
  const triggerRefresh = () => setTrigger(prev => prev + 1);

  const crearTaller = async (form) => {
    setLoading(true);
    try {
      const fechaTaller = new Date(form.fechaHora);
      const periodoDelTaller = periodos.find((p) => {
        const inicio = new Date(p.fechaInicioPer);
        const fin = new Date(p.fechaFinPer);
        return fechaTaller >= inicio && fechaTaller <= fin;
      });
      if (!periodoDelTaller) throw new Error("No se encontró un período válido");

      const payload = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        fechaHora: fechaTaller.toISOString(),
        lugar: form.lugar,
        instructor: form.instructor,
        cupo: form.cupo,
        duracionMin: form.duracionMinutos,
        periodo: periodoDelTaller.id,
      };

      await api.post("/talleres", payload);
      triggerRefresh(); 
    } finally {
      setLoading(false);
    }
  };

  const updateTaller = async (id, tallerData) => {
    try {
      await api.put(`/talleres/${id}`, tallerData);
      triggerRefresh(); 
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const deleteTaller = async (id) => {
    try {
      await api.delete(`/talleres/${id}`);
      triggerRefresh(); 
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const deleteInscripto = async (id) => {
    try {
      await api.delete(`/inscripcion-taller/${id}`);
      triggerRefresh();
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  return {
    talleres,
    inscripciones,
    talleresActivos,
    lastUpdated,
    loading,
    error,
    deleteInscripto,
    deleteTaller,
    crearTaller,
    updateTaller,
    refreshData,
  };
}