import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo";
import api from "@hooks/useApi";

export function useNivelAcceso() {
  const { user } = useAuth();
  const { inscripciones, loading: loadingInscripciones } = useInscripcionPeriodo();
  const [nivel, setNivel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [periodoActualId, setPeriodoActualId] = useState(null);

  useEffect(() => {
    const fetchPeriodo = async () => {
      try {
        const periodoRes = await api.get("/periodo/current");
        const periodoData = periodoRes.data.data;
        setPeriodoActualId(Number(periodoData.id));
      } catch (error) {
        console.error("Error obteniendo periodo actual:", error);
      }
    };
    fetchPeriodo();
  }, []);

  useEffect(() => {
    // Si todavía no tenemos todos los datos, seguimos en loading
    if (!user || loadingInscripciones || periodoActualId === null) {
      setLoading(true);
      return;
    }

    setLoading(false);

    const camposObligatorios = [
      "nombre",
      "apellido",
      "telefono",
      "email",
      "fechaNac",
      "pais",
      "ciudad",
      "direccion",
      "grupoSanguineo",
      "telefonoEmergencia",
    ];

    const perfilCompleto = camposObligatorios.every((campo) => Boolean(user[campo]));
    if (!perfilCompleto) {
      setNivel(0);
      return;
    }

    // Verificar si hay inscripción para el periodo actual
    const inscripcionActual = inscripciones?.some((ins) => {
      // Primero intentamos periodoId directo
      if (ins.periodoId !== undefined) return Number(ins.periodoId) === periodoActualId;
      // Si está anidado: ins.periodo.id
      if (ins.periodo?.id !== undefined) return Number(ins.periodo.id) === periodoActualId;
      return false;
    });

    setNivel(inscripcionActual ? 2 : 1);
  }, [user, inscripciones, periodoActualId, loadingInscripciones]);

  return { nivel, loading };
}
