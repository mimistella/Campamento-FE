import { useState } from "react";
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
      setCabanias((prev) => [...prev, data]); // opcional: actualizar lista
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Error al crear cabaña");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    cabanias,
    loading,
    error,
    crearCabania,
  };
}