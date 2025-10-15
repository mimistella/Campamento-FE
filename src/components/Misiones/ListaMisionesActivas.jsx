import { useState } from "react";
import Modal from "../UICommons/Modal.jsx";
import { MissionCard } from "./MissionsCard.jsx";
import BotonEditarMision from "./BotonEditarMision.jsx";
import FormEditarMision from "./FormEditarMision.jsx";
import { useContext, useEffect } from "react";
import MisionesContext from "../../context/MisionesContext.js";


const ListaMisionesActivas = () =>{

    const [open, setOpen] = useState(false);
    const [misionSelec, setMisionSelect] = useState(null);
    const [editing, setEditing] = useState(false);
    const {misiones, fetchMisiones, deleteMision} = useContext(MisionesContext);

    useEffect(()=>{
        fetchMisiones();
    },[fetchMisiones])
    
    const setOnClick = (mision) =>{
        setOpen(true);
        setMisionSelect(mision);
    }

    return(
        <div className="inset-0 bg-gray-400 min-h-32 p-4 rounded-lg">
            <h1 className="text-2xl font-bold p-4">Lista Misiones Activas</h1>

            <ul>          
                {misiones.map(mision =>(
                    <li className="m-2 p-2 bg-gray-200 flex justify-between">
                        {mision.titulo}
                        <button 
                            className="bg-gray-300 px-2 hover:bg-gray-400 rounded-md"
                            onClick={() => setOnClick(mision)}
                        >

                            ver mas
                        </button>
                    </li>
                ))}
            </ul>

            {open && (
                <Modal onClose={ ()=> setOpen(false)}>

                    
                    {editing?
                        <FormEditarMision mision={misionSelec} onSave={fetchMisiones} onClose={() => {setEditing(false); setOpen(false)}}/>
                        :
                        <div>
                            <MissionCard mission={misionSelec}/> 
                            <div className="flex justify-around mt-4">
                                <button onClick={()=> setEditing(true)}>
                                    Editar
                                </button>
                                <button 
                                    onClick={
                                        ()=> {
                                            deleteMision(misionSelec.id); 
                                            fetchMisiones();
                                            setOpen(false);
                                        }}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    }
                    
                </Modal>
            
            )}
        </div>
    );
}

export default ListaMisionesActivas;