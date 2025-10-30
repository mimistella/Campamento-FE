//import { useState, useEffect } from "react";
import EventosAdmin from "@components/Admin/EventosAdmin/EventosAdmin.jsx";
import Eventos2 from "@components/Camper/Eventos/Eventos2.jsx";
import { EventosProvider } from "@providers/EventosProvider.jsx";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext.js";
import LoadingScreen from "@uicommons/loadingScreen.jsx";

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