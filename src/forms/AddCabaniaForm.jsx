import React, { useEffect, useState } from "react";
import { HomeIcon, UsersIcon, FileTextIcon, MapPinIcon, UserRoundSearchIcon } from "lucide-react";
import { API_ROUTES } from "../constants/apiroutes";
import { useCabanias } from "../hooks/useCabanias";
import axios from "axios";

const CabaniaForm = () => {
  const [form, setForm] = useState({
    nombre: "",
    capacidad: null,
    descripcion: "",
    ubicacion: "",
    deidad: null,
  });

  const [deidades, setDeidades] = useState([]);
  const [success, setSuccess] = useState("");

  const { crearCabania, loading, error } = useCabanias();

  useEffect(() => {
    const fetchDeidades = async () => {
      try {
        const { data } = await axios.get(API_ROUTES.DEIDADES);
        setDeidades(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error al cargar deidades", err);
        setDeidades([]);
      }
    };
    fetchDeidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "capacidad" || name === "deidad"
          ? value === "" ? null : parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");


    try {
      const data = await crearCabania(form);
      console.log("Response:", data); // para ver que me dice el back
      setSuccess("¡Cabaña creada exitosamente!");
      setForm({ nombre: "", capacidad: null, descripcion: "", ubicacion: "", deidad: null });
    } catch (err) {
      console.error("Error en creación:", err.response?.data); 
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-4 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      {/* Nombre */}
      <div className="relative col-span-2 sm:col-span-1">
        <HomeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la cabaña"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      {/* Capacidad */}
      <div className="relative col-span-2 sm:col-span-1">
        <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          value={form.capacidad || ""}
          onChange={handleChange}
        />
      </div>

      {/* Descripción */}
      <div className="relative col-span-2">
        <FileTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          rows={3}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none resize-none"
          value={form.descripcion}
          onChange={handleChange}
        />
      </div>

      {/* Ubicación */}
      <div className="relative col-span-2 sm:col-span-1">
        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none"
          value={form.ubicacion}
          onChange={handleChange}
        />
      </div>

      {/* Deidad */}
      <div className="relative col-span-2 sm:col-span-1">
        <UserRoundSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          name="deidad"
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md outline-none bg-white"
          value={form.deidad || ""}
          onChange={handleChange}
        >
          <option value="">Seleccione una deidad</option>
          {Array.isArray(deidades) &&
            deidades.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nombre}
              </option>
            ))}
        </select>
      </div>

      {/* Mensajes */}
      {error && <div className="col-span-2 text-red-600 text-center font-medium">{error}</div>}
      {success && <div className="col-span-2 text-green-600 text-center font-medium">{success}</div>}

      {/* Botón */}
      <button
        type="submit"
        className="col-span-2 w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-60 normal-case"
        disabled={loading}
      >
        {loading ? "Guardando..." : "Crear cabaña"}
      </button>
    </form>
  );
};

export default CabaniaForm;
