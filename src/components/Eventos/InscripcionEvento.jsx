import api from '../../hooks/useApi';
import { GetLoggedUser } from '../utilities/GetLoggedUser.jsx';

export default async function inscribirAEvento({evento}){

    const user = await GetLoggedUser();
    
    const data = {
        solicitudEvento: evento,
        solicitudUsuario: user,
        estado: "pendiente"
    };

    try{
        await api.post('/solicitud-evento', data);
        alert(`Inscripto en ${evento.titulo}`);
    }catch (error){
        alert(`Error al inscribir al evento: ${error}`);
    }

    
}