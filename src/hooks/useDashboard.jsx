import { useCallback,useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
import { API_ROUTES } from "../constants/apiroutes";


export function useDashboard() {
  const [diasCampamento, setDiasCampamento] = useLocalStorage('diasCampamento', 0);
  const [inscriptos, setInscriptos] = useLocalStorage('inscriptos', []);
  const [instructores, setInstructores] = useLocalStorage('instructores', []);
  const [cabanias, setCabanias] = useLocalStorage('cabanias', []);
  const [hospedajes, setHospedajes] = useLocalStorage('hospedajes', []);
  const [lastUpdated, setLastUpdated] = useLocalStorage('lastUpdated', null);
  const [loading, setLoading] = useState(true);

   const fetchDashboardData = useCallback(async () => {
    const [campersRes, instructorsRes, cabaniasRes, hospedaRes] = await Promise.all([
      axios.get(API_ROUTES.CAMPERS),
      axios.get(API_ROUTES.INSTRUCTORS),
      axios.get(API_ROUTES.CABANAS),
      axios.get(API_ROUTES.HOSPEDA),
    ]);
    return {
      campers: Array.isArray(campersRes.data.data) ? campersRes.data.data : [],
      instructors: Array.isArray(instructorsRes.data.data) ? instructorsRes.data.data : [],
      cabanias: Array.isArray(cabaniasRes.data.data) ? cabaniasRes.data.data : [],
      hospedajes: hospedaRes.data.data || [],
    };
  }, []);

  useEffect(() => {
    const proximaFecha = new Date("2025-12-20T00:00:00");
    const hoy = new Date();
    const diferencia = Math.ceil((proximaFecha - hoy) / (1000 * 60 * 60 * 24));
    setDiasCampamento(diferencia);
  }, [setDiasCampamento]);

  const refreshData = useCallback(async () => {
  try {
    setLoading(true);
    const data = await fetchDashboardData();
    setInscriptos(data.campers);
    setInstructores(data.instructors);
    setCabanias(data.cabanias);
    setHospedajes(data.hospedajes);
    setLastUpdated(new Date().toISOString());
  } catch (error) {
    console.error("Error refreshing data:", error);
  } finally {
    setLoading(false);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

useEffect(() => {
  refreshData();
}, [refreshData]);

  const moveCampista = (campistaId, nuevaCabaniaId) => {
    setHospedajes(prev =>
      prev.map(h =>
        h.campista_id === campistaId ? { ...h, cabania_id: nuevaCabaniaId } : h
      )
    );
  };

  const removeCabania = (cabaniaId) => {
    setCabanias(prev => prev.filter(c => c.id !== cabaniaId));
    setHospedajes(prev => prev.filter(h => h.cabania_id !== cabaniaId));
  };

  const getOcupacion = (cabaniaId) =>
    hospedajes.filter(h => h.cabania.id === cabaniaId).length;

  const cabaniasActivas = cabanias.filter(cabania =>
    hospedajes.some(h => h.cabania.id === cabania.id)
  );

  return {
    diasCampamento,
    inscriptos,
    instructores,
    cabanias,
    hospedajes,
    moveCampista,
    removeCabania,
    getOcupacion,
    cabaniasActivas,
    loading,
    refreshData,
    lastUpdated,
    setCabanias,
    setHospedajes
  };
}