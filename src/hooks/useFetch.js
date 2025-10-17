import { useEffect, useState } from "react";
import api from "./useApi.js";

export default function useFetch(ruta) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/${ruta}`);
        setData(response.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Error al obtener datos");
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetching();
  }, [ruta]); 

  return { data, loading, error };
}