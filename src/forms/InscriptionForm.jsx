import { useState } from "react";
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

  const handleSubmit = async (e) => {
  e.preventDefault();

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
    estado: "PAGADO" //lo ponemos por default, wuizá en una expansión se podría implementar mock de mp
  };
  const loadingToastId = toast.loading("Procesando inscripción...");

  try {
    await api.post("/inscripcion-periodo", payload);

    toast.dismiss(loadingToastId);
    toast.success("Inscripción enviada correctamente.");

    if (onSuccess) onSuccess();
  } catch (err) {
    toast.dismiss(loadingToastId);

    if (err.response?.data?.details) {
      const detalles = err.response.data.details
        .map((d) => {
          switch (d.path[0]) {
            case "referenciaPago":
              return "Referencia de pago inválida.";
            case "metodoPago":
              return "Método de pago inválido.";
            default:
              return d.message;
          }
        })
        .join(" ");
      toast.error(detalles);
      console.error("Detalles de validación:", err.response.data.details);
    } else if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Ocurrió un error al inscribirse. Intente nuevamente.");
    }

    console.error("Error al inscribir:", err.response?.data || err.message);
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