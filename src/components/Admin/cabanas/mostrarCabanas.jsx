import { useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DashboardContext from "@context/DashboardContext";
import CabaniaForm from "@forms/AddCabaniaForm";
import List from "@components/commonComp/List";
import CabaniaCard from "@components/Admin/cabanas/CabaniaCard";
import ButtonBase from "@components/commonComp/ButtonBase";

export default function MostrarCabanas() {
  const { cabanias, cabaniasActivas, getOcupacion, refreshData, lastUpdated, loading } =
    useContext(DashboardContext);

  const [mostrarSoloActivas, setMostrarSoloActivas] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);

  if (loading) return <p>Cargando cabañas...</p>;

  const cabaniasFiltradas = mostrarSoloActivas ? cabaniasActivas : cabanias;

  return (
    <div className="min-h-screen p-6 bg-amber-50">
      {/* El titulo */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-amber-700">Cabañas del campamento</h1>
          <p className="text-sm text-gray-500">
            Actualizado:{" "}
            {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Nunca"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ButtonBase color="amber" onClick={refreshData}>
            Actualizar
          </ButtonBase>

          <ButtonBase
            variant="outlined"
            color="amber"
            onClick={() => setMostrarSoloActivas(!mostrarSoloActivas)}
          >
            {mostrarSoloActivas ? "Mostrar todas" : "Solo activas"}
          </ButtonBase>

          <ButtonBase color="amber" onClick={() => setOpenCrear(true)}>
            + Crear nueva cabaña
          </ButtonBase>
        </div>
      </div>

      {/* Estado cuando no hay cabañas */}
      {(!cabaniasFiltradas || cabaniasFiltradas.length === 0) && (
        <p className="text-center py-8 text-gray-500">
          {mostrarSoloActivas
            ? "No hay cabañas activas en este momento"
            : "No hay cabañas disponibles"}
        </p>
      )}

      {/* Lista con paginación */}
      {cabaniasFiltradas && cabaniasFiltradas.length > 0 && (
        <List
          items={cabaniasFiltradas}
          itemsPerPage={6}
          renderItem={(cabania) => (
            <CabaniaCard
              key={cabania.id}
              cabania={cabania}
              getOcupacion={getOcupacion}
            />
          )}
        />
      )}

      {/* Dialogo Crear */}
      <Dialog open={openCrear} onClose={() => setOpenCrear(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
          Crear nueva cabaña
        </DialogTitle>
        <DialogContent dividers>
          <CabaniaForm />
        </DialogContent>
        <DialogActions>
          <ButtonBase variant="outlined" color="gray" onClick={() => setOpenCrear(false)}>
            Cerrar
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </div>
  );
}