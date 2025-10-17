import { useState } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useToaster } from "@hooks/useToaster";
import api from "@hooks/useApi";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function UserForm({ onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    repetirContrasena: "",
    telefono: "",
    direccion: "",
    rol: "", 
    especialidad: "", 
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { promise, error, success } = useToaster();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const parseBackendErrors = (err) => {
    // Limpiar errores previos
    setFieldErrors({});

    // Estructura común de error de validación de Zod en backend
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors;
      const newFieldErrors = {};

      // Si es un array de errores de Zod
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          if (error.path && error.path.length > 0) {
            const fieldName = error.path[0];
            newFieldErrors[fieldName] = error.message;
          }
        });
        setFieldErrors(newFieldErrors);
        return "Por favor, corrige los errores en el formulario.";
      }

      if (typeof errors === "object") {
        Object.keys(errors).forEach((key) => {
          newFieldErrors[key] = Array.isArray(errors[key])
            ? errors[key][0]
            : errors[key];
        });
        setFieldErrors(newFieldErrors);
        return "Por favor, corrige los errores en el formulario.";
      }
    }

    if (err.response?.data?.message) {
      return err.response.data.message;
    }

    switch (err.response?.status) {
      case 400:
        return "Los datos enviados no son válidos.";
      case 401:
        return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
      case 403:
        return "No tienes permisos para realizar esta acción.";
      case 404:
        return "No se encontró el recurso solicitado.";
      case 409:
        return "Ya existe un usuario con este email.";
      case 422:
        return "Los datos no cumplen con los requisitos de validación.";
      case 500:
        return "Error en el servidor. Por favor, inténtalo más tarde.";
      default:
        return "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validaciones básicas de frontend
    const requiredFields = ["nombre", "apellido", "email", "contrasena", "repetirContrasena", "telefono", "direccion", "rol"];

    requiredFields.forEach(field => {
      if (!form[field]?.trim()) {
        errors[field] = `Este campo es obligatorio.`;
      }
    });

    if (form.rol === "instructor" && !form.especialidad?.trim()) {
      errors.especialidad = "La especialidad es obligatoria para instructores.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      errors.email = "El email no es válido.";
    }

    if (form.contrasena && form.contrasena.length < 6) {
      errors.contrasena = "La contraseña debe tener al menos 6 caracteres.";
    }

    const passwordRegex = /^[a-zA-Z0-9@*_!¡?¿[{}()]{6,30}$/;
    if (form.contrasena && !passwordRegex.test(form.contrasena)) {
      errors.contrasena = "La contraseña solo puede contener caracteres alfanuméricos y los símbolos @, *, _,?,¿,!,¡,{,},(,)";
    }

    if (form.contrasena !== form.repetirContrasena) {
      errors.repetirContrasena = "Las contraseñas no coinciden.";
    }

    // Validación de teléfono
    const phoneDigits = form.telefono.replace(/\D/g, '');
    if (form.telefono && phoneDigits.length < 7) {
      errors.telefono = "El teléfono debe tener al menos 7 dígitos.";
    }

    if (form.telefono && phoneDigits.length > 15) {
      errors.telefono = "El teléfono debe tener un máximo de 15 dígitos.";
    }

    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (form.nombre && !nameRegex.test(form.nombre)) {
      errors.nombre = "El nombre solo puede contener letras, espacios, guiones y apóstrofes.";
    }

    if (form.apellido && !nameRegex.test(form.apellido)) {
      errors.apellido = "El apellido solo puede contener letras, espacios, guiones y apóstrofes.";
    }

    if (form.nombre && form.nombre.length < 2) {
      errors.nombre = "El nombre debe tener al menos 2 caracteres.";
    }

    if (form.apellido && form.apellido.length < 2) {
      errors.apellido = "El apellido debe tener al menos 2 caracteres.";
    }

    const addressRegex = /^[a-zA-ZÀ-ÿ\s'-,]+$/;
    if (form.direccion && !addressRegex.test(form.direccion)) {
      errors.direccion = "La dirección solo puede contener letras, espacios, guiones, apóstrofes y comas.";
    }

    if (form.especialidad && !nameRegex.test(form.especialidad)) {
      errors.especialidad = "La especialidad solo puede contener letras, espacios, guiones y apóstrofes.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    const frontendErrors = validateForm();
    if (Object.keys(frontendErrors).length > 0) {
      setFieldErrors(frontendErrors);
      return error("Por favor, corrige los errores en el formulario.");
    }

    const endpoint =
      form.rol === "admin"
        ? "/admin"
        : form.rol === "instructor"
        ? "/instructor"
        : "/campista";

    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim().toLowerCase(),
      contrasena: form.contrasena,
      telefono: form.telefono,
      direccion: form.direccion.trim(),
    };

    if (form.rol === "instructor") {
      payload.especialidad = form.especialidad.trim();
      payload.nivel = 1; // por defecto
    }

    try {
      setSaving(true);
      await promise(() => api.post(endpoint, payload), {
        loadingMsg: "Creando usuario...",
        successMsg: "Usuario creado con éxito",
        errorMsg: "Error al crear el usuario",
      });
      success("Usuario creado correctamente");
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        contrasena: "",
        repetirContrasena: "",
        telefono: "",
        direccion: "",
        rol: "",
        especialidad: "",
      });
      setFieldErrors({});
      onSuccess?.();
    } catch (err) {
      console.error("Error al crear usuario:", err);
      const errorMessage = parseBackendErrors(err);
      error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
              fieldErrors.nombre 
                ? "border-red-500 focus:border-red-400" 
                : "border-gray-300 focus:border-amber-400"
            }`}
          />
          {fieldErrors.nombre && (
            <span className="text-red-500 text-sm mt-1">{fieldErrors.nombre}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Apellido <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="apellido" 
            value={form.apellido} 
            onChange={handleChange} 
            className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
              fieldErrors.apellido 
                ? "border-red-500 focus:border-red-400" 
                : "border-gray-300 focus:border-amber-400"
            }`}
          />
          {fieldErrors.apellido && (
            <span className="text-red-500 text-sm mt-1">{fieldErrors.apellido}</span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input 
          type="email" 
          name="email" 
          value={form.email} 
          onChange={handleChange} 
          className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
            fieldErrors.email 
              ? "border-red-500 focus:border-red-400" 
              : "border-gray-300 focus:border-amber-400"
          }`}
        />
        {fieldErrors.email && (
          <span className="text-red-500 text-sm mt-1">{fieldErrors.email}</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <input 
            type="password" 
            name="contrasena" 
            value={form.contrasena} 
            onChange={handleChange} 
            className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
              fieldErrors.contrasena 
                ? "border-red-500 focus:border-red-400" 
                : "border-gray-300 focus:border-amber-400"
            }`}
          />
          {fieldErrors.contrasena && (
            <span className="text-red-500 text-sm mt-1">{fieldErrors.contrasena}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Repetir contraseña <span className="text-red-500">*</span>
          </label>
          <input 
            type="password" 
            name="repetirContrasena" 
            value={form.repetirContrasena} 
            onChange={handleChange} 
            className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
              fieldErrors.repetirContrasena 
                ? "border-red-500 focus:border-red-400" 
                : "border-gray-300 focus:border-amber-400"
            }`}
          />
          {fieldErrors.repetirContrasena && (
            <span className="text-red-500 text-sm mt-1">{fieldErrors.repetirContrasena}</span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Teléfono <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          country="ar"
          value={form.telefono}
          onChange={(value) => {
            setForm((f) => ({ ...f, telefono: value }));
            if (fieldErrors.telefono) {
              setFieldErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.telefono;
                return newErrors;
              });
            }
          }}
          inputClass={`!w-full !pl-3 !pr-3 !py-2 !border !rounded-md !outline-none ${
            fieldErrors.telefono
              ? "!border-red-500 focus:!border-red-400"
              : "!border-gray-300 focus:!border-amber-400"
          }`}
          inputProps={{ name: "telefono", placeholder: "Teléfono" }}
        />
        {fieldErrors.telefono && (
          <span className="text-red-500 text-sm mt-1">{fieldErrors.telefono}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dirección <span className="text-red-500">*</span>
        </label>
        <input 
          type="text" 
          name="direccion" 
          value={form.direccion} 
          onChange={handleChange} 
          className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
            fieldErrors.direccion 
              ? "border-red-500 focus:border-red-400" 
              : "border-gray-300 focus:border-amber-400"
          }`}
        />
        {fieldErrors.direccion && (
          <span className="text-red-500 text-sm mt-1">{fieldErrors.direccion}</span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rol <span className="text-red-500">*</span>
        </label>
        <select 
          name="rol" 
          value={form.rol} 
          onChange={handleChange} 
          className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
            fieldErrors.rol 
              ? "border-red-500 focus:border-red-400" 
              : "border-gray-300 focus:border-amber-400"
          }`}
        >
          <option value="">Seleccionar rol</option>
          <option value="campista">Campista</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
        {fieldErrors.rol && (
          <span className="text-red-500 text-sm mt-1">{fieldErrors.rol}</span>
        )}
      </div>

      {form.rol === "instructor" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Especialidad <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="especialidad" 
            value={form.especialidad} 
            onChange={handleChange} 
            className={`mt-1 w-full border rounded-md p-2 focus:ring-amber-400 ${
              fieldErrors.especialidad 
                ? "border-red-500 focus:border-red-400" 
                : "border-gray-300 focus:border-amber-400"
            }`}
          />
          {fieldErrors.especialidad && (
            <span className="text-red-500 text-sm mt-1">{fieldErrors.especialidad}</span>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <ButtonBase color="amber" type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Crear"}
        </ButtonBase>
      </div>
    </form>
  );
}