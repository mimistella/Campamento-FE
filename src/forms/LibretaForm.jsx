import { useState } from "react";
import api from "@hooks/useApi";
import { useToaster } from "@hooks/useToaster";

export default function LibretaForm({ inscripcion, onClose }) {
  const { success, error } = useToaster(); 
  const [nota, setNota] = useState(inscripcion.nota || "");
  const [comentario, setComentario] = useState(inscripcion.comentario || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notaNum = Number(nota);
    if (isNaN(notaNum) || notaNum < 1 || notaNum > 10) {
      return error("La nota debe ser un número entre 1 y 10."); 
    }

    if (!comentario.trim()) {
      return error("El comentario no puede estar vacío."); 
    }

    setLoading(true);
    try {
      await api.patch(`/inscripcion-taller/${inscripcion.id}`, {
        nota: notaNum,
        comentario: comentario.trim(),
      });
      success("Feedback guardado correctamente."); 
      onClose?.();
    } catch (err) {
      console.error(err);
      error("Ocurrió un error al guardar la nota."); 
    } finally {
      setLoading(false);
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
        disabled={loading}
        className="bg-amber-500 text-white py-2 px-4 rounded"
      >
        {inscripcion.nota !== null || inscripcion.comentario !== null
          ? "Modificar nota"
          : "Asignar nota"}
      </button>
    </form>
  );
}