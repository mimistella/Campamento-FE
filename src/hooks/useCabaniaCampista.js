import { useState, useEffect } from 'react';
import api from '@hooks/useApi';
import { useAuth } from '@hooks/useAuth';

export function useCabaniaCampista() {
  const [hospedaje, setHospedaje] = useState(null);
  const [cabaniaDetalle, setCabaniaDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periodo, setPeriodo] = useState(null);
  const [deidades, setDeidades] = useState(null);
  const { user } = useAuth();

  async function fetchData() {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);


      const periodoRes = await api.get("/periodo/current");
      setPeriodo(periodoRes.data.date || null);


      const hospedajeRes = await api.get("/hospedaje");
      const data = hospedajeRes.data.data || [];


      const hospedajeActivo = Array.isArray(data)
        ? data.find(h => h.estado === "reservada") || data[0]
        : data;

      setHospedaje(hospedajeActivo);

      if (hospedajeActivo?.cabania?.id) {

        const cabRes = await api.get(`/cabanias/myCabin/${hospedajeActivo.cabania.id}`);
        setCabaniaDetalle(cabRes.data.data || cabRes.data || null);
        setDeidades(null);
      } else {

        const deidadesRes = await api.get("/deidades");
        setDeidades(deidadesRes.data.data || []);
        setCabaniaDetalle(null);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function crearHospedaje(deidadId) {
    try {
      setLoading(true);
      setError(null);

      const cabaniaRes = await api.get("/cabanias");
      const cabanias = cabaniaRes.data.data;
      const cabania = cabanias.find((c) => c.deidad?.id === Number(deidadId)) || null;
      const fechaInicioHosp = periodo.fechaInicioPer.replace("T", " ").slice(0, 19);
      const fechaFinHosp = periodo.fechaFinPer.replace("T", " ").slice(0, 19);
      if (!cabania) throw new Error("No se encontró cabaña para esa deidad");

      const res = await api.post("/hospedaje", {
        campista: user.id,
        cabania: cabania.id,
        fechaInicio: fechaInicioHosp,
        fechaFin: fechaFinHosp,
        periodo: periodo.id,
      });

      const nuevoHospedaje = res.data.data;
      setHospedaje(nuevoHospedaje);

      const cabaniaId = nuevoHospedaje.cabania?.id ?? nuevoHospedaje.cabania;
      if (cabaniaId) {
        const cabRes = await api.get(`/cabanias/myCabin/${cabaniaId}`);
        setCabaniaDetalle(cabRes.data.data || null);
      }

      setDeidades(null);
      alert("Hospedaje creado con éxito");

      await fetchData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al crear hospedaje");
    } finally {
      setLoading(false);
    }
  }

  return {
    hospedaje,
    cabaniaDetalle,
    loading,
    error,
    periodo,
    hasHospedajeActivo: !!hospedaje?.cabania?.id,
    deidades,
    crearHospedaje,
    refetch: fetchData,
  };
}