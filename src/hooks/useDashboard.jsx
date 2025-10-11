/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import api from "@hooks/useApi";

export function useDashboard() {
  const [diasCampamento, setDiasCampamento] = useLocalStorage("diasCampamento", 0);
  const [inscriptos, setInscriptos] = useLocalStorage("inscriptos", []);
  const [instructores, setInstructores] = useLocalStorage("instructores", []);
  const [cabanias, setCabanias] = useLocalStorage("cabanias", []);
  const [hospedajes, setHospedajes] = useLocalStorage("hospedajes", []);
  const [lastUpdated, setLastUpdated] = useLocalStorage("lastUpdated", null);
  const [loading, setLoading] = useState(true);
  const [periodo, setPeriodo] = useState(null);

  const fetchDashboardData = async () => {
    const [campersRes, instructorsRes, cabaniasRes, hospedajesRes, inscriptoRes, periodoRes] = await Promise.all([
      api.get("/campista"),
      api.get("/instructor"),
      api.get("/cabanias"),
      api.get("/hospedaje"),
      api.get("/inscripcion-periodo"),
      api.get("/periodo/current"),
    ]);

    setPeriodo(periodoRes.data?.data || null);

    return {
      campers: Array.isArray(campersRes.data?.data) ? campersRes.data.data : [],
      instructors: Array.isArray(instructorsRes.data?.data) ? instructorsRes.data.data : [],
      cabanias: Array.isArray(cabaniasRes.data?.data) ? cabaniasRes.data.data : [],
      hospedajes: Array.isArray(hospedajesRes.data?.data) ? hospedajesRes.data.data : [],
      inscriptos: Array.isArray(inscriptoRes.data?.data) ? inscriptoRes.data.data : [],
    };
  };


  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardData();
      setInscriptos(data.inscriptos);
      setInstructores(data.instructors);
      setCabanias(data.cabanias);
      setHospedajes(data.hospedajes);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);


  useEffect(() => {
    const calcularDias = () => {
      if (!periodo?.fechaInicioPer) {
        setDiasCampamento(null);
        return;
      }

      const fechaInicio = new Date(periodo.fechaInicioPer);
      const hoy = new Date();
      const diferencia = Math.ceil((fechaInicio - hoy) / (1000 * 60 * 60 * 24));
      setDiasCampamento(diferencia);
    };

    calcularDias();
  }, [periodo]);


  const getOcupacion = (cabaniaId) =>
    hospedajes.filter((h) => h.cabania?.id === cabaniaId).length;

  const cabaniasActivas = cabanias.filter((cabania) =>
    hospedajes.some((h) => h.cabania?.id === cabania.id)
  );

  const inscriptosPeriodo = useMemo(() => {
    if (!periodo || !periodo.id) return [];
    return inscriptos.filter((i) => i.periodo.id === periodo.id);
  }, [inscriptos, periodo]);

  const cabaniasActivasPeriodo = useMemo(() => {
    if (!periodo || !periodo.id) return [];

    const idsCampistas = inscriptosPeriodo.map((i) => i.campista.id);

    return cabanias.filter((cabania) =>
      hospedajes.some(
        (h) =>
          idsCampistas.includes(h.campista.id) && h.cabania?.id === cabania.id
      )
    );
  }, [inscriptosPeriodo, cabanias, hospedajes, periodo]);


  return {
    diasCampamento,
    inscriptos,
    instructores,
    cabanias,
    hospedajes,
    getOcupacion,
    cabaniasActivas,
    loading,
    refreshData,
    lastUpdated,
    setCabanias,
    setHospedajes,
    inscriptosPeriodo,
    cabaniasActivasPeriodo,
    periodo,
  };
}