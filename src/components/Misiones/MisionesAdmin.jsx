import AddButton from "@uicommons/AddButton.jsx";
import Modal from "@uicommons/Modal.jsx";
import AddMisionForm from "./FormAddMision.jsx";
import FormSeleccionarMision from "./FormSeleccionarMision.jsx";
import ListaMisionesActivas from "./ListaMisionesActivas.jsx";
import ListaMisionesAsignadas from "./ListaMisionesAsignadas.jsx";

import { useState } from "react";

const MisionesAdmin = () =>{
    const [openAdd, setOpenAdd] = useState(null)
    const [openAsign, setOpenAsign] = useState(null)

    return(
        <div className="h-screen justify-between items-start bg-amber-50">
            <h1 className="w-fit py-6 px-8 mb-2 text-2xl font-bold text-amber-800 rounded-lg" > Administrar Misiones </h1>


            { /* Botones Crear - Asignar */ }
            <div id="contentMisionsAdmin" className="flex justify-center">

                <AddButton text="Crear Mision" onClick={()=> setOpenAdd(true)}/>
                {openAdd && (
                    <Modal onClose = { ()=> setOpenAdd(false) }>
                        <AddMisionForm onClose = { ()=> {setOpenAdd(false) }}/>
                    </Modal>
                )}

                <AddButton text="Asignar Mision" onClick= { () => setOpenAsign(true) }/>
                {/* Asignar Mision */}
                {openAsign && (
                    <Modal onClose={ ()=> setOpenAsign(false)}>
                        <FormSeleccionarMision onClose= { ()=> setOpenAsign(false)} />
                    </Modal>
                )}

            </div>
            
            { /* Listados */}
            <div id="Listas Misiones" className="mt-16 p-4 lg:flex lg:justify-around h-auto gap-10">

                {/* Lista Misiones Activas */}
                <div className="flex-1">
                    <ListaMisionesActivas />
                </div>

                {/* Lista Misiones Asignadas */}
                <div className="flex-1">
                    <ListaMisionesAsignadas />
                </div>

            </div>

        </div>
    );
};

export default MisionesAdmin;