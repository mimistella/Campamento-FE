import { useState } from "react";

export function ForgotPasswordForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) {
      setError("El email es obligatorio");
      return;
    }
    setMessage("Si el email está registrado, recibirás instrucciones para recuperar tu contraseña.");
    if (onSubmit) onSubmit({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border border-amber-100">
      <h2 className="text-3xl font-bold mb-6 text-center font-serif text-amber-800">Recuperar contraseña</h2>
      {error && <div className="mb-4 text-red-500 font-medium">{error}</div>}
      {message && <div className="mb-4 text-green-600 font-medium">{message}</div>}
      <label className="block mb-2 text-amber-800 font-serif font-semibold">Email</label>
      <input
        type="email"
        placeholder="ejemplo@correo.com"
        className="w-full mb-4 p-2 border border-amber-300 rounded focus:outline-none focus:border-amber-500 transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-md font-medium transition-colors mt-2 shadow">Enviar instrucciones</button>
    </form>
  );
}
