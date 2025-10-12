/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useToaster } from "@hooks/useToaster";
import api from "@hooks/useApi";

export default function PeriodForm({ periodoId = null, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaInicioPer: "",
    fechaFinPer: "",
    fechaInicioInsc: "",
    fechaFinInsc: "",
    estado: "abierto",
  });
  const [loading, setLoading] = useState(false);
  const { promise, error } = useToaster();

  useEffect(() => {
    if (periodoId) {
      setLoading(true);
      api
        .get(`/periodo/${periodoId}`)
        .then(({ data }) => {
          const p = data.data;
          setForm({
            nombre: p.nombre || "",
            descripcion: p.descripcion || "",
            fechaInicioPer: p.fechaInicioPer?.slice(0, 16) || "",
            fechaFinPer: p.fechaFinPer?.slice(0, 16) || "",
            fechaInicioInsc: p.fechaInicioInsc?.slice(0, 16) || "",
            fechaFinInsc: p.fechaFinInsc?.slice(0, 16) || "",
            estado: p.estado || "abierto",
          });
        })
        .catch(() => error("Error al cargar período"))
        .finally(() => setLoading(false));
    }
  }, [periodoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "nombre",
      "descripcion",
      "fechaInicioPer",
      "fechaFinPer",
      "fechaInicioInsc",
      "fechaFinInsc",
      "estado",
    ];

    for (const field of requiredFields) {
      if (!form[field]) {
        alert(`El campo "${field}" es obligatorio.`);
        return;
      }
    }

    if (new Date(form.fechaInicioPer) > new Date(form.fechaFinPer)) {
      alert("La fecha de inicio del período no puede ser mayor a la fecha de fin.");
      return;
    }
    if (new Date(form.fechaInicioInsc) > new Date(form.fechaFinInsc)) {
      alert("La fecha de inicio de inscripción no puede ser mayor a la fecha de fin.");
      return;
    }

    try {
      setLoading(true);
      await promise(
        () =>
          periodoId
            ? api.put(`/periodo/${periodoId}`, form)
            : api.post("/periodo", form),
        {
          loadingMsg: periodoId ? "Actualizando período..." : "Creando período...",
          successMsg: periodoId
            ? "Período actualizado con éxito"
            : "Período creado con éxito",
          errorMsg: "Error al guardar el período",
        }
      );
      onSuccess?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que deseas eliminar este período? Esta acción no se puede deshacer.")) return;

    try {
      setLoading(true);
      await promise(() => api.delete(`/periodo/${periodoId}`), {
        loadingMsg: "Eliminando período...",
        successMsg: "Período eliminado con éxito",
        errorMsg: "Error al eliminar el período",
      });
      onSuccess?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      {/* Campos del formulario */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Inicio del período</label>
          <input
            type="datetime-local"
            name="fechaInicioPer"
            value={form.fechaInicioPer}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fin del período</label>
          <input
            type="datetime-local"
            name="fechaFinPer"
            value={form.fechaFinPer}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Inicio inscripción</label>
          <input
            type="datetime-local"
            name="fechaInicioInsc"
            value={form.fechaInicioInsc}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fin inscripción</label>
          <input
            type="datetime-local"
            name="fechaFinInsc"
            value={form.fechaFinInsc}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estado</label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
        >
          <option value="abierto">Abierto</option>
          <option value="cerrado">Cerrado</option>
        </select>
      </div>
      <div className="flex justify-between gap-2 mt-4">
        {periodoId && (
          <ButtonBase color="amber" onClick={handleDelete} disabled={loading}>
            Eliminar
          </ButtonBase>
        )}
        
        <ButtonBase color="amber" type="submit" disabled={loading}>
          {loading ? "Guardando..." : periodoId ? "Actualizar" : "Crear"}
        </ButtonBase>
      </div>
    </form>
  );
}