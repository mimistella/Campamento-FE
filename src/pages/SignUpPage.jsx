import React from "react";
import SignUpForm from "../forms/SignUpForm";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const SignUpPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 flex flex-col">
    <Header />
    <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center mt-12">
          ¡Bienvenido al Campamento Mestizo!
        </h1>
        <p className="text-center text-gray-600">Por favor, completa el siguiente formulario para registrarte.</p>
    </div>

    <main className="flex flex-1 items-center justify-center p-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Registro</h1>
        <SignUpForm />
      </div>
    </main>
    <Footer />
  </div>
);

export default SignUpPage;