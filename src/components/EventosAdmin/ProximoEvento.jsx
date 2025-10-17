//import { useState} from 'react';
import Evento from '../Eventos/Evento.jsx';
import Countdown from './Countdown.jsx';
import EditEventButton from './EditEventButton.jsx';

import { useContext, useEffect, useState } from 'react';
import EventosContext from '../../context/EventosContext.js';

export default function ProximoEvento({ onEdit }) {

    const {eventos, fetchEventos} = useContext(EventosContext)
    const [eventosSorted, setEventosSorted] = useState([])


    useEffect(() => {
        fetchEventos();
        console.log("fetching")
    }, [fetchEventos]);


    useEffect(() => {
        if (eventos && eventos.length > 0) {
            const sorted = sortEventos(eventos);
            console.log(eventos)
            setEventosSorted(sorted);
            console.log("Eventos ordenados:", sorted);
        }
    }, [eventos]);

    if (!eventosSorted || eventosSorted.length === 0) {
        return (
        <div className="p-4 text-center">
            <p className="text-gray-500">No hay eventos próximos</p>
        </div>
        );
    }
    
    return (
        <div >
            <ul className ="grid grid-cols-1 grid-rows-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <li className = "lg:col-span-2 lg:row-span-3 bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventosSorted[0]} TitleTextSize="text-3xl" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventosSorted[0].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventosSorted[0])} />
                </li>
                
                <li className = "bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventosSorted[1]} TitleTextSize="text-2xl" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventosSorted[1].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventosSorted[1])} />
                </li>
                
                <li className = "bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventosSorted[2]} TitleTextSize="text-xl" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventosSorted[2].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventosSorted[2])} />
                </li>

                <li className = "bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventosSorted[3]} TitleTextSize="text-lg" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventosSorted[3].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventosSorted[3])} />
                </li>

            </ul>
        </div>
    );
}

function sortEventos(eventos) {
    //console.log(eventos);
    const sortedEventos = eventos
    .filter(e => new Date(e.fechahora) > new Date()) // 👈 solo futuros
    .sort((a, b) => new Date(a.fechahora) - new Date(b.fechahora)) // 👈 orden ascendente
    .slice(0, 4); // 👈 primeros 4

    console.log(sortedEventos)
    return sortedEventos;
        // resta a - b, si es negativo a ocurre primero, se orden antes
}