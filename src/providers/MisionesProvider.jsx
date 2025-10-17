import MisionesContext from "../context/MisionesContext.js";
import { useMisiones } from "../hooks/useMisiones.js";

export function MisionesProvider({ children }){
    const value = useMisiones();
    return(
        <MisionesContext.Provider value={value}>
            {children}
        </MisionesContext.Provider>
    )
}