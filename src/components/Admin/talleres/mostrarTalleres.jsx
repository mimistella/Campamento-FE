import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useTalleres } from "@hooks/useTalleres";
import List from "@components/commonComp/List";
import TallerCard from "@components/Admin/talleres/TallerCard";
import ButtonBase from "@components/commonComp/ButtonBase";
import TallerForm from "@forms/AddTallerForm";
import { usePeriodo } from "@hooks/usePeriodo.js";

export default function MostrarTalleres() {
  const { talleres, talleresActivos, refreshData, lastUpdated, loading } = useTalleres();
  const [mostrarSoloActivos, setMostrarSoloActivos] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [setTallerSeleccionado] = useState(null);
    const [filtroPeriodo, setFiltroPeriodo] = useState(""); 

  if (loading) return <p className="text-gray-500">Cargando talleres...</p>;

  const talleresFiltrados = mostrarSoloActivos ? talleresActivos : talleres;
  const handleCerrarForm = () => {
    setOpenForm(false);}

  return (
    <div className="min-h-screen p-6 bg-amber-50">
      {/* Título y botones */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-amber-700">Talleres Disponibles</h1>
          <p className="text-sm text-gray-500">
            Actualizado: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Nunca"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ButtonBase color="amber" onClick={refreshData}>Actualizar</ButtonBase>

          <ButtonBase
            variant="outlined"
            color="amber"
            onClick={() => setMostrarSoloActivos(!mostrarSoloActivos)}
          >
            {mostrarSoloActivos ? "Mostrar todos" : "Solo activos"}
          </ButtonBase>

          <ButtonBase
            color="amber"
            onClick={() => setOpenForm(true)}
          >
            + Crear Taller
          </ButtonBase>
        </div>
      </div>

      {/* Estado cuando no hay talleres */}
      {(!talleresFiltrados || talleresFiltrados.length === 0) && (
        <p className="text-center py-8 text-gray-500">
          {mostrarSoloActivos ? "No hay talleres activos en este momento" : "No hay talleres disponibles"}
        </p>
      )}

      {/* Lista con paginación */}
      {talleresFiltrados && talleresFiltrados.length > 0 && (
        <List
          items={talleresFiltrados}
          itemsPerPage={6}
          renderItem={(taller) => (
            <TallerCard
              key={taller.id}
              taller={taller}
              onEditar={() => {
                setTallerSeleccionado(taller);
                setOpenForm(true);
              }}
            />
          )}
        />
      )}

   <Dialog open={openForm} onClose={handleCerrarForm} maxWidth="sm" fullWidth>
      <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
        Crear Taller
      </DialogTitle>
      <DialogContent dividers>
        <TallerForm onSuccess={handleCerrarForm} />
      </DialogContent>
      <DialogActions>
        <ButtonBase variant="outlined" color="gray" onClick={handleCerrarForm}>
          Cerrar
        </ButtonBase>
      </DialogActions>
    </Dialog>
    </div>
  );
}