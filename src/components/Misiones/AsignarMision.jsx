import { useState, useEffect } from "react";
import api from "../../hooks/useApi.js";
import FormSeleccionarMision from "./FormSeleccionarMision.jsx";


//import api from "../../hooks/useApi.js";
const AsignarMision = ({onClose, onChange}) =>{
    
    const [misiones, setMisiones] = useState([])
    const [campistas, setCampistas] = useState([])


    useEffect( () =>{
        const fetchMisiones = async () =>{
            try{
                const response = await api.get('/misiones');
                setMisiones(response.data.data);
            }catch(error){
                console.log(error)
            }
        }

        const fetchCampistas = async () =>{
            try{
                const response = await api.get('/campista');
                setCampistas(response.data.data);
            }catch(error){
                console.log(error)
            }
        }

        fetchCampistas();
        fetchMisiones();
    },[]);


    return(
        <div className="flex flex-col">
            <h1 className="font-bold text-xl flex self-center">Asignar Mision</h1>
            <FormSeleccionarMision  misiones={misiones} campistas={campistas} onClose={onClose} onChange={onChange}/>
             
        </div>
    )
}
export default AsignarMision;