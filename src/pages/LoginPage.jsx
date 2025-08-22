import React from "react";
import LoginForm from '../forms/LoginForm.jsx'
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { ScrollToTopButton } from "../components/ScrollToTopButton.jsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 flex flex-col">
        <Header />
      <main className="flex flex-1 items-center justify-center p-12">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
          <LoginForm />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default LoginPage;
