import { MissionCard } from "./MissionsCard.jsx";
import { useContext, useEffect } from "react";
import MisionesContext from "../../context/MisionesContext.js";

const MisionesCampista = () => {
    const {misiones, fetchMisiones} = useContext(MisionesContext)

    useEffect(()=>{
        fetchMisiones()
    },[fetchMisiones])
    
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