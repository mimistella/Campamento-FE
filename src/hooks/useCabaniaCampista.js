import { useState, useEffect } from 'react';
import api from '@hooks/useApi';
import { useAuth } from '@hooks/useAuth';

export function useCabaniaCampista() {
  const [hospedaje, setHospedaje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [periodo, setPeriodo] = useState(null);
  const [deidades, setDeidades] = useState(null);
  const { user } = useAuth();

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const periodoRes = await api.get('/periodo/current');
      const periodoData = periodoRes.data.data;
      if (!periodoData) {
        setPeriodo(null);
        setHospedaje(null);
        return;
      }

      setPeriodo(periodoData);

      let hospedajeData = null;
      try {
        const hospedajeRes = await api.get(`hospedaje/campista/${user.id}`, {
          params: {
            fechaInicio: periodoData.fechaInicioPer,
            fechaFin: periodoData.fechaFinPer,
          },
        });
        hospedajeData = hospedajeRes.data.data;
      } catch (err) {
        if (err.response?.status !== 404) throw err;
      }

      setHospedaje(hospedajeData);

      if (!hospedajeData) {
        const deidadesRes = await api.get('/deidades');
        setDeidades(deidadesRes.data.data || []);
      } else {
        setDeidades(null);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user?.id) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function crearHospedaje(deidadId) {
    try {
      setLoading(true);
      setError(null);

      const cabaniaRes = await api.get(`/cabania/deidad/${deidadId}`);
      const cabania = cabaniaRes.data.data;
      if (!cabania) throw new Error('No se encontró cabaña para esa deidad');

      const res = await api.post('/hospedaje', {
        campistaId: user.id,
        cabaniaId: cabania.id,
      });

      setHospedaje(res.data.data);
      setDeidades(null);
      alert('Hospedaje creado con éxito ');
      await fetchData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al crear hospedaje');
    } finally {
      setLoading(false);
    }
  }

  return {
    hospedaje,
    loading,
    error,
    periodo,
    hasHospedajeActivo: !!hospedaje,
    deidades,
    crearHospedaje,
    refetch: fetchData,
  };
}