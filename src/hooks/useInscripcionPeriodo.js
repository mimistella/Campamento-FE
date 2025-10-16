import { useEffect, useState } from "react";
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

  const calcularDiasRestantes = (fechaInicio) => {
    if (!fechaInicio) return;
    const hoy = dayjs().startOf("day");
    const inicio = dayjs(fechaInicio).startOf("day");
    const diff = inicio.diff(hoy, "day");
    setDiasRestantes(diff >= 0 ? diff : 0);
  };

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        console.log("Buscando inscripciones para user ID:", user?.id);
        const response = await api.get("/inscripcion-periodo");
        console.log("Respuesta completa del backend:", response.data);

        const data = response.data?.data || [];
        const todasInscripciones = Array.isArray(data) ? data : [data].filter(Boolean);

        console.log("Inscripciones encontradas:", todasInscripciones);

        setInscripciones(todasInscripciones);

        const inscripcionActual = todasInscripciones.find(
          (i) =>
            i?.periodo?.id === periodoActual?.id
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
    };

    if (user?.id) {
      fetchInscripciones();
    } else {
      setLoading(false);
    }
   
  }, [user?.id,periodoActual?.id]);

  return { inscripciones, diasRestantes, loading };
}