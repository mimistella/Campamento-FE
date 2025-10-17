import { MissionCard } from "./MissionsCard.jsx";
import { useContext, useEffect } from "react";
import MisionesContext from "../../context/MisionesContext.js";

const MisionesCampista = () => {
    const {fetchAsignadas, asignadas:misiones} = useContext(MisionesContext)

    useEffect(()=>{

        fetchAsignadas();
    },[fetchAsignadas])
    
    return(
        <div >
            <h1 className="w-fit py-6 px-8 mb-2 text-2xl font-bold text-amber-800 rounded-lg"> 
                Misiones Asignadas 
            </h1>
            
            {misiones.length > 0 ?

            <ul>
                {misiones.map(mision =>(
                    <li key={mision.id} className="p-2 relative">
                        <MissionCard mission = {mision.mision}/>
                        <p className="absolute text-amber-950 font-bold right-20 top-16">{mision.estado}</p>
                    </li>    

                )
            
            )}
            </ul>  :
            <p>No hay misiones asignadas</p>
            }
        </div>
    );
}

export default MisionesCampista;