import { useState, useEffect } from "react";
import api from "@hooks/useApi";
import { useAuth } from "@hooks/useAuth";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useToaster } from "@hooks/useToaster";

export default function InscriptionForm({ periodoId, onSuccess }) {
  const { user } = useAuth();
  const toast = useToaster();

  const [metodoPago, setMetodoPago] = useState("");
  const [referenciaPago, setReferenciaPago] = useState("");
  const [loading, setLoading] = useState(false);

  // Debug para verificar el periodoId
  useEffect(() => {
    console.log("InscriptionForm recibió periodoId:", periodoId);
  }, [periodoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!metodoPago || !referenciaPago) {
      toast.error("Debe completar todos los campos.");
      return;
    }

    if (!user?.id) {
      toast.error("Usuario no autenticado.");
      return;
    }

    if (!periodoId) {
      toast.error("ID del período no disponible. Por favor, recargue la página.");
      console.error("periodoId es null/undefined:", periodoId);
      return;
    }

    setLoading(true);

    const payload = {
      campista: user.id,
      periodo: periodoId,
      metodoPago,
      referenciaPago,
      estado: "PENDIENTE",
    };

    const loadingToastId = toast.loading("Procesando inscripción...");

    try {
      console.log("Enviando payload:", payload);

      await api.post("/inscripcion-periodo", payload, { withCredentials: true });

      toast.dismiss(loadingToastId);
      toast.success(" Inscripción enviada correctamente.");

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error al inscribir:", err.response?.data || err.message);
      toast.dismiss(loadingToastId);
      toast.error(" Ocurrió un error al inscribirse. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <ButtonBase
        type="submit"
        variant="contained"
        color="amber"
        disabled={loading}
      >
        {loading ? "Inscribiendo..." : "Inscribirse"}
      </ButtonBase>
    </form>
  );
}