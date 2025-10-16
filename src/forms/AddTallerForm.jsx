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

  const [errors, setErrors] = useState({});
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
    setErrors((prev) => ({ ...prev, [name]: null })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Creando taller...");
    setErrors({});

    try {
      const payload = {
        ...form,
        duracionMin: form.duracionMinutos,
      };

      await crearTaller(payload);
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
        toast.dismiss(toastId);

        const data = err.response?.data;
        let fieldErrors = {};

        
        const traducir = (msg) => {
          return msg
            .replace("String must contain at least", "Debe tener al menos")
            .replace("character(s)", "caracteres")
            .replace("Number must be greater than or equal to", "Debe ser mayor o igual a")
            .replace("Number must be less than or equal to", "Debe ser menor o igual a")
            .replace("Required", "Campo obligatorio")
            .replace("Invalid date", "Fecha inválida")
            .replace("Expected number, received string", "Se esperaba un número")
            .replace("Expected string, received number", "Se esperaba un texto");
        };

        
        if (data?.details && Array.isArray(data.details)) {
          data.details.forEach((d) => {
            const field = d.path?.[0];
            if (field) fieldErrors[field] = traducir(d.message);
          });
          setErrors(fieldErrors);
          toast.error("Revisá los campos con error.");
        }

       
        else if (data?.message) {
          toast.error(data.message);
        }

        
        else {
          toast.error("Ocurrió un error inesperado al crear el taller.");
        }
      }

}


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
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none ${
            errors.titulo ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.titulo && (
          <p className="text-sm text-red-600 mt-1">{errors.titulo}</p>
        )}
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
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none resize-none ${
            errors.descripcion ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.descripcion && (
          <p className="text-sm text-red-600 mt-1">{errors.descripcion}</p>
        )}
      </div>

      {/* Fecha y hora */}
      <div className="relative col-span-2 sm:col-span-1">
        <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="datetime-local"
          name="fechaHora"
          value={form.fechaHora}
          onChange={handleChange}
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none ${
            errors.fechaHora ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.fechaHora && (
          <p className="text-sm text-red-600 mt-1">{errors.fechaHora}</p>
        )}
      </div>

      {/* Lugar */}
      <div className="relative col-span-2 sm:col-span-1">
        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="lugar"
          value={form.lugar}
          onChange={handleChange}
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none ${
            errors.lugar ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        {errors.lugar && (
          <p className="text-sm text-red-600 mt-1">{errors.lugar}</p>
        )}
      </div>

      {/* Instructor */}
      <div className="relative col-span-2 sm:col-span-1">
        <UserRoundSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          name="instructor"
          value={form.instructor || ""}
          onChange={handleChange}
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none bg-white ${
            errors.instructor ? "border-red-500" : "border-gray-300"
          }`}
          required
        >
          <option value="">Seleccione un instructor</option>
          {instructores.map((i) => (
            <option key={i.id} value={i.id}>
              {i.nombre} {i.apellido}
            </option>
          ))}
        </select>
        {errors.instructor && (
          <p className="text-sm text-red-600 mt-1">{errors.instructor}</p>
        )}
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
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none ${
            errors.cupo ? "border-red-500" : "border-gray-300"
          }`}
          min={1}
          required
        />
        {errors.cupo && (
          <p className="text-sm text-red-600 mt-1">{errors.cupo}</p>
        )}
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
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none ${
            errors.duracionMinutos ? "border-red-500" : "border-gray-300"
          }`}
          min={1}
          required
        />
        {errors.duracionMinutos && (
          <p className="text-sm text-red-600 mt-1">
            {errors.duracionMinutos}
          </p>
        )}
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