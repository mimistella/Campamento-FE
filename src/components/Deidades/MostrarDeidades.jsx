// components/Admin/deidades/MostrarDeidades.jsx
import { useContext, useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeidadesContext from "@context/DeidadesContext";
import DeidadForm from "./AddDeidadForm";
import List from "@components/commonComp/List";
import DeidadCard from "./DeidadCard";
import ButtonBase from "@components/commonComp/ButtonBase";

export default function MostrarDeidades() {
  const { deidades, fetchDeidades, loading } = useContext(DeidadesContext);

  const [openCrear, setOpenCrear] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [deidadSeleccionada, setDeidadSeleccionada] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    loadDeidades();
  }, []);
  const loadDeidades = async () => {
    await fetchDeidades();
    setLastUpdated(new Date());
  };


  const handleEditar = (deidad) => {
    setDeidadSeleccionada(deidad);
    setOpenEditar(true);
  };

  const handleCerrarEditar = () => {
    setOpenEditar(false);
    setDeidadSeleccionada(null);
  };

  if (loading && !deidades.length) {
    return <p className="text-center py-8">Cargando deidades...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-amber-50">
      {/* Título */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-amber-700">Deidades del Olimpo</h1>
          <p className="text-sm text-gray-500">
            Actualizado:{" "}
            {lastUpdated ? lastUpdated.toLocaleTimeString() : "Nunca"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <ButtonBase color="amber" onClick={loadDeidades} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </ButtonBase>


          <ButtonBase color="amber" onClick={() => setOpenCrear(true)}>
            + Crear nueva deidad
          </ButtonBase>
        </div>
      </div>



      {/* Lista con paginación */}
      {deidades.length > 0 && (
        <List
          items={deidades}
          itemsPerPage={6}
          renderItem={(deidad) => (
            <DeidadCard
              key={deidad.id}
              deidad={deidad}
              onEditar={handleEditar}
            />
          )}
        />
      )}

      {/* Dialog Crear */}
      <Dialog open={openCrear} onClose={() => setOpenCrear(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
          Crear nueva deidad
        </DialogTitle>
        <DialogContent dividers>
          <DeidadForm onSuccess={() => {
            setOpenCrear(false);
            loadDeidades();
          }} />
        </DialogContent>
        <DialogActions>
          <ButtonBase variant="outlined" color="gray" onClick={() => setOpenCrear(false)}>
            Cerrar
          </ButtonBase>
        </DialogActions>
      </Dialog>

      {/* Dialog Editar */}
      <Dialog open={openEditar} onClose={handleCerrarEditar} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
          Editar deidad
        </DialogTitle>
        <DialogContent dividers>
          <DeidadForm
            deidad={deidadSeleccionada}
            isEdit={true}
            onSuccess={() => {
              handleCerrarEditar();
              loadDeidades();
            }}
          />
        </DialogContent>
        <DialogActions>
          <ButtonBase variant="outlined" color="gray" onClick={handleCerrarEditar}>
            Cerrar
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </div>
  );
}