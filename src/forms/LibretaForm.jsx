import { useState } from "react";
import api from "@hooks/useApi";
import { useToaster } from "@hooks/useToaster";

export default function LibretaForm({ inscripcion, onClose }) {
  const { loading, dismiss, success, error } = useToaster();
  const [nota, setNota] = useState(inscripcion?.nota || "");
  const [comentario, setComentario] = useState(inscripcion?.comentario || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notaNum = Number(nota);
    if (isNaN(notaNum) || notaNum < 1 || notaNum > 10) {
      return error("La nota debe ser un número entre 1 y 10.");
    }

    if (!comentario.trim()) {
      return error("El comentario no puede estar vacío.");
    }

    const toastId = loading("Guardando feedback...");
    setIsLoading(true);

    try {
      const _res = await api.patch(`/inscripcion-taller/${inscripcion.id}`, {
        nota: notaNum,
        comentario: comentario.trim(),
      });
      dismiss(toastId);
      success("Feedback guardado correctamente.");
      onClose?.();
    } catch (err) {
      dismiss(toastId);
      error(
        err.response?.data?.message ||
          "Ocurrió un error al guardar la nota."
      );
    } finally {
      console.log("Finalizando...");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        Nota (1-10):
        <input
          type="number"
          min="1"
          max="10"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>
      <label>
        Comentario:
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </label>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-amber-500 text-white py-2 px-4 rounded disabled:opacity-60"
      >
        {isLoading
          ? "Guardando..."
          : inscripcion?.nota != null || inscripcion?.comentario != null
          ? "Modificar nota"
          : "Asignar nota"}
      </button>
    </form>
  );
}
