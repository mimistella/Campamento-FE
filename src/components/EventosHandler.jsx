//import { useState, useEffect } from "react";
import EventosAdmin from "./EventosAdmin/EventosAdmin.jsx";
import Eventos2 from "./Eventos/Eventos2.jsx";
import { EventosProvider } from "../providers/EventosProvider.jsx";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext.js";
import LoadingScreen from "./UICommons/loadingScreen.jsx";

const Eventos = () =>{
    const {user, loading} = useContext(AuthContext);


    if(loading) return(<LoadingScreen/>);
    return(
        <EventosProvider>
            <div id="Eventos">
                {user.role == "admin" ? ( <EventosAdmin/> ) : (<Eventos2/>)}
            </div>
        </EventosProvider> 
    );
}

export default Eventos;