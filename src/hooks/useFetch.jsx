import { useEffect, useState } from "react";
import api from "./useApi.js";

export default function useFetch( ruta ){
    const [value, setValue] = useState([]);

    useEffect ( () => {
        const Fetching = async () =>{
            try{
                const response = await api.get(`/${ruta}`);
                setValue(response.data)
            } catch(error){
                console.error("Error al obtener de la base de datos: ", error)
            }
        }

        Fetching();
    })

    return value;

}