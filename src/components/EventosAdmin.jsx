//TEMPORALMENTE VIENE DESDE CAMPISTA/PERFIL 

import ProximoEvento from "./EventosAdmin/ProximoEvento.jsx";
import { useState, useEffect } from "react";
import api from '../hooks/useApi';
import ListaEventos from "./EventosAdmin/ListaEventos.jsx";
import { EditEventForm } from "./EventosAdmin/EditEventForm.jsx";
import { AddEventButton } from "./EventosAdmin/AddEventButton.jsx";

export default function EventosAdmin() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null);

    function handleSave(updatedEvent) {
        setEventos((prevEventos) =>
            prevEventos.map((evento) => (evento.id === updatedEvent.id ? updatedEvent : evento))
        );
        setEventToEdit(null);
    }


    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await api.get('/eventos');
                setEventos(response.data.data);
            } catch (err) {
                console.error(err);
                setError('Error al cargar los eventos');
            } finally {
                setLoading(false);
            }
        };

        fetchEventos();
    }, []);


    if (loading) return <p className="flex justify-center align-items-center text-gray-500 text-4xl p-16">Cargando eventos...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

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
                            onSave={handleSave}
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
            <ProximoEvento eventos={eventos} onEdit={setEventToEdit} />

            <ListaEventos eventos={eventos} onEdit={setEventToEdit} />
        </div>
    );
}

