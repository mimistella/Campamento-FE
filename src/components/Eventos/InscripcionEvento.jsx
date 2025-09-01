import api from '../../hooks/useApi';

export default async function inscribirAEvento({evento}, user){

    try{
        user = user == undefined || user == null ? await api.get('/me') : user;
    }catch (error){
        console.error("Error al obtener el usuario:", error);
        alert("Error al obtener el usuario. Por favor, inicie sesión nuevamente.");
    }


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