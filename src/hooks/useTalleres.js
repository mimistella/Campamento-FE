import { useEffect, useState } from "react";
import api from "./useApi";

export function useTalleres() {
  const [talleres, setTalleres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const response = await api.get("/talleres");
        setTalleres(response.data.data); 
      } catch (err) {
        console.error(err);
        setError("Error al cargar los talleres");
      } finally {
        setLoading(false);
      }
    };

    fetchTalleres();
  }, []);

  return { talleres, loading, error };
}