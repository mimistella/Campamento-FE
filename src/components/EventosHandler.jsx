import { useState, useEffect } from "react";
import { GetLoggedUser } from "./utilities/GetLoggedUser.js";
import EventosAdmin from "./EventosAdmin/EventosAdmin.jsx";
import Eventos2 from "./Eventos/Eventos2.jsx";
import { EventosProvider } from "../providers/EventosProvider.jsx";

const Eventos = () =>{
    const [rol, setRol] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect ( () =>{
        
        const fetchUser = async () =>{
            try{
                const user = await GetLoggedUser();
                const userRol = user.role
                setRol(userRol);
            }catch(err){
                console.log(err);
                throw err;
            }finally{
                setLoading(false);
            }
        }
        fetchUser()
    },[]);

    if(loading) return(<p>Cargando . . .</p>);
    return(
        <EventosProvider>
            <div id="Eventos">
                {console.log("welcome " + rol)};
                {rol == "admin" ? ( <EventosAdmin/> ) : (<Eventos2/>)}
            </div>
        </EventosProvider> 
    );
}

export default Eventos;