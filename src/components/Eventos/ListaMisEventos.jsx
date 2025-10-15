import React, { useState, useEffect } from 'react';
import api from '../../hooks/useApi';
import { GetLoggedUser } from '../utilities/GetLoggedUser.jsx';



export const ListaMisEventos = ({ onCancel }) => {
    const [eventos, setEventos] = useState([]);
    
    const user = GetLoggedUser().data;
    console.log(user)

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await api.get(`/solicitud-evento/me`);
                setEventos(response.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEventos();
    }, [user?.id]);



    return (
        <div className="fixed flex flex-col w-4/5 h-4/6 p-12 bg-gray-300 rounded-lg shadow-xl">
            <h2 className="flex justify-center text-2xl font-bold mb-4">Mis Eventos</h2>
            <p>Aquí puedes ver y gestionar los eventos a los que estás inscripto.</p>

            {eventos.length > 0 ?(
                <ul>
                    {eventos.map(evento => (
                        <li key={evento.id} className="p-2 m-2 bg-gray-100 shadow-sm rounded-md">
                            <div>
                                <strong>{evento.titulo}</strong> - {new Date(evento.fecha).toLocaleDateString()}    
                            </div>

                        </li>
                ))}
                </ul>
            ) : (<strong className="justify-center align-middle">No esta inscripto a ningun evento</strong>) }


            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onCancel}>Cerrar</button>
        </div>
    );
}