import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ScrollToTop} from '@components/ScrollToTop';
import { LandingPage } from '@pages/LandingPage'
import PageNotFound from '@pages/PageNotFound'
import LoginPage from '@pages/LoginPage'
import SignUpPage from '@pages/SignUpPage'
import ForgotPassword from '@pages/ForgotPassword';
import CamperHomePage from '@pages/campista/Campista.jsx'
import Talleres from "@components/Admin/talleres/mostrarTalleres.jsx";
import AdminHomePage from "@pages/Admin/AdminHomePage.jsx";
import AdminDashboard from "@components/Admin/AdminDashboard.jsx";  
import MostrarCabanas from "@components/Admin/cabanas/mostrarCabanas.jsx";
import EditarCabania from "@components/Admin/cabanas/EditarCabanias.jsx";
import CabinPage from "@components/Camper/MyCabin.jsx";
import VerifyEmailPage from "@pages/VerifyEmailPage.jsx";
import { PrivateRoute } from '@components/PrivateRoute';
import EditarTaller from "../components/Admin/talleres/editartalleres.jsx";
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
  <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

  {/* Rutas protegidas Admin */}
  <Route element={<PrivateRoute adminOnly={true} />}>
    <Route path="/admin" element={<AdminHomePage />}>
      <Route index element={<AdminDashboard />} />       {/* /admin */}
      <Route path="dashboard" element={<AdminDashboard />} /> 
      <Route path="cabanas" element={<MostrarCabanas />} />
      <Route path="talleres" element={<Talleres />} />
      <Route path="cabanas/editar/:id" element={<EditarCabania />} />
      <Route path="talleres/editar/:id" element={<EditarTaller />} />
    </Route>
  </Route>

  {/* Rutas protegidas Campista */}
  <Route element={<PrivateRoute />}>
    <Route path="/campista" element={<CamperHomePage />}>
      <Route path="cabanas" element={<CabinPage />} />
    </Route>
  </Route>
</Routes>
      </BrowserRouter>
    );
  }