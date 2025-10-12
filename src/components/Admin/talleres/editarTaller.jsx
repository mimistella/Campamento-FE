import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTalleres } from "@hooks/useTalleres";
import { useDashboard } from "@hooks/useDashboard";
import { useToaster } from "@hooks/useToaster";

const EditarTaller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToaster();

  const {
    talleres,
    inscripciones,
    updateTaller,
    deleteTaller,
    refreshData,
    deleteInscripto,
    loading: loadingTalleres,
  } = useTalleres();

  const { instructores } = useDashboard();

  const taller = Array.isArray(talleres)
    ? talleres.find((t) => t.id === parseInt(id))
    : null;

  const campistasInscriptos = Array.isArray(inscripciones)
    ? inscripciones.filter((i) => i?.taller?.id === parseInt(id))
    : [];

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    instructor: null,
    cupo: 0,
    duracionHoras: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taller) {
      const fechaHoraCorregida = taller.fechaHora
        ? taller.fechaHora.replace("Z", "").slice(0, 16)
        : "";

      let instructorId = null;
      if (taller.instructor?.nombre && taller.instructor?.apellido) {
        const instructorEncontrado = instructores.find(
          (inst) =>
            inst.nombre === taller.instructor.nombre &&
            inst.apellido === taller.instructor.apellido
        );
        instructorId = instructorEncontrado?.id || null;
      }

      setFormData({
        titulo: taller.titulo || "",
        descripcion: taller.descripcion || "",
        fechaHora: fechaHoraCorregida,
        lugar: taller.lugar || "",
        instructor: instructorId,
        cupo: taller.cupo || 0,
        duracionHoras: taller.duracionHoras || 0,
      });
    }
  }, [taller, instructores]);

  if (loadingTalleres) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Cargando taller...</p>
      </div>
    );
  }

  if (!taller) {
    return (
      <div className="p-6">
        <p className="text-red-500">No se encontró el taller con ID: {id}</p>
        <button
          onClick={() => navigate("/admin/talleres")}
          className="px-4 py-2 bg-gray-500 text-white rounded mt-4"
        >
          Volver a talleres
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "cupo" || name === "duracionHoras" || name === "instructor"
          ? Number(value)
          : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.instructor) {
      toast.error("Debe seleccionar un instructor");
      return;
    }

    const toastId = toast.loading("Guardando cambios...");
    setLoading(true);

    try {
      const dataParaEnviar = {
        ...formData,
        fechaHora: formData.fechaHora ? `${formData.fechaHora}:00.000Z` : null,
        instructor: formData.instructor,
      };

      await updateTaller(taller.id, dataParaEnviar);
      await refreshData();

      toast.dismiss(toastId);
      toast.success("Taller actualizado correctamente.");
      navigate("/admin/talleres");
    } catch (err) {
      console.error("Error actualizando taller:", err);
      toast.dismiss(toastId);
      toast.error("No se pudo actualizar el taller.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("¿Seguro que querés eliminar este taller?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Eliminando taller...");
    setLoading(true);

    try {
      await deleteTaller(taller.id);
      await refreshData();

      toast.dismiss(toastId);
      toast.success("Taller eliminado correctamente.");
      navigate("/admin/talleres");
    } catch (err) {
      console.error("Error eliminando taller:", err);
      toast.dismiss(toastId);
      toast.error("No se pudo eliminar el taller.");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarInscripto = async (inscripcionId) => {
    const confirmDelete = confirm("¿Seguro que querés eliminar esta inscripción?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Eliminando inscripción...");
    setLoading(true);

    try {
      await deleteInscripto(inscripcionId);
      await refreshData();
      toast.dismiss(toastId);
      toast.success("Inscripción eliminada correctamente.");
    } catch (err) {
      console.error("Error eliminando inscripción:", err);
      toast.dismiss(toastId);
      toast.error("No se pudo eliminar la inscripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">
        Editar taller: {taller.titulo}
      </h1>

      {/* Formulario */}
      <div className="mb-6 space-y-3 max-w-2xl">
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Título del taller"
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows={3}
          placeholder="Descripción"
        />
        <input
          type="datetime-local"
          name="fechaHora"
          value={formData.fechaHora}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          name="lugar"
          value={formData.lugar}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Lugar"
        />
        <input
          type="number"
          name="cupo"
          value={formData.cupo}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Cupo"
          min={1}
        />
        <input
          type="number"
          name="duracionHoras"
          value={formData.duracionHoras}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Duración en horas"
          min={1}
        />
        <select
          name="instructor"
          value={formData.instructor || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        >
          <option value="">Seleccione un instructor</option>
          {Array.isArray(instructores) &&
            instructores.map((inst) => (
              <option key={inst.id} value={inst.id}>
                {inst.nombre} {inst.apellido}
              </option>
            ))}
        </select>
      </div>

      {/* Campistas inscriptos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Campistas inscriptos</h2>
        {campistasInscriptos.length === 0 ? (
          <p className="text-gray-500">No hay campistas inscriptos en este taller</p>
        ) : (
          <ul className="space-y-2">
            {campistasInscriptos.map((inscripcion) => (
              <li
                key={inscripcion.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {inscripcion.campista?.nombre} {inscripcion.campista?.apellido}
                </span>
                <button
                  onClick={() => handleEliminarInscripto(inscripcion.id)}
                  className="px-3 py-1 bg-orange-500 text-white rounded"
                  disabled={loading}
                >
                  Eliminar inscripción
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-amber-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-orange-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Eliminando..." : "Eliminar taller"}
        </button>
        <button
          onClick={() => navigate("/admin/talleres")}
          className="px-4 py-2 bg-amber-400 text-white rounded"
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditarTaller;