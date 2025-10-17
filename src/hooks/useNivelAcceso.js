import { useEffect, useState, useCallback } from "react";
import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo";
import api from "@hooks/useApi";

export function useNivelAcceso() {
  const [user, setUser] = useState(null);
  const { inscripciones, loading: loadingInscripciones } = useInscripcionPeriodo();
  const [nivel, setNivel] = useState(0);
  const [loading, setLoading] = useState(true);
  const [periodoActualId, setPeriodoActualId] = useState(null);
  const [trigger, setTrigger] = useState(0);

  const triggerRefresh = () => setTrigger(prev => prev + 1);

  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data?.data || null);
    } catch (error) {
      console.error("Error obteniendo perfil:", error);
    }
  }, []);

  const fetchPeriodoActual = useCallback(async () => {
    try {
      const periodoRes = await api.get("/periodo/current");
      const periodoData = periodoRes.data?.date;
      setPeriodoActualId(Number(periodoData?.id || null));
    } catch (error) {
      console.error("Error obteniendo periodo actual:", error);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    fetchPeriodoActual();
  }, [fetchUser, fetchPeriodoActual, trigger]);

  useEffect(() => {
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

    const inscripcionActual = inscripciones?.some((ins) => {
      if (ins.periodoId !== undefined) return Number(ins.periodoId) === periodoActualId;
      if (ins.periodo?.id !== undefined) return Number(ins.periodo.id) === periodoActualId;
      return false;
    });

    setNivel(inscripcionActual ? 2 : 1);
  }, [user, inscripciones, periodoActualId, loadingInscripciones]);

  return { nivel, loading, triggerRefresh }; 
}