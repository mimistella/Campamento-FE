import { useState, useEffect } from "react";
import api from "./useApi";
import { useLocalStorage } from "./useLocalStorage";

export function usePeriodo() {
  const [periodos, setPeriodos] = useLocalStorage("periodos", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [periodoActual, setPeriodoActual] =useState(null);

  const askCurrent = async () => {
    try {
      setLoading(true);
      const res = await api.get("/periodo/current");

      // el backend devuelve "date", no "data"
      const current = res.data?.date || null;

      setPeriodoActual(current);
      setError(null);
    } catch (err) {
      console.error("Error fetching periodo actual:", err);
      setError("No se pudieron cargar los periodos");
    } finally {
      setLoading(false);
    }
  };

  const fetchPeriodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/periodo"); 
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setPeriodos(data);
      setLastUpdated(new Date().toISOString());
      setError(null);
    } catch (err) {
      console.error("Error fetching periodos:", err);
      setError("No se pudieron cargar los periodos");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await fetchPeriodos();
    await askCurrent();
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const crearPeriodo = async (periodoData) => {
    try {
      const res = await api.post("/periodo", periodoData);
      setPeriodos(prev => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const updatePeriodo = async (id, periodoData) => {
    try {
      const res = await api.put(`/periodo/${id}`, periodoData);
      setPeriodos(prev => prev.map(p => p.id === id ? res.data : p));
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };
  

  const deletePeriodo = async (id) => {
    try {
      await api.delete(`/periodo/${id}`);
      setPeriodos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  return {
    periodos,
    lastUpdated,
    loading,
    error,
    periodoActual,
    refreshData,
    crearPeriodo,
    updatePeriodo,
    deletePeriodo,
  };
}