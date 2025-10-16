// hooks/useEventos.js
import { useState, useCallback } from "react";
import api from "./useApi.js";

export function useEventos() {
  // Estados para eventos
  const [eventos, setEventos] = useState([]);
  const [loadingEventos, setLoadingEventos] = useState(false);
  const [errorEventos, setErrorEventos] = useState(null);

  // Estados para solicitudes
  const [solicitudes, setSolicitudes] = useState([]);
  const [loadingSolicitudes, setLoadingSolicitudes] = useState(false);
  const [errorSolicitudes, setErrorSolicitudes] = useState(null);

  // ============ EVENTOS ============

  const fetchEventos = useCallback(async () => {
    setLoadingEventos(true);
    setErrorEventos(null);
    try {
      const { data } = await api.get("/eventos");
      setEventos(data.data);
      return data;
    } catch (err) {
      setErrorEventos(err?.response?.data?.message || "Error al cargar eventos");
      console.error(err);
      throw err;
    } finally {
      setLoadingEventos(false);
    }
  }, []);

  const fetchEvento = useCallback(async (id) =>{
    try{
        const { data } = await api.get(`/eventos/${id}`)
        return data.data
    } catch(err){
        console.error(err)
        throw err;
    }
  }, [])

  const createEvento = useCallback(async (formData) => {
    setLoadingEventos(true);
    setErrorEventos(null);
    try {
      const { data } = await api.post("/eventos", formData);
      setEventos(prev => [...prev, data]);
      return data;
    } catch (err) {
      setErrorEventos(err?.response?.data?.message || "Error al crear evento");
      console.error(err);
      throw err;
    } finally {
      setLoadingEventos(false);
    }
  }, []);

  const updateEvento = useCallback(async (id, formData) => {
    setLoadingEventos(true);
    setErrorEventos(null);
    try {
      const { data } = await api.patch(`/eventos/${id}`, formData);
      setEventos(prev => prev.map(e => e.id === id ? data : e));
      return data;
    } catch (err) {
      setErrorEventos(err?.response?.data?.message || "Error al actualizar evento");
      console.error(err);
      throw err;
    } finally {
      setLoadingEventos(false);
    }
  }, []);

  const deleteEvento = useCallback(async (id) => {
    setLoadingEventos(true);
    setErrorEventos(null);
    try {
      await api.delete(`/eventos/${id}`);
      setEventos(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      setErrorEventos(err?.response?.data?.message || "Error al eliminar evento");
      console.error(err);
      throw err;
    } finally {
      setLoadingEventos(false);
    }
  }, []);

  // ============ SOLICITUDES ============

  const fetchSolicitudes = useCallback(async () => {
    setLoadingSolicitudes(true);
    setErrorSolicitudes(null);
    try {
      const { data } = await api.get("/solicitud-evento");
      setSolicitudes(data.data || data);
      return data;
    } catch (err) {
      setErrorSolicitudes(err?.response?.data?.message || "Error al cargar solicitudes");
      console.error(err);
      throw err;
    } finally {
      setLoadingSolicitudes(false);
    }
  }, []);

  const createSolicitud = useCallback(async (formData) => {
    setLoadingSolicitudes(true);
    setErrorSolicitudes(null);
    try {
      const { data } = await api.post("/solicitud-evento", formData);
      setSolicitudes(prev => [...prev, data]);
      return data;
    } catch (err) {
      setErrorSolicitudes(err?.response?.data?.message || "Error al crear solicitud");
      console.error(err);
      throw err;
    } finally {
      setLoadingSolicitudes(false);
    }
  }, []);

  const updateSolicitud = useCallback(async (id, formData) => {
    setLoadingSolicitudes(true);
    setErrorSolicitudes(null);
    try {
      const { data } = await api.patch(`/solicitud-evento/${id}`, formData);
      setSolicitudes(prev => prev.map(s => s.id === id ? data : s));
      return data;
    } catch (err) {
      setErrorSolicitudes(err?.response?.data?.message || "Error al actualizar solicitud");
      console.error(err);
      throw err;
    } finally {
      setLoadingSolicitudes(false);
    }
  }, []);

  const deleteSolicitud = useCallback(async (id) => {
    setLoadingSolicitudes(true);
    setErrorSolicitudes(null);
    try {
      await api.delete(`/solicitud-evento/${id}`);
      setSolicitudes(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setErrorSolicitudes(err?.response?.data?.message || "Error al eliminar solicitud");
      console.error(err);
      throw err;
    } finally {
      setLoadingSolicitudes(false);
    }
  }, []);

  // ============ FUNCIONES ESPECÍFICAS ============

  // Aprobar/Rechazar solicitud
  const actualizarEstadoSolicitud = useCallback(async (id, estado) => {
    return updateSolicitud(id, { estado });
  }, [updateSolicitud]);

  // Obtener solicitudes por campista
  const fetchSolicitudesByCampista = useCallback(async (campistaId) => {
    setLoadingSolicitudes(true);
    setErrorSolicitudes(null);
    try {
      const { data } = await api.get(`/solicitud-evento/campista/${campistaId}`);
      return data.data || data;
    } catch (err) {
      setErrorSolicitudes(err?.response?.data?.message || "Error al cargar solicitudes");
      console.error(err);
      throw err;
    } finally {
      setLoadingSolicitudes(false);
    }
  }, []);

  // Obtener solicitudes por evento
  const fetchSolicitudesByEvento = useCallback(async (eventoId) => {
    setLoadingSolicitudes(true);
    setErrorSolicitudes(null);
    try {
      const { data } = await api.get(`/solicitud-evento/evento/${eventoId}`);
      return data.data || data;
    } catch (err) {
      setErrorSolicitudes(err?.response?.data?.message || "Error al cargar solicitudes");
      console.error(err);
      throw err;
    } finally {
      setLoadingSolicitudes(false);
    }
  }, []);

  return {
    // Eventos
    eventos,
    loadingEventos,
    errorEventos,
    fetchEventos,
    createEvento,
    updateEvento,
    deleteEvento,
    fetchEvento,

    // Solicitudes
    solicitudes,
    loadingSolicitudes,
    errorSolicitudes,
    fetchSolicitudes,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,

    // Helpers
    actualizarEstadoSolicitud,
    fetchSolicitudesByCampista,
    fetchSolicitudesByEvento,
  };
}