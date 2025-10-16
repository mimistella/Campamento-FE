import React, { useEffect, useState, useCallback } from "react";
import { HomeIcon, UsersIcon, FileTextIcon, MapPinIcon, UserRoundSearchIcon } from "lucide-react";
import { useCabanias } from "@hooks/useCabanias";
import { useToaster } from "@hooks/useToaster";
import api from "@hooks/useApi";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
    Guardando...
  </div>
);

export default function CabaniaForm({ onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    capacidad: "",
    descripcion: "",
    ubicacion: "",
    deidad: "",
  });

  const [deidades, setDeidades] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingDeidades, setLoadingDeidades] = useState(false);
  
  const toast = useToaster();
  const { crearCabania, loading} = useCabanias();

  const fetchDeidades = useCallback(async () => {
    setLoadingDeidades(true);
    try {
      const { data } = await api.get('/deidades');
      setDeidades(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error("Error al cargar deidades", err);
      const errorMessage = err.response?.data?.message || "Error al cargar las deidades";
      toast.error(errorMessage);
      setDeidades([]);
    } finally {
      setLoadingDeidades(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  useEffect(() => {
    fetchDeidades();
  }, [fetchDeidades]); 


  const validateForm = () => {
    const errors = {};

    if (!form.nombre?.trim()) {
      errors.nombre = "El nombre es obligatorio";
    } else if (form.nombre.length < 2) {
      errors.nombre = "El nombre debe tener al menos 2 caracteres";
    } else if (form.nombre.length > 100) {
      errors.nombre = "El nombre no puede exceder 100 caracteres";
    }

    if (!form.capacidad) {
      errors.capacidad = "La capacidad es obligatoria";
    } else if (parseInt(form.capacidad) < 1 || parseInt(form.capacidad) > 100) {
      errors.capacidad = "La capacidad debe ser entre 1 y 100";
    }

    if (form.descripcion && form.descripcion.length < 10) {
      errors.descripcion = "La descripción debe tener al menos 10 caracteres";
    } else if (form.descripcion && form.descripcion.length > 500) {
      errors.descripcion = "La descripción no puede exceder 500 caracteres";
    }

    if (!form.ubicacion?.trim()) {
      errors.ubicacion = "La ubicación es obligatoria";
    } else if (form.ubicacion.length < 2) {
      errors.ubicacion = "La ubicación debe tener al menos 2 caracteres";
    } else if (form.ubicacion.length > 100) {
      errors.ubicacion = "La ubicación no puede exceder 100 caracteres";
    }

    if (!form.deidad) {
      errors.deidad = "Debe seleccionar una deidad";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "capacidad" || name === "deidad"
          ? value === "" ? "" : parseInt(value, 10)
          : value,
    }));
  };


  const handleBackendErrors = (error) => {
    const backendError = error.response?.data;
    
    if (!backendError) {
      return "Error de conexión con el servidor";
    }


    if (backendError.details && Array.isArray(backendError.details)) {
      const fieldErrors = {};
      
      backendError.details.forEach(detail => {
        let fieldName = 'general';
        let errorMessage = detail.message || JSON.stringify(detail);
        

        if (errorMessage.includes('descripcion') || errorMessage.includes('descripción')) {
          fieldName = 'descripcion';
          if (errorMessage.includes('más larga') || errorMessage.includes('al menos')) {
            errorMessage = "La descripción debe tener al menos 10 caracteres";
          } else if (errorMessage.includes('más corta') || errorMessage.includes('exceder')) {
            errorMessage = "La descripción no puede exceder 500 caracteres";
          }
        } else if (errorMessage.includes('nombre')) {
          fieldName = 'nombre';
          if (errorMessage.includes('más largo') || errorMessage.includes('al menos')) {
            errorMessage = "El nombre debe tener al menos 2 caracteres";
          } else if (errorMessage.includes('más corto') || errorMessage.includes('exceder')) {
            errorMessage = "El nombre no puede exceder 100 caracteres";
          }
        } else if (errorMessage.includes('capacidad')) {
          fieldName = 'capacidad';
          if (errorMessage.includes('mínimo')) {
            errorMessage = "La capacidad debe ser al menos 1";
          } else if (errorMessage.includes('máximo')) {
            errorMessage = "La capacidad no puede exceder 100";
          }
        } else if (errorMessage.includes('ubicacion') || errorMessage.includes('ubicación')) {
          fieldName = 'ubicacion';
          if (errorMessage.includes('más largo') || errorMessage.includes('al menos')) {
            errorMessage = "La ubicación debe tener al menos 2 caracteres";
          } else if (errorMessage.includes('más corto') || errorMessage.includes('exceder')) {
            errorMessage = "La ubicación no puede exceder 100 caracteres";
          }
        } else if (errorMessage.includes('deidad')) {
          fieldName = 'deidad';
          errorMessage = "Debe seleccionar una deidad válida";
        }
        
        fieldErrors[fieldName] = errorMessage;
      });

      setFormErrors(fieldErrors);
      const firstError = Object.values(fieldErrors)[0];
      return firstError || "Error de validación en el formulario";
    }

    return backendError.message || backendError.error || "Error interno del servidor";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, corrija los errores en el formulario");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Creando cabaña...");

    try {
      const payload = {
        nombre: form.nombre.trim(),
        capacidad: parseInt(form.capacidad, 10),
        descripcion: form.descripcion?.trim() || "",
        ubicacion: form.ubicacion.trim(),
        deidad: parseInt(form.deidad, 10),
      };

      await crearCabania(payload);
      
      toast.dismiss(toastId);
      toast.success("¡Cabaña creada exitosamente!");
      
      setForm({ 
        nombre: "", 
        capacidad: "", 
        descripcion: "", 
        ubicacion: "", 
        deidad: "" 
      });
      setFormErrors({});
      
      if (onSuccess) onSuccess();
      
    } catch (err) {
      toast.dismiss(toastId);
      console.error("Error en creación:", err);
      const errorMessage = handleBackendErrors(err);
      toast.error(errorMessage);
      
    } finally {
      setIsSubmitting(false);
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
          placeholder="Nombre de la cabaña *"
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none transition-colors ${
            formErrors.nombre 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-amber-500'
          }`}
          value={form.nombre}
          onChange={handleChange}
          autoComplete="off"
        />
        {formErrors.nombre && (
          <p className="text-red-500 text-xs mt-1">{formErrors.nombre}</p>
        )}
      </div>

      {/* Capacidad */}
      <div className="relative col-span-2 sm:col-span-1">
        <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="number"
          name="capacidad"
          placeholder="Capacidad *"
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none transition-colors ${
            formErrors.capacidad 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-amber-500'
          }`}
          value={form.capacidad}
          onChange={handleChange}
          autoComplete="off"
        />
        {formErrors.capacidad && (
          <p className="text-red-500 text-xs mt-1">{formErrors.capacidad}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="relative col-span-2">
        <FileTextIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          rows={3}
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none resize-none transition-colors ${
            formErrors.descripcion 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-amber-500'
          }`}
          value={form.descripcion}
          onChange={handleChange}
          autoComplete="off"
        />
        {formErrors.descripcion && (
          <p className="text-red-500 text-xs mt-1">{formErrors.descripcion}</p>
        )}
      </div>

      {/* Ubicación */}
      <div className="relative col-span-2 sm:col-span-1">
        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          name="ubicacion"
          placeholder="Ubicación *"
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none transition-colors ${
            formErrors.ubicacion 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-amber-500'
          }`}
          value={form.ubicacion}
          onChange={handleChange}
          autoComplete="off"
        />
        {formErrors.ubicacion && (
          <p className="text-red-500 text-xs mt-1">{formErrors.ubicacion}</p>
        )}
      </div>

      {/* Deidad */}
      <div className="relative col-span-2 sm:col-span-1">
        <UserRoundSearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          name="deidad"
          className={`w-full pl-10 pr-3 py-2 border rounded-md outline-none bg-white transition-colors ${
            formErrors.deidad 
              ? 'border-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:border-amber-500'
          }`}
          value={form.deidad}
          onChange={handleChange}
          disabled={loadingDeidades}
        >
          <option value="">
            {loadingDeidades ? "Cargando deidades..." : "Seleccione una deidad *"}
          </option>
          {Array.isArray(deidades) && deidades.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>
        {formErrors.deidad && (
          <p className="text-red-500 text-xs mt-1">{formErrors.deidad}</p>
        )}
        {loadingDeidades && (
          <p className="text-gray-500 text-xs mt-1">Cargando deidades...</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="col-span-2 w-full bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading || isSubmitting || loadingDeidades}
      >
        {loading || isSubmitting ? <LoadingSpinner /> : "Crear cabaña"}
      </button>
    </form>
  );
}