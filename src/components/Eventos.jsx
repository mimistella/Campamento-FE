import React, { useEffect, useState } from 'react';
import api from '../hooks/useApi';
import EventsGrid from './Eventos/EventsGrid';
import EventsSlider from './Eventos/EventsSlider';
import { BotonMisEventos } from './Eventos/BotonMisEventos';
import { ListaMisEventos } from './Eventos/ListaMisEventos';

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [misEventos, setMisEventos] = useState(null); // Estado para los eventos del usuario

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
		<div id="eventos" style={{ fontFamily: 'Caesar Dressing, "Times New Roman", serif' }}>
            {/* Fonts */}
            <style>
                {`@import url("https://fonts.googleapis.com/css2?family=Caesar+Dressing&display=swap");`}
            </style>

            {misEventos && <ListaMisEventos onCancel={() => setMisEventos(false)} />}
                
            <h2 className="flex justify-center text-4xl font-bold text-blue-950 mb-6"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                Eventos Disponibles
            </h2>

            <p className="flex justify-center italic text-lg text-blue-950 px-4">
                "El oráculo predice grandes pruebas y celebraciones. Aquí están los próximos eventos que ningún semidiós debería perderse."
            </p>


            <BotonMisEventos onClick={() => setMisEventos(true)} text="Mis eventos" />

            {/* Slider de eventos */}
            <EventsSlider eventos={eventos} />

            <hr className="border-2 border-gray-300 mt-6 mb-8" />

            {/* Grilla de eventos */}
			<EventsGrid eventos={eventos} />
		</div>
	);
};

export default Eventos;

