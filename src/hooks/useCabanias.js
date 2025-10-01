import { useState,useCallback } from "react";
import api from "./useApi";


export function useCabanias() {
  const [cabanias, setCabanias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Crear cabaña
  const crearCabania = async (form) => {
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/cabanias", {
        ...form,
        capacidad: Number(form.capacidad),
        deidad:  Number(form.deidad),
      });
      setCabanias((prev) => [...prev, data]); 
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al crear cabaña");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const updateCabania = useCallback(async (id, { descripcion, capacidad }) => {
    const res = await api.patch(`cabanias/${id}`, {
      descripcion,
       capacidad: Number(capacidad),
    });
    return res.data;
  }, []);

  const deleteCabania = useCallback(async (id) => {
    const res = await api.patch(`cabanias/${id}`, {
      estado: "inactiva"
    });
    return res.data;
  }, []);

  const moveCampista = useCallback(async (hospedajeId, nuevaCabaniaId) => {
  console.log("Enviando:", { hospedajeId, nuevaCabaniaId });

  const res = await api.patch(`/hospedaje/${hospedajeId}/move`, {
    cabania: nuevaCabaniaId
  });

  console.log("Respuesta recibida:", res.data);
  return res.data;
}, []);

  return {
    cabanias,
    loading,
    error,
    crearCabania,
    updateCabania, 
    deleteCabania, 
    moveCampista
  };
}