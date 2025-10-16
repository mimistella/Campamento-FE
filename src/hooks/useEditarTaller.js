import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTalleres } from "@hooks/useTalleres";
import { useDashboard } from "@hooks/useDashboard";
import { useToaster } from "@hooks/useToaster";

export const useEditarTaller = () => {
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
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    instructor: null,
    cupo: 0,
    duracionMin: 0,
  });
  const [loading, setLoading] = useState(false);

  const taller = Array.isArray(talleres)
    ? talleres.find((t) => t.id === parseInt(id))
    : null;

  const campistasInscriptos = Array.isArray(inscripciones)
    ? inscripciones.filter((i) => i?.taller?.id === parseInt(id))
    : [];


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
        duracionMin: taller.duracionMin || 0,
      });
    }
  }, [taller, instructores]);

  // --- handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "cupo" || name === "duracionMin" || name === "instructor"
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
    if (!confirm("¿Seguro que querés eliminar este taller?")) return;
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
    if (!confirm("¿Seguro que querés eliminar esta inscripción?")) return;
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

  return {
    id,
    formData,
    taller,
    instructores,
    campistasInscriptos,
    handleChange,
    handleSave,
    handleDelete,
    handleEliminarInscripto,
    loading,
    loadingTalleres,
    navigate,
  };
};
