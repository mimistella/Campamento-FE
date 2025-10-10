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
        const periodoRes = await api.get("/periodo/current");
        const per = periodoRes.data.data;

        const response = await api.get("/talleres", { withCredentials: true });
        const filtrados = response.data.data.filter(t => {
          const fechaTaller = new Date(t.fechaHora);
          const inicio = new Date(per.fechaInicioPer);
          const fin = new Date(per.fechaFinPer);
          return fechaTaller >= inicio && fechaTaller <= fin;
        });

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
        const response = await api.get(`/inscripcion-taller?ts=${Date.now()}`); // rompe cache
        const data = response.data.data;
        const inscripciones = Array.isArray(data) ? data : [data];

        const filtrados = inscripciones.filter(it => it.campista?.id === user.id);
        setMisTalleres(filtrados);
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