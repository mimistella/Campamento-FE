import React, { useState } from "react";
import { UserIcon, LockIcon } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const {login} = useAuth();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const user= await login(email, contrasena)
      if(!user){
        throw new Error("No se recibió la información del usuario");
      }
      switch(user.role)
      {
        case "admin":
          navigate("/admin");
          break;
        /*case "instructor":
          navigate("/instructor");
          break;*/           //no implementado aún
        default:
          navigate("/campista");
      }

    } catch (err) {
        console.error(" Error login:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Credenciales inválidas");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-center border border-gray-300 rounded-md">
        <UserIcon className="h-5 w-5 text-gray-400 ml-2" />
        <input
          type="email"
          placeholder="Email"
          className="flex-1 p-2 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center border border-gray-300 rounded-md">
        <LockIcon className="h-5 w-5 text-gray-400 ml-2" />
        <input
          type="password"
          placeholder="Contraseña"
          className="flex-1 p-2 outline-none"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full block bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-md font-medium transition-colors text-white"
      >
        Iniciar sesión
      </button>
      <div className="flex flex-col items-center mt-6 space-y-2 text-sm">
        <span className="text-gray-700">¿No tienes cuenta?</span>
        <Link
          to="/signup"
          className="text-amber-700 hover:text-amber-600 underline transition-colors font-semibold"
        >
          Regístrate
        </Link>
        <Link
          to="/forgot-password"
          className="text-amber-700 hover:text-amber-600 underline transition-colors font-semibold"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
