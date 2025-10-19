import { useState } from "react";
import { useContext } from "react";
import MisionesContext from "@context/MisionesContext.js";

const FormEditarMision = ({mision, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titulo: mision?.titulo || "",
    descripcion: mision?.descripcion || "",
    pista: mision?.pista || "",
    recompensa: mision?.recompensa || "",
  });

  const { fetchMisiones, updateMision } = useContext(MisionesContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateMision(mision.id, formData)
      if (onSave) onSave();
      fetchMisiones();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Error al actualizar misión");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-bold mb-4">Editar Misión</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Título"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            rows="4"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Pista</label>
          <input
            type="text"
            name="pista"
            value={formData.pista}
            onChange={handleChange}
            placeholder="Pista"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Recompensa</label>
          <input
            type="text"
            name="recompensa"
            value={formData.recompensa}
            onChange={handleChange}
            placeholder="Recompensa"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
        
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg font-semibold"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default FormEditarMision;