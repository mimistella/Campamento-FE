import api from '../../hooks/useApi';
import { GetLoggedUser } from '../utilities/GetLoggedUser.jsx';

export default async function inscribirAEvento({evento}){

    const user = await GetLoggedUser();
    
    console.log(user.data)
    const data = {
        campista: user.data,
        evento: evento,
        estado: "pendiente"
    };

    try{
        await api.post('/solicitud-evento', data);
        alert(`Inscripto en ${evento.titulo}`);
    }catch (error){
        alert(`Error al inscribir al evento: ${error}`);
    }

    
}