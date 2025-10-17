import { useState } from "react";
import { useToaster } from "@hooks/useToaster";
import api from "@hooks/useApi";
import ButtonBase from "@components/commonComp/ButtonBase";

export default function UserDetailAdmin({ userData }) {
  const { success, error } = useToaster();

  const [form, setForm] = useState({
    nombre: userData.nombre || "",
    apellido: userData.apellido || "",
    email: userData.email || "",
    telefono: userData.telefono || "",
    fechaNac: userData.fechaNac?.slice(0, 10) || "",
    pais: userData.pais || "",
    ciudad: userData.ciudad || "",
    direccion: userData.direccion || "",
    alergias: userData.alergias || "",
    grupoSanguineo: userData.grupoSanguineo || "",
    telefonoEmergencia: userData.telefonoEmergencia || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validGrupos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const telEmergencia = form.telefonoEmergencia.replace(/\D/g, "");

    if (!form.nombre.trim() || !form.apellido.trim()) {
      error("Nombre y apellido son obligatorios");
      return;
    }

    if (!form.email.trim() || !form.email.includes("@")) {
      error("Correo electrónico inválido");
      return;
    }

    if (telEmergencia.length > 15) {
      error("El teléfono de emergencia debe tener máximo 15 dígitos");
      return;
    }

    if (form.grupoSanguineo && !validGrupos.includes(form.grupoSanguineo)) {
      error("Grupo sanguíneo inválido");
      return;
    }

    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      email: form.email.trim(),
      telefono: form.telefono?.trim(),
      fecha_nac: form.fechaNac || null,
      pais: form.pais?.trim(),
      ciudad: form.ciudad?.trim(),
      direccion: form.direccion?.trim(),
      alergias: form.alergias?.trim(),
      grupoSanguineo: form.grupoSanguineo || null,
      telefonoEmergencia: telEmergencia || null,
    };

    try {
      const res = await api.patch(`/admin/${userData.id}`, payload);
      console.log("PATCH response:", res.data);
      success("Perfil actualizado correctamente");
    } catch (err) {
      console.error("Error en PATCH /admin:", err.response?.data || err);
      error(err.response?.data?.message || "Error al actualizar el perfil");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      {/* Título principal */}
      <h1 className="w-full text-center text-white text-3xl md:text-4xl font-caesar-dressing-regular bg-amber-500 py-4 rounded-md shadow-md">
        Editar perfil de Administrador
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 md:p-8 grid gap-4"
      >
        {Object.keys(form).map((campo) => (
          <div key={campo} className="flex flex-col">
            <label className="capitalize font-semibold mb-1">{campo}</label>

            {campo === "grupoSanguineo" ? (
              <select
                name={campo}
                value={form[campo]}
                onChange={handleChange}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
                <option value="">Seleccionar</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            ) : (
              <input
                type={campo === "fechaNac" ? "date" : "text"}
                name={campo}
                value={form[campo] || ""}
                onChange={handleChange}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            )}
          </div>
        ))}

        <ButtonBase type="submit" variant="contained" color="amber" className="mt-4">
          Guardar cambios
        </ButtonBase>
      </form>
    </div>
  );
}