import { useState, useEffect } from "react";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";

export function useInscripcionTalleres() {
  const { user } = useAuth();

  const [talleresDisponibles, setTalleresDisponibles] = useState([]);
  const [misTalleres, setMisTalleres] = useState([]);
  const [loadingDisponibles, setLoadingDisponibles] = useState(true);
  const [loadingMisTalleres, setLoadingMisTalleres] = useState(true);
  const [inscribiendo, setInscribiendo] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisponibles = async () => {
      setLoadingDisponibles(true);
      try {
        const response = await api.get("/talleres");
        const filtrados = response.data.data;
        setTalleresDisponibles(filtrados);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoadingDisponibles(false);
      }
    };

    fetchDisponibles();
  }, []);

  useEffect(() => {
    const fetchMisTalleres = async () => {
      if (!user?.id) return setLoadingMisTalleres(false);

      setLoadingMisTalleres(true);
      try {
        const response = await api.get("/inscripcion-taller");
        const data = response.data.data;
        const inscripciones = Array.isArray(data) ? data : [data];
        setMisTalleres(inscripciones);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoadingMisTalleres(false);
      }
    };

    fetchMisTalleres();
  }, [user?.id]);

  const inscribir = async (taller) => {
    if (!user?.id) throw new Error("Usuario no válido");

    const yaInscripto = misTalleres.some(it => it.taller?.id === taller);
    if (yaInscripto) return;

    setInscribiendo(true);
    setError(null);
    try {
      const response = await api.post("/inscripcion-taller", {
        taller: taller,
        campista: user.id,
        estado: 'aceptado', //deberiamos pasar estado aceptado por default verdad?
      });

      const nuevaInscripcion = response.data.data || response.data;

      setMisTalleres(prev => [...prev, nuevaInscripcion]);
      setTalleresDisponibles(prev => prev.filter(t => t.id !== taller));

      return nuevaInscripcion;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setInscribiendo(false);
    }
  };

  return {
    talleresDisponibles,
    misTalleres,
    loadingDisponibles,
    loadingMisTalleres,
    inscribiendo,
    inscribir,
    error,
  };
}