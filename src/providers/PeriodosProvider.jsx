import PeriodosContext from "@context/PeriodosContext.js";
import { usePeriodo } from "@hooks/usePeriodo.js";
import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo.js";

export function PeriodosProvider({ children }){
    const value = { 
        ...usePeriodo(),
        ...useInscripcionPeriodo()
    };


    return(
        <PeriodosContext.Provider value={value}>
            {children}
        </PeriodosContext.Provider>
    )
}