//import { useState} from 'react';
import Evento from '../Eventos/Evento.jsx';
import Countdown from './Countdown.jsx';
import EditEventButton from './EditEventButton.jsx';

export default function ProximoEvento({ eventos, onEdit }) {
    //const [mostrarTodos, setMostrarTodos] = useState(false);
    eventos = sortEventos(eventos);
    
    return (
        <div >
            <ul className ="grid grid-cols-1 grid-rows-3 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                <li className = "lg:col-span-2 lg:row-span-3 bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventos[0]} TitleTextSize="text-3xl" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventos[0].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventos[0])} />
                </li>
                
                <li className = "bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventos[1]} TitleTextSize="text-2xl" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventos[1].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventos[1])} />
                </li>
                
                <li className = "bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventos[2]} TitleTextSize="text-xl" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventos[2].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventos[2])} />
                </li>

                <li className = "bg-[url('/src/assets/images/chb_lg.svg')] bg-no-repeat bg-center bg-white/90 bg-blend-overlay grayscale p-4 shadow-xl">
                    <Evento evento={eventos[3]} TitleTextSize="text-lg" IsGrid={true} isEditMode={true} titleJustify='justify-center' textColor='text-black'/>
                    <div className = "flex justify-center">
                        <Countdown targetDate={eventos[3].fechahora} />
                    </div>
                    <EditEventButton onClick={() => onEdit(eventos[3])} />
                </li>

            </ul>
        </div>
    );
}

function sortEventos(eventos) {
    const sortedEventos = eventos
    .filter(e => new Date(e.fechahora) > new Date()) // 👈 solo futuros
    .sort((a, b) => new Date(a.fechahora) - new Date(b.fechahora)) // 👈 orden ascendente
    .slice(0, 4); // 👈 primeros 4

    return sortedEventos;
        // resta a - b, si es negativo a ocurre primero, se orden antes
}