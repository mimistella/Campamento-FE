import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DashboardContext from "../../context/DashboardContext";
import { useCabanias } from "../../hooks/useCabanias";

const EditarCabania = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (!cabania) return <p>No se encontró la cabaña</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateCabania(cabania.id, {
      descripcion: formData.descripcion,
      capacidad: Number(formData.capacidad),
    });
    await refreshData();
    navigate("/admin/cabanas");
  };

  const handleDelete = async () => {
    await deleteCabania(cabania.id);
    await refreshData();
    navigate("/admin/cabanas");
  };

const handleMoverCampista = async () => {
  try {
    console.log("Intentando mover:", { hospedajeSeleccionado, nuevaCabaniaId });
    await moveCampista(hospedajeSeleccionado.id, parseInt(nuevaCabaniaId));
    await refreshData();
    setOpenMover(false);
    setHospedajeSeleccionado(null);
    setNuevaCabaniaId('');
    alert("Campista movido correctamente");
  } catch (err) {
    console.error("Error moviendo campista:", err);
    alert(`No se pudo mover el campista: ${err.response?.data?.message || err.message}`);
  }

};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">
        Editar cabaña: {cabania.nombre}
      </h1>

      {/* Formulario solo para descripción y capacidad */}
      <div className="mb-6 space-y-3">
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Descripción"
        />
        <input
          type="number"
          name="capacidad"
          value={formData.capacidad}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Capacidad"
        />
      </div>

      {/* Campistas hospedados */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Campistas hospedados</h2>
        {campistas.length === 0 ? (
          <p className="text-gray-500">No hay campistas en esta cabaña</p>
        ) : (
          <ul className="space-y-2">
            {campistas.map((h) => (
  <li key={h.id} className="flex justify-between items-center border p-2 rounded">
    <span>
      {h.campista.nombre} {h.campista.apellido}
    </span>
    <button
      onClick={() => {
        setHospedajeSeleccionado(h); 
        setOpenMover(true);
      }}
      className="px-3 py-1 bg-amber-400 text-white rounded"
    >
      Mover
    </button>
  </li> ))}
          </ul>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-amber-500 text-white rounded"
        >
          Guardar cambios
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-orange-800 text-white rounded"
        >
          Eliminar cabaña
        </button>
      </div>

      {/* Dialogo mover campista */}
      <Dialog
        open={openMover}
        onClose={() => setOpenMover(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Mover campista</DialogTitle>
        <DialogContent dividers>
         <p>
  Seleccioná una nueva cabaña para{" "}
  <strong>
    {hospedajeSeleccionado?.campista?.nombre}{" "}
    {hospedajeSeleccionado?.campista?.apellido}
  </strong>
</p>
<select
  value={nuevaCabaniaId}
  onChange={(e) => setNuevaCabaniaId(e.target.value)}
  className="mt-3 w-full border rounded p-2"
>
  <option value="">-- Seleccionar cabaña --</option>
  {cabanias
    .filter((c) => c.id !== hospedajeSeleccionado?.cabania?.id) 
    .map((c) => (
      <option key={c.id} value={c.id}>
        {c.nombre} (capacidad: {c.capacidad})
      </option>
    ))}
</select>
        </DialogContent>
        <DialogActions>
  <Button 
    onClick={() => setOpenMover(false)} 
    color="error"
  >
    Cancelar
  </Button>
  <Button
  onClick={handleMoverCampista}
  disabled={!nuevaCabaniaId}
  className="!px-4 py-2 !bg-amber-400 !text-white rounded"
  variant="contained"
  >
    Confirmar
  </Button>
</DialogActions>
      </Dialog>
    </div>
  );
};

export default EditarCabania;
