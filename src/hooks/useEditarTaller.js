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

  const [taller, setTaller] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    instructor: "", // usar "" en vez de null
    cupo: 0,
    duracionMin: 0,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // --- cargar taller ---
  useEffect(() => {
    if (Array.isArray(talleres)) {
      const encontrado = talleres.find((t) => t.id === parseInt(id));
      if (encontrado) setTaller(encontrado);
    }
  }, [talleres, id]);

  // --- inscriptos ---
  const campistasInscriptos = Array.isArray(inscripciones)
    ? inscripciones.filter((i) => i?.taller?.id === parseInt(id))
    : [];

  // --- cargar formData ---
  useEffect(() => {
    if (taller) {
      const fechaHoraCorregida = taller.fechaHora
        ? taller.fechaHora.replace("Z", "").slice(0, 16)
        : "";

      setFormData({
        titulo: taller.titulo || "",
        descripcion: taller.descripcion || "",
        fechaHora: fechaHoraCorregida,
        lugar: taller.lugar || "",
        instructor: taller.instructor?.id ?? "", // <--- usar directamente el id
        cupo: taller.cupo || 0,
        duracionMin: taller.duracionMin || 0,
      });
    }
  }, [taller]);

  // --- handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "instructor" || name === "cupo" || name === "duracionMin"
          ? value !== "" ? Number(value) : ""
          : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSave = async () => {
    if (!formData.instructor) {
      toast.error("Debe seleccionar un instructor");
      return;
    }

    const toastId = toast.loading("Guardando cambios...");
    setLoading(true);

    try {
      const data = {
        ...formData,
        fechaHora: formData.fechaHora
          ? `${formData.fechaHora}:00.000Z`
          : null,
      };

      await updateTaller(taller.id, data);
      await refreshData();
      toast.dismiss(toastId);
      toast.success("Taller actualizado correctamente.");
      navigate("/admin/talleres");
    } catch (err) {
      console.error("Error actualizando taller:", err);
      toast.dismiss(toastId);

      const details = err.response?.data?.details;
      if (Array.isArray(details)) {
        const fieldErrors = {};
        details.forEach((d) => {
          const field = d.path?.[0];
          if (field) fieldErrors[field] = d.message;
        });
        setErrors(fieldErrors);
        toast.error("Revisá los campos con errores.");
      } else {
        toast.error(err.response?.data?.message || "No se pudo actualizar el taller.");
      }
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
    setTaller,
    instructores,
    campistasInscriptos,
    handleChange,
    handleSave,
    handleDelete,
    handleEliminarInscripto,
    loading,
    loadingTalleres,
    errors,
  };
};
