import { MissionCard } from "./MissionsCard.jsx";
import { useContext, useEffect, useState } from "react";
import MisionesContext from "../../context/MisionesContext.js";

const MisionesCampista = () => {
    const {fetchAsignadas} = useContext(MisionesContext)
    const [misiones, setMisiones] = useState([])


    useEffect(()=>{
        const FetchMisiones = async() =>{
            const asig = await fetchAsignadas();
            const lista = []
            asig.data.map(asigna => {lista.push(asigna.mision)})
            setMisiones(lista)
        }
        FetchMisiones();
    },[fetchAsignadas])
    
    return(
        <div >
            <h1 className="w-fit py-6 px-8 mb-2 text-2xl font-bold text-amber-800 rounded-lg"> 
                Misiones Asignadas 
            </h1>
            
            {misiones.length > 0 ?

            <ul>
                {misiones.map(mision =>(
                    <li key={mision.id} className="p-2 ">
                        <MissionCard mission = {mision}/>
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