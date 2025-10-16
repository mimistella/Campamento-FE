import { useState} from 'react';
import Evento from '../Eventos/Evento.jsx';
import EditEventButton from './EditEventButton.jsx';
import { useContext } from 'react';
import EventosContext from '../../context/EventosContext.js';

export default function ListaEventos({ onEdit }) {

    const {eventos} = useContext(EventosContext);
    const [mostrarTodos, setMostrarTodos] = useState(false);

    return (
        <div className="flex flex-col items-center p-4">
            <button className="mb-4 text-blue-950 text-xl " onClick={() => setMostrarTodos(!mostrarTodos)}>
                {mostrarTodos ? 'Ocultar eventos' : 'Mostrar todos los eventos'}
            </button>

            {mostrarTodos && mostrarTodosEventos(eventos, onEdit)}
        </div>
    );
}

function mostrarTodosEventos(eventos, onEdit) {
    return (
        <ul className = "w-full">
                {sortEventos(eventos).map(evento => (
                    <li key={evento.id} className="relative">
                        <div className="shadow border border-gray-200 bg-white p-4 m-2">
                            <Evento evento={evento} TitleTextSize="text-2xl" IsGrid={true} isEditMode={true} titleJustify='justify-start' textColor='text-black'/>
                        </div>

                        <EditEventButton onClick={() => onEdit(evento)} />
                    </li>
                ))}
            </ul>
    );
}   

function sortEventos(eventos) {
    return eventos.sort((a, b) => new Date(a.fechahora) - new Date(b.fechahora));
        // resta a - b, si es negativo a ocurre primero, se orden antes
}