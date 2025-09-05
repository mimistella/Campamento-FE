import DashboardContext from "../context/DashboardContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTES } from "../constants/apiroutes"; 

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
};

export function DashboardProvider({ children }) {
  

  const [diasCampamento, setDiasCampamento] = useLocalStorage('diasCampamento', 0);
  const [inscriptos, setInscriptos] = useLocalStorage('inscriptos', []);
  const [instructores, setInstructores] = useLocalStorage('instructores', []);
  const [cabanias, setCabanias] = useLocalStorage('cabanias', []);
  const [hospedajes, setHospedajes] = useLocalStorage('hospedajes', []);
  const [lastUpdated, setLastUpdated] = useLocalStorage('lastUpdated', null);
  const [loading, setLoading] =  useState(true);

  useEffect(() => {
    const proximaFecha = new Date("2025-12-20T00:00:00");
    if (!isNaN(proximaFecha)) {
      const hoy = new Date();
      const diferencia = Math.ceil(
        (proximaFecha - hoy) / (1000 * 60 * 60 * 24)
      );
      setDiasCampamento(diferencia);
    }
  }, [setDiasCampamento]);

  useEffect(() => {
    const fetchData = async () => {
      
      // Si los datos fueron actualizados hace menos de 5 minutos, no recarga
      const now = new Date();
      if (lastUpdated && (now - new Date(lastUpdated)) < 5 * 60 * 1000 && inscriptos.length > 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [campersRes, instructorsRes, cabaniasRes, hospedaRes] = await Promise.all([
          axios.get(API_ROUTES.CAMPERS),
          axios.get(API_ROUTES.INSTRUCTORS),
          axios.get(API_ROUTES.CABANAS),
          axios.get(API_ROUTES.HOSPEDA)
        ]);

        setInscriptos(Array.isArray(campersRes.data.data) ? campersRes.data.data : []);
        setInstructores(Array.isArray(instructorsRes.data.data) ? instructorsRes.data.data : []);
        setCabanias(Array.isArray(cabaniasRes.data.data) ? cabaniasRes.data.data : []);
        setHospedajes(hospedaRes.data.data || []);
     setLastUpdated(new Date().toISOString());
      } catch (error) {
        console.error("Error loading data:", error);
        // Si hay error pero tenemos datos viejos, los mantenemos
        if (inscriptos.length === 0) {
          setInscriptos([]);
          setInstructores([]);
          setCabanias([]);
          setHospedajes([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lastUpdated,setLastUpdated, setInscriptos, setInstructores, setCabanias, setHospedajes, inscriptos.length]);

  const moveCampista = (campistaId, nuevaCabaniaId) => {
    setHospedajes(prev => prev.map(h => 
      h.campista_id === campistaId ? { ...h, cabania_id: nuevaCabaniaId } : h
    ));
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

// Función para forzar actualización de datos
  const refreshData = async () => {
    try {
      setLoading(true);
      const [campersRes, instructorsRes, cabaniasRes, hospedaRes] = await Promise.all([
        axios.get(API_ROUTES.CAMPERS),
        axios.get(API_ROUTES.INSTRUCTORS),
        axios.get(API_ROUTES.CABANAS),
        axios.get(API_ROUTES.HOSPEDA)
      ]);

      setInscriptos(Array.isArray(campersRes.data.data) ? campersRes.data.data : []);
      setInstructores(Array.isArray(instructorsRes.data.data) ? instructorsRes.data.data : []);
      setCabanias(Array.isArray(cabaniasRes.data.data) ? cabaniasRes.data.data : []);
      setHospedajes(hospedaRes.data.data || []);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContext.Provider value={{ 
      diasCampamento, 
      inscriptos, 
      instructores, 
      cabanias, 
      hospedajes, 
      setHospedajes,
      setCabanias,
      moveCampista, 
      removeCabania, 
      getOcupacion,
      cabaniasActivas,
      loading,
      refreshData,
      lastUpdated
    }}>
      {children}
    </DashboardContext.Provider>
  );
}