import { useState, useCallback } from "react";
import api from "./useApi";

export function useCabanias() {
  const [cabanias, setCabanias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Refrescar todas las cabañas desde el backend
  const fetchCabanias = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/cabanias");
      setCabanias(Array.isArray(res.data?.data) ? res.data.data : []);
      return res.data.data;
    } catch (err) {
      console.error("Error cargando cabañas:", err);
      setError("No se pudieron cargar las cabañas");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear cabaña
  const crearCabania = useCallback(async (form) => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/cabanias", {
        ...form,
        capacidad: Number(form.capacidad),
        deidad: Number(form.deidad),
      });
      setCabanias((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al crear cabaña");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar cabaña
  const updateCabania = useCallback(async (id, { descripcion, capacidad }) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.patch(`cabanias/${id}`, {
        descripcion,
        capacidad: Number(capacidad),
      });
      // Actualizamos localmente
      setCabanias((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al actualizar cabaña");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar cabaña
  const deleteCabania = useCallback(async (id) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.delete(`cabanias/${id}`);
      setCabanias((prev) => prev.filter((c) => c.id !== id));
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al eliminar cabaña");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Mover campista
  const moveCampista = useCallback(async (hospedajeId, nuevaCabaniaId) => {
    setLoading(true);
    setError("");
    try {
      const res = await api.patch(`/hospedaje/${hospedajeId}/move`, {
        cabania: nuevaCabaniaId,
      });
      // Opcional: podés refrescar cabañas si necesitas actualizar ocupación
      await fetchCabanias();
      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al mover campista");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchCabanias]);

  return {
    cabanias,
    loading,
    error,
    fetchCabanias,
    crearCabania,
    updateCabania,
    deleteCabania,
    moveCampista,
  };
}