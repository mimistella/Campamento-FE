import { useState, useEffect } from "react";
import { GetLoggedUser } from "./utilities/GetLoggedUser.jsx";
import MisionesAdmin from "./Misiones/MisionesAdmin.jsx";
import MisionesCampista from "./Misiones/MisionesCampista.jsx";
import { MisionesProvider } from "../providers/MisionesProvider.jsx";

const Misiones = () =>{
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
        <MisionesProvider>
            <div id="Misiones">
                {rol == "admin" ? ( <MisionesAdmin/> ) : (<MisionesCampista/>)}
            </div>
        </MisionesProvider>
    );
}

export default Misiones;