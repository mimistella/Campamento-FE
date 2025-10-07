import AddButton from "../UICommons/AddButton.jsx";
import AddMisionForm from "./AddMisionForm.jsx";
import AsignarMision from "./AsignarMision.jsx";
import ListaMisionesActivas from "./ListaMisionesActivas.jsx";
import ListaMisionesAsignadas from "./ListaMisionesAsignadas.jsx";

import { useState, useEffect } from "react";
import Modal from "../UICommons/Modal.jsx";
import api from "../../hooks/useApi.js";

const MisionesAdmin = () =>{
    const [openAdd, setOpenAdd] = useState(null)
    const [openAsign, setOpenAsign] = useState(null)
    const [misiones, setMisiones] = useState([])
    const [misionesAsig, setMisionesAsig] = useState([])

    function HandleClick(state){
        setOpenAdd(state);
    };

    useEffect( () =>{


        fetchMisionesAsig();
        fetchMisiones();
    },[]);

    const fetchMisiones = async () =>{
        try{
            const response = await api.get(`/misiones`);
            setMisiones(response.data.data);
        }catch(error){
            console.log(error)
        }
    }
    const fetchMisionesAsig = async () =>{
        try{
            const response = await api.get("/asigna-mision")
            setMisionesAsig(response.data.data)
        }catch(error){
            console.log("error al recuper misiones asignadas" ,error)
        }
    }



    return(
        <div className="h-screen justify-between items-start">
            <h1 className="w-fit py-6 px-8 mb-2 text-2xl font-bold text-gray-800 rounded-lg" > Administrar Misiones </h1>
            <div id="contentMisionsAdmin" className="flex justify-center">


                <AddButton text="Crear Mision" onClick={()=> setOpenAdd(true)}/>
                {/* Crear Mision */}
                {openAdd && (
                    <AddMisionForm onClose = { ()=> setOpenAdd(false) } onChange={() => fetchMisiones()}/>
                )}


                <AddButton text="Asignar Mision" onClick= { () => setOpenAsign(true) }/>
                {/* Asignar Mision */}
                {openAsign && (
                    <Modal onClose={ ()=> setOpenAsign(false)}>
                        <AsignarMision onClose= { ()=> setOpenAsign(false)} onChange={() => fetchMisionesAsig()} />
                    </Modal>
                    
                )}


            </div>
            
            <div id="Listas Misiones" className="mt-16 p-4 lg:flex lg:justify-around h-auto gap-10">
                {/* Lista Misiones Activas */}
                <div className="flex-1">
                    <ListaMisionesActivas misiones = {misiones}/>
                </div>

                {/* Lista Misiones Asignadas */}
                <div className="flex-1">
                    <ListaMisionesAsignadas misionesAsig = {misionesAsig}/>
                </div>

            </div>

        </div>
    );
};

export default MisionesAdmin;