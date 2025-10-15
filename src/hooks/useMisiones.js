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
    } finally{
      setLoading(false);
    }
  }, [])


  const fetchMisiones = useCallback(() =>{
    fetch('misiones',setMisiones);
  },[fetch]);

  const fetchAsignadas = useCallback(() =>{
    fetch('asigna-mision', setAsignadas);
  },[fetch]);

  const refetch = useCallback((ruta = 'misiones') =>{
    ruta =='misiones' ? fetch(ruta, setMisiones) : fetch(ruta, setAsignadas)
  },[fetch])

  const getMision = useCallback(async(id)=>{
    try{
      const {data} = await api.get(`/misiones/${id}`)
      return data;
    } catch(err){
      setError(err);
      console.error(err);
    }
  },[])


  const create = useCallback(async (formData, ruta, setter) => {
      try {
          const { data } = await api.post(`/${ruta}`, formData);
          setter(prev => [...prev, data.data]);
          await refetch(ruta)
          return data;
      } catch (err) {
          console.log(err);
          throw err;
      }
    }, [refetch]);


    const createMision = useCallback((formData) =>{
      create(formData, 'misiones', setMisiones)
    },[create])

    const createAsignada = useCallback((formData) =>{
      create(formData, 'asigna-mision', setAsignadas)
    },[create])


    const update = useCallback(async (id, formData, ruta, setter) =>{
        try{
            const { data } = await api.patch(`/${ruta}/${id}`, formData);  
            setter(prev => prev.map(m => m.id === id ? data : m));
            refetch(ruta);
        return data;
        }
        catch(err){
            console.log(err)
            throw err;
        }
    }, [refetch]);

    const updateMision = useCallback((id, formData)=>{
      update(id, formData, 'misiones', setMisiones)
    },[update])

    const updateAsignada = useCallback((id, formData)=>{
        update(id, formData, 'asigna-mision', setAsignadas)
      },[update])

    const deleteGen = useCallback(async (id, ruta, setter) => {
        try {
            await api.delete(`/${ruta}/${id}`);
            setter(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.log(err)
            throw err;
        }
    }, []);

    const deleteMision = useCallback((id) =>{
      deleteGen(id, 'misiones', setMisiones)
    },[deleteGen])

    const deleteAsignadas = useCallback((id) =>{
      deleteGen(id, 'asigna-mision', setAsignadas)
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
