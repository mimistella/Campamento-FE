import { useState, useEffect } from "react";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";
import ButtonBase from "@components/commonComp/ButtonBase";

export default function InscriptionForm({ periodoId, onSuccess }) {
const { user } = useAuth();

  const [metodoPago, setMetodoPago] = useState("");
  const [referenciaPago, setReferenciaPago] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debug para verificar el periodoId
  useEffect(() => {
    console.log("InscriptionForm recibió periodoId:", periodoId);
  }, [periodoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones más detalladas
    if (!metodoPago || !referenciaPago) {
      setError("Debe completar todos los campos.");
      return;
    }

    if (!user?.id) {
      setError("Usuario no autenticado.");
      return;
    }

    if (!periodoId) {
      setError("ID del período no disponible. Por favor, recargue la página.");
      console.error("periodoId es null/undefined:", periodoId);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        campista: user.id,
        periodo: periodoId, // Asegurar que no sea null
        metodoPago,
        referenciaPago,
        estado: "PENDIENTE",
      };

      console.log("Enviando payload:", payload); // Debug

      const response = await api.post("/inscripcion-periodo", payload, {
        withCredentials: true,
      });

      console.log("Inscripción exitosa:", response.data);
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error("Error al inscribir:", err.response?.data || err.message);
      setError("Ocurrió un error al inscribirse. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Método de pago:</label>
        <select
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">--Seleccione--</option>
          <option value="TRANSFERENCIA">Transferencia</option>
          <option value="EFECTIVO">Efectivo</option>
          <option value="TARJETA">Tarjeta</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Referencia de pago:</label>
        <input
          type="text"
          value={referenciaPago}
          onChange={(e) => setReferenciaPago(e.target.value)}
          className="border rounded p-2"
          placeholder="Número de transferencia o detalle del pago"
        />
      </div>

      <ButtonBase type="submit" variant="contained" color="amber" disabled={loading}>
        {loading ? "Inscribiendo..." : "Inscribirse"}
      </ButtonBase>
    </form>
  );
}