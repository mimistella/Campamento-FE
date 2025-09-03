import {useEffect, useState} from "react";
import api from "./useApi";

export function useCabanas() {
  const [cabanas, setCabanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCabanas = async () => {
      try {
        const response = await api.get("/cabanias");
        setCabanas(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar las cabañas");
      } finally {
        setLoading(false);
      }
    };

    fetchCabanas();
  }, []);

  return { cabanas, loading, error };
}
