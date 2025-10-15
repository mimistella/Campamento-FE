import { useState } from 'react';

import EventsGrid from './Eventos/EventsGrid';
import EventsSlider from './Eventos/EventsSlider';
import { BotonMisEventos } from './Eventos/BotonMisEventos';
import { ListaMisEventos } from './Eventos/ListaMisEventos';

const Eventos2 = () =>{
    const [viewMisEventos, setViewMisEventos] = useState(false)
    console.log("hola desde eventos2")

    return(
        <div id="eventos" style={{ fontFamily: 'Caesar Dressing, "Times New Roman", serif' }}>
            {/* Fonts */}
            <style>
                {`@import url("https://fonts.googleapis.com/css2?family=Caesar+Dressing&display=swap");`}
            </style>

            { /* Mis eventos */}
            <BotonMisEventos onClick={() => setViewMisEventos(true)} text="Mis eventos" />

            {viewMisEventos && (
                <ListaMisEventos onCancel = { () => setViewMisEventos(false)}/>

            )}                


            { /* Todos los eventos */ }
            <h2 className="flex justify-center text-4xl font-bold text-blue-950 mb-6"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                Eventos Disponibles
            </h2>
            <p className="flex justify-center italic text-lg text-blue-950 px-4">
                "El oráculo predice grandes pruebas y celebraciones. Aquí están los próximos eventos que ningún semidiós debería perderse."
            </p>

            {/* Slider de eventos */}
            <EventsSlider />

            <hr className="border-2 border-gray-300 mt-6 mb-8" />

            {/* Grilla de eventos */}
            <EventsGrid />
        </div>
    )
}

export default Eventos2;