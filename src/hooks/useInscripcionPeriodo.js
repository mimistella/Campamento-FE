import { useEffect, useState } from "react";
import dayjs from "dayjs";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";

export function useInscripcionPeriodo() {
  const { user } = useAuth();
  const [inscripcion, setInscripcion] = useState(null);
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
    const fetchInscripcion = async () => {
      try {
        console.log("Buscando inscripción para user ID:", user.id);
        
        const response = await api.get("/inscripcion-periodo", {
          withCredentials: true,
        });

        const responseData = response.data;
        console.log("Respuesta completa:", responseData);


        const inscripciones = responseData.data; 
        console.log("Array de inscripciones:", inscripciones);


        const inscripcionCampista = Array.isArray(inscripciones)
          ? inscripciones.find(i => {

              const campistaId = i.campista?.id || i.campistaId;
              console.log(`Comparando: ${campistaId} === ${user.id}`, campistaId === user.id);
              return campistaId === user.id;
            })
          : null;

        console.log("Inscripción encontrada después de corrección:", inscripcionCampista);

        setInscripcion(inscripcionCampista || null);

        if (inscripcionCampista?.periodo?.fechaInicioPer) {
          console.log("Fecha inicio del período encontrada:", inscripcionCampista.periodo.fechaInicioPer);
          calcularDiasRestantes(inscripcionCampista.periodo.fechaInicioPer);
        } else {
          console.log("No se encontró fecha de inicio en el período");
          setDiasRestantes(null);
        }

      } catch (error) {
        console.error("Error al obtener la inscripción:", error.response?.data || error.message);
        setInscripcion(null);
        setDiasRestantes(null);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchInscripcion();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  return { inscripcion, diasRestantes, loading };
}