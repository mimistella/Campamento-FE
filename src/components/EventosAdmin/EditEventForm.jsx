import { useState } from "react";
import { useContext } from "react";
import EventosContext from "../../context/EventosContext.js";

export function EditEventForm({ event, onSave, onCancel }) {
    const [titulo, setTitulo] = useState(event.titulo);
    const [fechaHora, setFechaHora] = useState(event.fechahora);
    const [descripcion, setDescripcion] = useState(event.descripcion);
    const [lugar, setLugar] = useState(event.lugar);
    const {updateEvento} = useContext(EventosContext);


    const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
        ...event,
        titulo,
        fechahora: fechaHora,
        descripcion,
        lugar
    };

    if (event != updatedEvent) {
        try {
            updateEvento(event.id, { ...updatedEvent });
            onSave(updatedEvent);
        } catch (err) {
            console.error("❌ Error editando evento:", err.response?.data || err.message);
        }
    }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="flex flex-col mb-4">
                <label>Título: </label>
                <input 
                    type="text" 
                    defaultValue={event.titulo}
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
            </div>

            <div className="flex flex-col mb-4">
                <label>Fecha y hora:</label>
                <input 
                    type="datetime-local" 
                    defaultValue={event.fechahora}
                    value={fechaHora}
                    onChange={(e) => setFechaHora(e.target.value)}
                />
            </div>

            <div className="flex flex-col mb-4">
                <label>Descripción:</label>
                <textarea 
                    defaultValue={event.descripcion}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
            </div>

            <div className="flex flex-col mb-4">
                <label>Lugar:</label>
                <input 
                    type="text" 
                    defaultValue={event.lugar}
                    value={lugar}
                    onChange={(e) => setLugar(e.target.value)}
                />
            </div>

            <button type="submit" className="p-4 bg-blue-500 text-white rounded">Guardar</button>
            <button type="button" className="p-4 bg-gray-300 text-gray-800 rounded" onClick={onCancel}>Cancelar</button>
        </form>
    );
}

