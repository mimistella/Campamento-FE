// hooks/useDeidades.js
import { useState, useCallback } from "react";
import api from "./useApi.js";

export function useDeidades() {
  const [deidades, setDeidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todas las deidades
  const fetchDeidades = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/deidades");
      setDeidades(data.data || data);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al cargar deidades");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch una deidad por ID
  const fetchDeidad = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/deidades/${id}`);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al cargar deidad");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear deidad
  const createDeidad = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/deidades", formData);
      setDeidades(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al crear deidad");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar deidad
  const updateDeidad = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.patch(`/deidades/${id}`, formData);
      setDeidades(prev => prev.map(d => d.id === id ? data : d));
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al actualizar deidad");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar deidad
  const deleteDeidad = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/deidades/${id}`);
      setDeidades(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || "Error al eliminar deidad");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Toggle activo/inactivo
  const toggleActivo = useCallback(async (id) => {
    const deidad = deidades.find(d => d.id === id);
    if (!deidad) return;

    return updateDeidad(id, { activo: !deidad.activo });
  }, [deidades, updateDeidad]);

  return {
    deidades,
    loading,
    error,
    fetchDeidades,
    fetchDeidad,
    createDeidad,
    updateDeidad,
    deleteDeidad,
    toggleActivo,
  };
}