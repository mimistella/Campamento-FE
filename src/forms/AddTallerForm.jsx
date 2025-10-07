import React, { useState } from "react";
import { FileTextIcon, MapPinIcon, UserRoundSearchIcon } from "lucide-react";
import { useTalleres } from "@hooks/useTalleres";
import { useDashboard } from "@hooks/useDashboard.jsx";

const TallerForm = () => {
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    instructor: null,
    cupo: "",
    duracionHoras: "",
  });

  const { instructores } = useDashboard();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const { crearTaller, loading } = useTalleres();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "instructor"
          ? value === "" ? null : parseInt(value, 10)
          : name === "cupo" || name === "duracionHoras"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await crearTaller(form);

      // Mostrar mensaje de éxito
      setSuccess("¡Taller creado exitosamente!");

      setForm({
        titulo: "",
        descripcion: "",
        fechaHora: "",
        lugar: "",
        instructor: null,
        cupo: "",
        duracionHoras: "",
      });


    } catch (err) {
      const message = err.response?.data?.message || "Error creando taller";
      setError(message);
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
          name="duracionHoras"
          value={form.duracionHoras}
          onChange={handleChange}
          placeholder="Duración (horas)"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          min={1}
          required
        />
      </div>

      {/* Mensajes */}
      {error && (
        <div className="col-span-2 text-red-600 text-center font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="col-span-2 text-green-600 text-center font-medium">
          {success}
        </div>
      )}

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