import api from "./useApi.js";
import { useState, useCallback } from "react";

export function useMisiones() {

  const [misiones, setMisiones] = useState([]);

  const [asignadas, setAsignadas] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetch = useCallback(async (ruta, set) =>{
    setLoading(true);
    setError(null);

    try{
      const {data} = await api.get(`/${ruta}`);
      set(data.data);
      return data;
    } catch(err){
      setError(err?.response?.data?.message || "Error al cargar desde la base de datos");
      console.error(err);
      throw err;
    } finally{
      setLoading(false);
    }
  }, [])


  const fetchMisiones = useCallback(() =>{
    return fetch('misiones',setMisiones);
  },[fetch]);

  const fetchAsignadas = useCallback(() =>{
    return fetch('asigna-mision', setAsignadas);

  },[fetch]);

  const refetch = useCallback((ruta = 'misiones') =>{
    return ruta =='misiones' ? fetch(ruta, setMisiones) : fetch(ruta, setAsignadas)
  },[fetch])

  const getMision = useCallback(async(id)=>{
    try{
      const {data} = await api.get(`/misiones/${id}`)
      return data;
    } catch(err){
      setError(err);
      console.error(err);
      throw err;
    }
  },[])


  const create = useCallback(async (formData, ruta) => {
      try {
          const { data } = await api.post(`/${ruta}`, formData);
          console.log(data);
          //setter(prev => [...prev, data.data]);
          await refetch(ruta)
          return data;
      } catch (err) {
          console.log(err);
          throw err;
      }
    }, [refetch]);


    const createMision = useCallback((formData) =>{
      return create(formData, 'misiones', setMisiones)
    },[create])

    const createAsignada = useCallback((formData) =>{
      return create(formData, 'asigna-mision', setAsignadas)
    },[create])


    const update = useCallback(async (id, formData, ruta) =>{
        try{
            const { data } = await api.patch(`/${ruta}/${id}`, formData);  
            refetch(ruta);
        return data;
        }
        catch(err){
            console.log(err)
            throw err;
        }
    }, [refetch]);

    const updateMision = useCallback((id, formData)=>{
      return update(id, formData, 'misiones')
    },[update])

    const updateAsignada = useCallback((id, formData)=>{
        return update(id, formData, 'asigna-mision')
      },[update])

    const deleteGen = useCallback(async (id, ruta, setter) => {
        try {
            await api.delete(`/${ruta}/${id}`);
            setter(prev => prev.filter(m => m.id !== id));
            fetchAsignadas();
            fetchMisiones();
        } catch (err) {
            console.log(err)
            throw err;
        }
    }, []);

    const deleteMision = useCallback((id) =>{
      return deleteGen(id, 'misiones', setMisiones)
    },[deleteGen])

    const deleteAsignadas = useCallback((id) =>{
      return deleteGen(id, 'asigna-mision', setAsignadas)
    },[deleteGen])




  return { 
    misiones, 
    fetchMisiones, 
    getMision,
    createMision, 
    updateMision, 
    deleteMision, 
    asignadas,
    fetchAsignadas,
    createAsignada,
    updateAsignada,
    deleteAsignadas,
    loading, 
    error ,
    refetch
    };
}
