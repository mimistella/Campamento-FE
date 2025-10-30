import { useState } from "react";
import Modal from "@uicommons/Modal.jsx";
import { MissionCard } from "./MissionsCard.jsx";
import BotonEditarMision from "./BotonEditarMision.jsx";
import FormEditarMision from "./FormEditarMision.jsx";
import { useContext, useEffect } from "react";
import MisionesContext from "@context/MisionesContext.js";
import { useToaster } from "@hooks/useToaster.js"
import { handleApiError } from "@components/utilities/HandleApiError.js"


const ListaMisionesActivas = () =>{

    const [open, setOpen] = useState(false);
    const [misionSelec, setMisionSelect] = useState(null);
    const [editing, setEditing] = useState(false);
    const {misiones, fetchMisiones, deleteMision} = useContext(MisionesContext);
    const { success:toastSuccess, error: toastError } = useToaster();

    useEffect(()=>{
        fetchMisiones();
    },[fetchMisiones])
    
    const setOnClick = (mision) =>{
        setOpen(true);
        setMisionSelect(mision);
    }

    const handleDelete = async() =>{
        try{
            await deleteMision(misionSelec.id);
            toastSuccess("Mision borrada exitosamente");
        }catch(err){
            const { errorMessage } = handleApiError(err, "Borrando mision")
            toastError(errorMessage);
        }finally{
            setOpen(false);
        }

    }

    return(
        <div className="inset-0 bg-white shadow-md border-2 min-h-32 p-4 rounded-lg">
            <h1 className="text-2xl font-bold p-4">Lista Misiones Activas</h1>

            <ul className="flex flex-col gap-2">          
                {misiones.map(mision =>(
                    <li className="m- p-3 bg-amber-100 flex justify-between rounded-lg shadow-sm border-amber-900 border-1">
                        <p className="text-amber-950 font-bold">{mision.titulo}</p>
                        <button 
                            
                            onClick={() => setOnClick(mision)}
                        >
                            {/* */}
                            <svg className="mr-2 text-amber-950 hover:text-amber-800 size-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>

            {open && (
                <Modal onClose={ ()=> setOpen(false)}>

                    <div className="p-6 bg-amber-50 rounded-md">
                        {editing?
                            <FormEditarMision mision={misionSelec} onSave={fetchMisiones} onClose={() => {setEditing(false); setOpen(false)}}/>
                            :
                            <div>
                                <MissionCard mission={misionSelec}/> 
                                <div className="mt-4 font-bold flex justify-around">
                                    <button onClick={()=> setEditing(true)}>
                                        Editar
                                    </button>
                                    <button onClick={ handleDelete }>
                                        Eliminar
                                    </button>

                                </div>
                            </div>
                        }
                    </div>
                </Modal>
            
            )}
        </div>
    );
}

export default ListaMisionesActivas;