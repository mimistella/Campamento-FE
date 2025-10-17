import {  useEffect } from 'react';
import { useEventos } from '../../hooks/useEventos.js';



export const ListaMisEventos = ({ onCancel }) => {    
    const {solicitudes, fetchSolicitudes} = useEventos();

    useEffect(()=>{
        fetchSolicitudes();
    },[fetchSolicitudes])

    return (
        <div className="fixed flex flex-col w-4/5 h-4/6 p-12 bg-gray-300 rounded-lg shadow-xl">
            <h2 className="flex justify-center text-2xl font-bold mb-4">Mis Eventos</h2>
            <p>Aquí puedes ver y gestionar los eventos a los que estás inscripto.</p>

            {solicitudes.length > 0 ?(
                <ul>
                    {solicitudes.map(solicitud => (
                        
                        <li key={solicitud.id} className="p-2 m-2 bg-gray-100 shadow-sm rounded-md">
                            <div>
                                <strong>{solicitud.evento.titulo}</strong> - {new Date(solicitud.evento.fecha).toLocaleDateString()}    
                                <p>{solicitud.estado}</p>
                            </div>

                        </li>
                ))}
                </ul>
            ) : (<strong className="justify-center align-middle">No esta inscripto a ningun evento</strong>) }


            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onCancel}>Cerrar</button>
        </div>
    )
}