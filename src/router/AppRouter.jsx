import React from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import { LandingPage } from '../pages/LandingPage'
  import PageNotFound from '../pages/PageNotFound'
  import LoginPage from '../pages/LoginPage'
  import SignUpPage from '../pages/SignUpPage'

  export function AppRouter() {
    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
      </BrowserRouter>
    );
  }