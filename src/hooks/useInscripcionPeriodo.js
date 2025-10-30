import { useEffect, useState, useCallback } from "react";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";
import { usePeriodo } from "@hooks/usePeriodo";

export function useInscripcionPeriodo() {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState([]);
  const [diasRestantes, setDiasRestantes] = useState(null);
  const [loading, setLoading] = useState(true);
  const { periodoActual } = usePeriodo();
  const [cantidadInscriptosPeriodo, setCantidadInscriptosPeriodo] = useState(null);

  const [trigger, setTrigger] = useState(0); 
  const triggerRefresh = () => setTrigger(prev => prev + 1);

const calcularDiasRestantes = useCallback((fechaInicio, fechaFin) => {
    if (!fechaInicio || !fechaFin) {
      setDiasRestantes(null);
      return;
    }
    
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const hoy = new Date();
    
    // Normalizar a medianoche para comparación precisa
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);
    
    const diffInicio = Math.ceil((inicio - hoy) / (1000 * 60 * 60 * 24));
    
    if (diffInicio > 0) {
      setDiasRestantes(diffInicio);
    } 
    else {
      const diffFin = Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24));
      setDiasRestantes(diffFin >= 0 ? diffFin : 0);
    }
  }, []);

useEffect(() => {
  calcularDiasRestantes();
}, [calcularDiasRestantes]);

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
        calcularDiasRestantes(inscripcionActual.periodo.fechaInicioPer,inscripcionActual.periodo.fechaFinPer );
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, periodoActual?.id]);


  useEffect(() => {
    fetchInscripciones();
  }, [fetchInscripciones, trigger]);


  
  const inscriptosPeriodo = useCallback(() => {
    if (!periodoActual || !periodoActual.id) return [];
    console.log("HOLAA");
    setCantidadInscriptosPeriodo(inscripciones.filter((i) => i.periodo?.id === periodoActual.id));
    console.log(inscripciones);
  }, [inscripciones, periodoActual]);
  
  useEffect(() => {
    inscriptosPeriodo()
  }, [inscriptosPeriodo, trigger]);


  return {
    inscripciones,
    diasRestantes,
    loading,
    triggerRefresh,
    cantidadInscriptosPeriodo,
    inscriptosPeriodo
  };
}