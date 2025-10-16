import { useState, useEffect } from "react";
import { GetLoggedUser } from "./utilities/GetLoggedUser.js";
import EventosAdmin from "./EventosAdmin/EventosAdmin.jsx";
import Eventos2 from "./Eventos/Eventos2.jsx";
import { EventosProvider } from "../providers/EventosProvider.jsx";

const Eventos = () =>{
    const [rol, setRol] = useState(null)

    useEffect ( () =>{
        
        const fetchUser = async () =>{
            try{
                const user = await GetLoggedUser();
                const userRol = user.role

                setRol(userRol);
            }catch(err){
                console.log(err);
                throw err;
            }
        }
        fetchUser()
    },[]);



    return(
        <EventosProvider>
            <div id="Eventos">
                {rol == "admin" ? ( <EventosAdmin/> ) : (<Eventos2/>)}
            </div>
        </EventosProvider>
    );
}

export default Eventos;