import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";
import { usePeriodo } from "@hooks/usePeriodo";

export function useInscripcionPeriodo() {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState([]);
  const [diasRestantes, setDiasRestantes] = useState(null);
  const [loading, setLoading] = useState(true);
  const { periodoActual } = usePeriodo();

  const [trigger, setTrigger] = useState(0); 
  const triggerRefresh = () => setTrigger(prev => prev + 1);

  const calcularDiasRestantes = (fechaInicio) => {
    if (!fechaInicio) return;
    const hoy = dayjs().startOf("day");
    const inicio = dayjs(fechaInicio).startOf("day");
    const diff = inicio.diff(hoy, "day");
    setDiasRestantes(diff >= 0 ? diff : 0);
  };

  const fetchInscripciones = useCallback(async () => {
    if (!user?.id || !periodoActual?.id) return;

    setLoading(true);
    try {
      const response = await api.get("/inscripcion-periodo");
      const data = response.data?.data || [];
      const todasInscripciones = Array.isArray(data) ? data : [data].filter(Boolean);
      setInscripciones(todasInscripciones);

      const inscripcionActual = todasInscripciones.find(
        (i) => i?.periodo?.id === periodoActual?.id
      );

      if (inscripcionActual?.periodo?.fechaInicioPer) {
        calcularDiasRestantes(inscripcionActual.periodo.fechaInicioPer);
      } else {
        setDiasRestantes(null);
      }

    } catch (error) {
      console.error("Error al obtener inscripciones:", error.response?.data || error.message);
      setInscripciones([]);
      setDiasRestantes(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id, periodoActual?.id]);


  useEffect(() => {
    fetchInscripciones();
  }, [fetchInscripciones, trigger]);

  return {
    inscripciones,
    diasRestantes,
    loading,
    triggerRefresh,
  };
}