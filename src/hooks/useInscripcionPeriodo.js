import { useEffect, useState } from "react";
import dayjs from "dayjs";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";

export function useInscripcionPeriodo() {
  const { user } = useAuth();
  const [inscripciones, setInscripciones] = useState([]); // Array de inscripciones del usuario
  const [diasRestantes, setDiasRestantes] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const response = await api.get("/inscripcion-periodo", {
          withCredentials: true,
        });

        const responseData = response.data;
        console.log("Respuesta completa:", responseData);

        const todasInscripciones = Array.isArray(responseData.data)
          ? responseData.data
          : [responseData.data];

        // Filtramos solo las inscripciones del usuario
        const inscripcionesUsuario = todasInscripciones.filter(
          (i) => i.campista?.id === user?.id || i.campistaId === user?.id
        );

        console.log("Inscripciones encontradas:", inscripcionesUsuario);
        setInscripciones(inscripcionesUsuario);

        // Calculamos días restantes para el primer período del usuario (opcional)
        if (inscripcionesUsuario.length > 0) {
          const primerPeriodo = inscripcionesUsuario[0].periodo;
          if (primerPeriodo?.fechaInicioPer) {
            calcularDiasRestantes(primerPeriodo.fechaInicioPer);
          }
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
  }, [user?.id]);

  return { inscripciones, diasRestantes, loading };
}
