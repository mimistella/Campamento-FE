import api from '../../hooks/useApi';

export const GetLoggedUser = async (user) => {
    try{
        user = user == undefined || user == null ? await api.get('/auth/me') : user;
    }catch (error){
        console.error("Error al obtener el usuario:", error);
        return null;
    }

    return user;
}