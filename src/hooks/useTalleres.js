import { useState,useEffect } from "react";
import api from "./useApi";
import { useLocalStorage } from "./useLocalStorage";

export function useTalleres() {
  const [talleres, setTalleres] = useLocalStorage('talleres', []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchTalleres = async () => {
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
  };

  const fetchInscripciones = async () => {
    try {
      const res = await api.get("/inscripcion-taller");
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setInscripciones(data); 
    } catch (err) {
      console.error("Error fetching inscripciones:", err);
      setInscripciones([]); 
    }
  };

  const refreshData = async () => {
    await fetchTalleres();
    await fetchInscripciones();
  };

  useEffect(() => {
    refreshData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const talleresActivos = talleres.filter(taller =>
    inscripciones.some(t => t.taller.id === taller.id)
  );

  const crearTaller = async (tallerData) => {
    try {
      const res = await api.post("/talleres", tallerData);
      setTalleres(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const updateTaller = async (id, tallerData) => {
    try {
      const res = await api.put(`/talleres/${id}`, tallerData);
      setTalleres(prev => prev.map(t => t.id === id ? res.data : t));
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const deleteTaller = async (id) => {
    try {
      await api.delete(`/talleres/${id}`);
      setTalleres(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const deleteInscripto = async (id) => {
    try {
      await api.delete(`/inscripcion-taller/${id}`);
      setInscripciones(prev => prev.filter(i => i.id !== id));
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
    refreshData
  };
}