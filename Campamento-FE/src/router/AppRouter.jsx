import React from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import { LandingPage } from '../pages/LandingPage'
  import PageNotFound from '../pages/PageNotFound'

  export function AppRouter() {
    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      </BrowserRouter>
    );
  }