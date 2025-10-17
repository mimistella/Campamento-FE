import { useState } from 'react';


import EventsGrid from './EventsGrid';
import EventsSlider from './EventsSlider';
import { BotonMisEventos } from './BotonMisEventos';
import { ListaMisEventos } from './ListaMisEventos';

const Eventos2 = () =>{
    const [viewMisEventos, setViewMisEventos] = useState(false)
    console.log("hola desde eventos2")

    return(
        <div id="eventos" className="bg-amber-50" style={{ fontFamily: 'Caesar Dressing, "Times New Roman", serif' }}>
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
            <p className="flex justify-center italic text-lg text-amber-100 px-4 p-4 bg-amber-700">
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