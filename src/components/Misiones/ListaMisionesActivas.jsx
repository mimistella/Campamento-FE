import { useState } from "react";
import Modal from "../UICommons/Modal.jsx";
import MisionDetalle from "./MisionDetalle.jsx";

const ListaMisionesActivas = ({misiones}) =>{

    const [open, setOpen] = useState(false);
    const [misionSelec, setMisionSelect] = useState(null);

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
                {/* Asignar Mision */}

                    
                    </li>
                    
                ))}
                
            </ul>

            {open && (
                <Modal onClose={ ()=> setOpen(false)}>
                    <MisionDetalle mision={misionSelec}/>
                </Modal>
            
            )}
        </div>
    );
}

export default ListaMisionesActivas;