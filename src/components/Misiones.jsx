import { useState, useEffect } from "react";
import { GetLoggedUser } from "./utilities/GetLoggedUser.jsx";
import MisionesAdmin from "./Misiones/MisionesAdmin.jsx";
import MisionesCampista from "./Misiones/MisionesCampista.jsx";

const Misiones = () =>{
    const [rol, setRol] = useState(null)

    useEffect ( () =>{
        
        const fetchUser = async () =>{
            const userRol = await GetLoggedUser().role;
            console.log(userRol)
            setRol(userRol);
        }
        fetchUser()
    },[]);



    return(
        <div id="Misiones">
            {rol == "admin" ? ( <MisionesAdmin/> ) : (<MisionesCampista/>)}
        </div>
    );
}

export default Misiones;