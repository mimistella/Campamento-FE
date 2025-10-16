import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ScrollToTop} from '../components/ScrollToTop';
import { LandingPage } from '../pages/LandingPage'
import PageNotFound from '../pages/PageNotFound'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import ForgotPassword from '../pages/ForgotPassword';
import CamperHomePage from '../pages/campista/Campista.jsx'
import AdminHomePage from "@pages/Admin/AdminHomePage.jsx";
import AdminDashboard from "@components/Admin/AdminDashboard.jsx";  
import MostrarCabanas from "@components/Admin/cabanas/mostrarCabanas.jsx";
import EditarCabania from "@components/Admin/cabanas/EditarCabanias.jsx";
import CabinPage from "@components/Camper/MyCabin.jsx";
//import Talleres from "../components/Talleres.jsx";
import Misiones from "../components/Misiones.jsx";

import Eventos from "../components/EventosHandler.jsx";
// import Eventos2 from "../components/Eventos2.jsx";
// import EventosAdmin from "../components/EventosAdmin.jsx";

  export function AppRouter() {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<AdminHomePage />}>
          <Route path="/admin/eventos" element={<Eventos />}/>
          <Route path="/admin/misiones" element={<Misiones/>}/>

          <Route path="dashboard" element={<AdminDashboard />} /> {/* /admin/dashboard */}
          <Route path="cabanas" element={<MostrarCabanas />} />
          <Route path="cabanas/editar/:id" element={<EditarCabania />} />
              
          <Route index element={<AdminDashboard />} /> {/* /admin */}
    
         </Route>
          <Route path="/campista" element={<CamperHomePage />}>
          
          <Route path="misiones" element={<Misiones />} />
          <Route path="eventos" element={<Eventos />} />
          
          
          <Route path= "cabanas" element={<CabinPage />} />
            {/* otras rutas */}
				  </Route>
        </Routes>
      </BrowserRouter>
    );
  }