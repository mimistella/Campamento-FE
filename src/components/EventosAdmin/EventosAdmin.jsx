import ProximoEvento from "./ProximoEvento.jsx";
import { useState } from "react";

import ListaEventos from "./ListaEventos.jsx";
import { EditEventForm } from "./EditEventForm.jsx";
import { AddEventButton } from "./AddEventButton.jsx";

export default function EventosAdmin() {
//    const [eventos, setEventos] = useState([]);
    const [eventToEdit, setEventToEdit] = useState(null);

    // if (loading) return <p className="flex justify-center align-items-center text-gray-500 text-4xl p-16">Cargando eventos...</p>;
    // if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div id="EventosAdmin" className="min-h-screen bg-blue-50">
            <div className="fixed bg-gray-800 bg-opacity-20 text-white font-bold py-4 px-8 shadow-md text-sm right-0 bottom-4 lg:top-4 lg:bottom-auto">
                Sesión Admin
            </div>

            {/* Form para editar evento */}

            {eventToEdit && (
                <div id="edit-event-modal" className="fixed z-20 inset-0 bg-white/90 flex justify-center items-center">
                    <div className="bg-gray-200 p-6 rounded-xl shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4">Editing Event</h2>
                        <EditEventForm
                            event={eventToEdit }
                            onCancel={() => {setEventToEdit(null)}}
                        />
                    </div>
                </div>
            )}



            <section className="flex">
                <h2 className="font-bold text-xl text-blue-950 m-4 p-2">
                    Próximos Eventos
                </h2>

                {/* AGREGAR EVENTO */}
                <AddEventButton/>


            </section>
            <ProximoEvento onEdit={setEventToEdit} />

            <ListaEventos  onEdit={setEventToEdit} />
        </div>
    );
}

