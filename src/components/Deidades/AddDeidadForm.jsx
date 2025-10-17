// forms/AddDeidadForm.jsx
import { useState, useContext, useEffect } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import DeidadesContext from "@context/DeidadesContext.js";

export default function DeidadForm({ deidad, isEdit = false, onSuccess }) {
  const { createDeidad, updateDeidad } = useContext(DeidadesContext);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    simbolos: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (deidad && isEdit) {
      setFormData({
        nombre: deidad.nombre || "",
        descripcion: deidad.descripcion || "",
        simbolos: deidad.simbolos || "",
      });
    }
  }, [deidad, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isEdit) {
        await updateDeidad(deidad.id, formData);
      } else {
        await createDeidad(formData);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || "Error al guardar la deidad");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Zeus"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción de la deidad..."
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Símbolo
        </label>
        <input
          type="text"
          name="simbolos"
          value={formData.simbolos}
          onChange={handleChange}
          placeholder="Ej: Rayo, águila, roble"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <ButtonBase
        type="submit"
        color="amber"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? isEdit ? "Actualizando..." : "Creando..."
          : isEdit ? "Actualizar deidad" : "Crear deidad"}
      </ButtonBase>
    </form>
  );
}