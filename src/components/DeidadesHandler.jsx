import MostrarDeidades from "./Deidades/MostrarDeidades.jsx";
import { DeidadesProvider } from "../providers/DeidadProvider.jsx";

const DeidadesHandler = () =>{
    return (
        <DeidadesProvider>
            <MostrarDeidades/>
        </DeidadesProvider>
    )
}

export default DeidadesHandler;