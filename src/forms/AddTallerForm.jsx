import React, { useState } from "react";
import { FileTextIcon, MapPinIcon, UserRoundSearchIcon } from "lucide-react";
import { useTalleres } from "@hooks/useTalleres";
import { useDashboard } from "@hooks/useDashboard.js";
import { useToaster } from "@hooks/useToaster";

const TallerForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    instructor: null,
    cupo: "",
    duracionMinutos: "",
  });

  const { instructores } = useDashboard();
  const { crearTaller, loading } = useTalleres();
  const toast = useToaster();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "instructor"
          ? value === "" ? null : parseInt(value, 10)
          : name === "cupo" || name === "duracionMinutos"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creando taller...");

    try {
      await crearTaller(form);
      toast.dismiss(toastId);
      toast.success("¡Taller creado exitosamente!");

      setForm({
        titulo: "",
        descripcion: "",
        fechaHora: "",
        lugar: "",
        instructor: null,
        cupo: "",
        duracionMinutos: "",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error creando taller:", err);
      const message = err.response?.data?.message || "Error creando taller";
      toast.dismiss(toastId);
      toast.error(message);
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-4 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Título */}
      <div className="relative col-span-2">
        <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="titulo"
          placeholder="Título del taller"
          value={form.titulo}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      {/* Descripción */}
      <div className="relative col-span-2">
        <FileTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          rows={3}
          value={form.descripcion}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none resize-none"
          required
        />
      </div>

      {/* Fecha y hora */}
      <div className="relative col-span-2 sm:col-span-1">
        <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="datetime-local"
          name="fechaHora"
          value={form.fechaHora}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      {/* Lugar */}
      <div className="relative col-span-2 sm:col-span-1">
        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="lugar"
          value={form.lugar}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          required
        />
      </div>

      {/* Instructor */}
      <div className="relative col-span-2 sm:col-span-1">
        <UserRoundSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          name="instructor"
          value={form.instructor || ""}
          onChange={handleChange}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none bg-white"
          required
        >
          <option value="">Seleccione un instructor</option>
          {instructores.map((i) => (
            <option key={i.id} value={i.id}>
              {i.nombre} {i.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Cupo */}
      <div className="relative col-span-2 sm:col-span-1">
        <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="number"
          name="cupo"
          value={form.cupo}
          onChange={handleChange}
          placeholder="Cupo"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          min={1}
          required
        />
      </div>

      {/* Duración */}
      <div className="relative col-span-2 sm:col-span-1">
        <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="number"
          name="duracionMinutos"
          value={form.duracionMinutos}
          onChange={handleChange}
          placeholder="Duración (minutos)"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          min={1}
          required
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="col-span-2 w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-60 normal-case"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Crear taller"}
      </button>
    </form>
  );
};

export default TallerForm;