import api from '../../hooks/useApi';

export const GetLoggedUser = async (user) => {
    try{
        user = await api.get('/auth/me');
    }catch (error){
        console.error("Error al obtener el usuario:", error);
        return null;
    }

    return user.data;
}