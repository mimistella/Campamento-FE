import ProximoEvento from "./ProximoEvento.jsx";
import { useState } from "react";

import ListaEventos from "./ListaEventos.jsx";
import { EditEventForm } from "./EditEventForm.jsx";
import { AddEventButton } from "./AddEventButton.jsx";
import SolicitudesList from "./SolicitudesList.jsx";
import AddButton from "../UICommons/AddButton.jsx";


export default function EventosAdmin() {
    const [listOpen, setListOpen] = useState(null);

    const [eventToEdit, setEventToEdit] = useState(false);

    // if (loading) return <p className="flex justify-center align-items-center text-gray-500 text-4xl p-16">Cargando eventos...</p>;
    // if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div id="EventosAdmin" className="min-h-screen bg-amber-50">
            <div className="fixed bg-gray-800 bg-opacity-20 text-white font-bold py-4 px-8 shadow-md text-sm right-0 bottom-4 lg:top-4 lg:bottom-auto">
                Sesión Admin
            </div>

            {/* Form para editar evento */}

            {eventToEdit && (
                <div id="edit-event-modal" className="fixed z-20 inset-0 bg-white/90 flex justify-center items-center">
                    <div className="rounded-xl shadow-lg text-center">
                        <EditEventForm
                            event={eventToEdit }
                            onFinished={() => {setEventToEdit(null)}}
                        />
                    </div>
                </div>
            )}



            <section className="flex">

                {/* AGREGAR EVENTO */}
                <AddEventButton/>


                <AddButton onClick={()  => setListOpen(true)} text="Lista de Solicitudes"/>
                {listOpen && (
                    <SolicitudesList onClose={()=> setListOpen(false)}/>
                )}                   

            </section>

            <ProximoEvento onEdit={setEventToEdit} />

            <ListaEventos  onEdit={setEventToEdit} />
        </div>
    );
}

