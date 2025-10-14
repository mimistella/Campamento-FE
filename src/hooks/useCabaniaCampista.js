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
      const hospedajeData = data.find((h) => h.campista?.id === user.id) || null;
      setHospedaje(hospedajeData);

      if (hospedajeData?.cabania?.id) {
        // Si hay hospedaje, traer detalles de la cabaña
        const cabRes = await api.get(`/cabanias/myCabin/${hospedajeData.cabania.id}`);
        setCabaniaDetalle(cabRes.data.data || null);
        setDeidades(null); // No necesitamos deidades
      } else {
        // Si no hay hospedaje, traer las deidades disponibles
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
      const cabania = cabanias.find((c) => c.deidad?.id === deidadId) || null;

      if (!cabania) throw new Error("No se encontró cabaña para esa deidad");

      const res = await api.post("/hospedaje", {
        campistaId: user.id,
        cabaniaId: cabania.id,
      });

      setHospedaje(res.data.data);

      // Traer detalles de la cabaña creada
      const cabRes = await api.get(`/cabanias/myCabin/${res.data.data.cabania.id}`);
      setCabaniaDetalle(cabRes.data.data || null);

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
    hasHospedajeActivo: !!hospedaje,
    deidades,
    crearHospedaje,
    refetch: fetchData,
  };
}