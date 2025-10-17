import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardContext from "@context/DashboardContext";
import { useCabanias } from "@hooks/useCabanias";
import { useToaster } from "@hooks/useToaster";
import { MESSAGES } from "../constants/messages";

export function useEditarCabania() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToaster();
  const { cabanias, hospedajes, refreshData } = useContext(DashboardContext);
  const { updateCabania, deleteCabania, moveCampista } = useCabanias();

  const cabania = cabanias.find((c) => c.id === parseInt(id));
  const campistas = hospedajes.filter((h) => h.cabania.id === parseInt(id));

  const [formData, setFormData] = useState({
    descripcion: cabania?.descripcion || "",
    capacidad: cabania?.capacidad || 0,
  });

  const [openMover, setOpenMover] = useState(false);
  const [hospedajeSeleccionado, setHospedajeSeleccionado] = useState(null);
  const [nuevaCabaniaId, setNuevaCabaniaId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const toastId = toast.loading(MESSAGES.SAVING);
    try {
      await updateCabania(cabania.id, {
        descripcion: formData.descripcion,
        capacidad: Number(formData.capacidad),
      });
      await refreshData();
      toast.dismiss(toastId);
      toast.success(MESSAGES.SAVE_SUCCESS);
      navigate("/admin/cabanas");
    } catch (err) {
      toast.dismiss(toastId);
      console.error(err);
      toast.error(MESSAGES.SAVE_ERROR);
    }
  };

  const handleDelete = async () => {
    if (!confirm(MESSAGES.CONFIRM_DELETE)) return;

    const toastId = toast.loading(MESSAGES.DELETING);
    try {
      await deleteCabania(cabania.id);
      await refreshData();
      toast.dismiss(toastId);
      toast.success(MESSAGES.DELETE_SUCCESS);
      navigate("/admin/cabanas");
    } catch (err) {
      toast.dismiss(toastId);
      console.error(err);
      toast.error(MESSAGES.DELETE_ERROR);
    }
  };

  const handleMoverCampista = async () => {
    setLoading(true);
    const toastId = toast.loading(MESSAGES.MOVING);

    try {
      await moveCampista(hospedajeSeleccionado.id, parseInt(nuevaCabaniaId));
      await refreshData();
      toast.dismiss(toastId);
      toast.success(MESSAGES.MOVE_SUCCESS);
      setOpenMover(false);
      setHospedajeSeleccionado(null);
      setNuevaCabaniaId("");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(`${MESSAGES.MOVE_ERROR} ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    cabania,
    campistas,
    formData,
    handleChange,
    handleSave,
    handleDelete,
    handleMoverCampista,
    openMover,
    setOpenMover,
    hospedajeSeleccionado,
    setHospedajeSeleccionado,
    nuevaCabaniaId,
    setNuevaCabaniaId,
    loading,
    cabanias,
  };
}