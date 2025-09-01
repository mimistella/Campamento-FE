import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ScrollToTop} from '../components/ScrollToTop';
import { LandingPage } from '../pages/LandingPage'
import PageNotFound from '../pages/PageNotFound'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import ForgotPassword from '../pages/ForgotPassword';
import CamperHomePage from '../pages/campista/Campista.jsx'
import Talleres from "../components/Talleres.jsx";
import Misiones from "../components/misiones.jsx";
import Eventos from "../components/Eventos.jsx";

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
          <Route path="/campista" element={<CamperHomePage />}>
          <Route path="talleres" element={<Talleres />} />
          <Route path="misiones" element={<Misiones />} />
          <Route path="eventos" element={<Eventos />} />
            {/* otras rutas */}
				  </Route>
        </Routes>
      </BrowserRouter>
    );
  }