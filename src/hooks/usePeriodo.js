import { useState, useEffect, useCallback } from "react";
import api from "./useApi";
import { useLocalStorage } from "./useLocalStorage";

export function usePeriodo() {
  const [periodos, setPeriodos] = useLocalStorage("periodos", []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [periodoActual, setPeriodoActual] = useState(null);
  const [trigger, setTrigger] = useState(0); 

  const askCurrent = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/periodo/current");
      const current = res.data?.date || null;
      setPeriodoActual(current);
      setError(null);
    } catch (err) {
      console.error("Error fetching periodo actual:", err);
      setError("No se pudieron cargar los periodos");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPeriodos = useCallback(async () => {
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
  }, [setPeriodos]);

  const refreshData = useCallback(async () => {
    await fetchPeriodos();
    await askCurrent();
  }, [fetchPeriodos, askCurrent]);


  useEffect(() => {
    refreshData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);


  const triggerRefresh = () => setTrigger(prev => prev + 1);

  const crearPeriodo = async (periodoData) => {
    try {
      const res = await api.post("/periodo", periodoData);
      triggerRefresh(); 
      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const updatePeriodo = async (id, periodoData) => {
    try {
      await api.put(`/periodo/${id}`, periodoData);
      triggerRefresh(); // 🔹 refetch automático
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  const deletePeriodo = async (id) => {
    try {
      await api.delete(`/periodo/${id}`);
      triggerRefresh(); // 🔹 refetch automático
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