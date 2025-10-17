import MisionesAdmin from "./Misiones/MisionesAdmin.jsx";
import MisionesCampista from "./Misiones/MisionesCampista.jsx";
import { MisionesProvider } from "../providers/MisionesProvider.jsx";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext.js";
import LoadingScreen from "./UICommons/loadingScreen.jsx";

const Misiones = () =>{
    const {user, loading} = useContext(AuthContext);

    if (loading) return (<LoadingScreen/>)
    return(
        <MisionesProvider>
            <div id="Misiones">
                {user.role == "admin" ? ( <MisionesAdmin/> ) : (<MisionesCampista/>)}
            </div>
        </MisionesProvider>
    );
}

export default Misiones;