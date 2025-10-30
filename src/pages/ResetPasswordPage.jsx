import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "@hooks/useApi";
import { useToaster } from "@hooks/useToaster";
import {Header} from "@components/Header";
import {Footer} from "@components/Footer";

export function ResetPasswordPage() {
  const { success, error } = useToaster();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirm) return error("Completa todos los campos");
    if (password !== confirm) return error("Las contraseñas no coinciden");
    if (password.length < 6) return error("La contraseña debe tener al menos 6 caracteres");
    setLoading(true);
    try {
      const res = await api.post("/auth/reset-password", {
        token,
        newpassword: password,
      });

      if (res.status === 200) {
        success("Contraseña restablecida correctamente. Ahora podés iniciar sesión.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      const data = err.response?.data;
      if (data?.message) {
        error(data.message);
      } else if (Array.isArray(data?.errors)) {
        data.errors.forEach((e) => error(e.message));
      } else {
        error("Error al restablecer la contraseña");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border border-amber-100"
        >
          <h2 className="text-3xl font-bold mb-6 text-center font-serif text-amber-800">
            Restablecer contraseña
          </h2>

          <label className="block mb-2 text-amber-800 font-serif font-semibold">Nueva contraseña</label>
          <input
            type="password"
            className="w-full mb-4 p-2 border border-amber-300 rounded focus:outline-none focus:border-amber-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="block mb-2 text-amber-800 font-serif font-semibold">Confirmar contraseña</label>
          <input
            type="password"
            className="w-full mb-4 p-2 border border-amber-300 rounded focus:outline-none focus:border-amber-500 transition"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md font-medium transition-colors mt-2 shadow ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Guardando..." : "Restablecer contraseña"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}