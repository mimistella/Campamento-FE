import EventosContext from "../context/EventosContext.js";
import { useEventos } from "../hooks/useEventos.js";

export function EventosProvider({ children }){
    const value = useEventos();
    return(
        
        <EventosContext.Provider value={value}>
            {children}
        </EventosContext.Provider>
    )
}