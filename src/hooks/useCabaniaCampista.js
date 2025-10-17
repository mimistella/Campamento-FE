import { useState, useEffect, useCallback } from "react";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";

export function useCabaniaCampista() {
  const { user } = useAuth();
  const [hospedaje, setHospedaje] = useState(null);
  const [cabaniaDetalle, setCabaniaDetalle] = useState(null);
  const [deidades, setDeidades] = useState(null);
  const [periodo, setPeriodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Periodo actual
      const periodoRes = await api.get("/periodo/current");
      const periodoActual = periodoRes.data?.date || null;
      setPeriodo(periodoActual);

      // 2. Hospedajes del usuario
      const hospedajeRes = await api.get("/hospedaje");
      const data = Array.isArray(hospedajeRes.data?.data) ? hospedajeRes.data.data : [];
      const hospedajeActivo = data.find(h => h.estado === "reservada") || data[0] || null;
      setHospedaje(hospedajeActivo);

      if (hospedajeActivo?.cabania?.id) {
        // 3a. Si ya tiene cabaña, obtenemos detalles
        const cabRes = await api.get(`/cabanias/myCabin/${hospedajeActivo.cabania.id}`);
        setCabaniaDetalle(cabRes.data?.data || cabRes.data || null);
        setDeidades(null);
      } else {
        // 3b. Si no tiene cabaña, obtener deidades disponibles
        const deidadesRes = await api.get("/deidades");
        setDeidades(Array.isArray(deidadesRes.data?.data) ? deidadesRes.data.data : []);
        setCabaniaDetalle(null);
      }
    } catch (err) {
      console.error("Error fetchData:", err);
      setError(err.response?.data?.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const crearHospedaje = useCallback(
    async (deidadId) => {
      if (!periodo) return;
      setLoading(true);
      setError(null);

      try {
        // Buscar cabaña correspondiente a la deidad
        const cabaniaRes = await api.get("/cabanias");
        const cabanias = Array.isArray(cabaniaRes.data?.data) ? cabaniaRes.data.data : [];
        const cabania = cabanias.find(c => c.deidad?.id === Number(deidadId));

        if (!cabania) throw new Error("No se encontró cabaña para esa deidad");

        const fechaInicio = periodo.fechaInicioPer.replace("T", " ").slice(0, 19);
        const fechaFin = periodo.fechaFinPer.replace("T", " ").slice(0, 19);

        // Crear hospedaje
        const res = await api.post("/hospedaje", {
          campista: user.id,
          cabania: cabania.id,
          fechaInicio,
          fechaFin,
          periodo: periodo.id,
        });

        const nuevoHospedaje = res.data?.data || null;
        setHospedaje(nuevoHospedaje);

        if (nuevoHospedaje?.cabania?.id) {
          const cabRes = await api.get(`/cabanias/myCabin/${nuevoHospedaje.cabania.id}`);
          setCabaniaDetalle(cabRes.data?.data || null);
        }

        setDeidades(null);
        alert("Hospedaje creado con éxito");

        // Refrescar datos
        await fetchData();
      } catch (err) {
        console.error("Error crearHospedaje:", err);
        setError(err.response?.data?.message || err.message || "Error al crear hospedaje");
      } finally {
        setLoading(false);
      }
    },
    [user, periodo, fetchData]
  );

  return {
    hospedaje,
    cabaniaDetalle,
    deidades,
    periodo,
    loading,
    error,
    hasHospedajeActivo: !!hospedaje?.cabania?.id,
    crearHospedaje,
    refetch: fetchData,
  };
}