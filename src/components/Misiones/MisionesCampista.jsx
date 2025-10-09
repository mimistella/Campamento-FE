import { MissionCard } from "./MissionsCard.jsx";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../hooks/useApi.js";


const MisionesCampista = () => {

     const [misiones, setMisiones] = useState([]);
     

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await api.get('/misiones/me'); // DEBERIA SER RUTA A MISIONES DEL CAMPISTA
                

                const misionesLista = getMisionList(response.data.data);
                setMisiones(misionesLista);

                return ;
            } catch (err) {
                console.error(err);
                return err;
            } 
        };

        fetchMissions();
    }, []);

    function getMisionList(asignaMision){
        const misionesLista = [];
        asignaMision.forEach(asigna => {
           
            misionesLista.push(asigna.mision);
            console.log(asigna.mision);
        });
        return misionesLista;
    }

    return(
        <div>
            <h1 className="w-fit py-6 px-8 mb-2 text-2xl font-bold text-gray-800 rounded-lg"> 
                Misiones Asignadas 
            </h1>
            <ul>
                {misiones.map(mision =>(
                    <li key={mision.id} className="p-2 bg-gray-100">
                        <MissionCard mission = {mision}/>
                    </li>    

                )
            
            )}
            </ul>
        </div>
    );
}

export default MisionesCampista;