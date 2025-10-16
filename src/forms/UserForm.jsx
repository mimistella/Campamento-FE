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

  const [saving, setSaving] = useState(false);
  const { promise, error, success } = useToaster();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["nombre", "apellido", "email", "contrasena", "repetirContrasena", "telefono", "direccion", "rol"];

    for (const field of requiredFields) {
      if (!form[field]) {
        return error(`El campo "${field}" es obligatorio.`);
      }
    }

    if (form.rol === "instructor" && !form.especialidad) {
      return error("El campo 'especialidad' es obligatorio para instructores.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return error("El email no es válido.");
    }

    if (form.contrasena !== form.repetirContrasena) {
      return error("Las contraseñas no coinciden.");
    }

    const phoneDigits = form.telefono.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return error("El teléfono debe tener al menos 10 dígitos.");
    }

    const endpoint =
      form.rol === "admin"
        ? "/admin"
        : form.rol === "instructor"
        ? "/instructor"
        : "/campista";

    const payload = {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,
      contrasena: form.contrasena,
      telefono: form.telefono,
      direccion: form.direccion,
    };

    if (form.rol === "instructor") {
      payload.especialidad = form.especialidad;
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
      onSuccess?.();
    } catch (err) {
      console.error(err);
      error(err?.response?.data?.message || "Ocurrió un error al crear el usuario.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input type="text" name="apellido" value={form.apellido} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"/>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"/>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input type="password" name="contrasena" value={form.contrasena} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Repetir contraseña</label>
          <input type="password" name="repetirContrasena" value={form.repetirContrasena} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"/>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <PhoneInput
          country="ar"
          value={form.telefono}
          onChange={(value) => setForm((f) => ({ ...f, telefono: value }))}
          inputClass="!w-full !pl-3 !pr-3 !py-2 !border !border-gray-300 !rounded-md !outline-none focus:!border-amber-400"
          inputProps={{ name: "telefono", placeholder: "Teléfono" }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <input type="text" name="direccion" value={form.direccion} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"/>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <select name="rol" value={form.rol} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400">
          <option value="">Seleccionar rol</option>
          <option value="campista">Campista</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {form.rol === "instructor" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Especialidad</label>
          <input type="text" name="especialidad" value={form.especialidad} onChange={handleChange} className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"/>
        </div>
      )}

      <div className="flex justify-end">
        <ButtonBase color="amber" type="submit" disabled={saving}>{saving ? "Guardando..." : "Crear"}</ButtonBase>
      </div>
    </form>
  );
}