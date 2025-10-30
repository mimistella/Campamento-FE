import { usePeriodo } from "@hooks/usePeriodo";
import { useState } from "react";
import List from "@components/commonComp/List";
import PeriodoCard from "@components/Admin/periodos/PeriodoAdminCard";
import ButtonBase from "@components/commonComp/ButtonBase";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import PeriodForm from "@forms/PeriodForm";

export default function VerPeriodos() {
  const { periodos, refreshData, loading } = usePeriodo();
  const [openForm, setOpenForm] = useState(false);
  const [selectedPeriodoId, setSelectedPeriodoId] = useState(null);

  if (loading) return <p className="text-gray-500">Cargando Períodos...</p>;

  const handleAbrirForm = (id = null) => {
    setSelectedPeriodoId(id);
    setOpenForm(true);
  };

  const handleCerrarForm = () => {
    setOpenForm(false);
    setSelectedPeriodoId(null);
  };

  const handleSuccess = async () => {
    handleCerrarForm();
    await refreshData();
  };

  return (
    <div className="min-h-screen p-6 bg-amber-50">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h1 className="text-2xl font-bold text-amber-700">Periodos Disponibles</h1>
        <div className="flex flex-wrap gap-2">
          <ButtonBase color="amber" onClick={() => handleAbrirForm()}>
            + Crear nuevo período
          </ButtonBase>
        </div>
      </div>

      {(!periodos || periodos.length === 0) && (
        <p className="text-center py-8 text-gray-500">No hay periodos disponibles</p>
      )}

      {periodos && periodos.length > 0 && (
        <List
          items={periodos}
          itemsPerPage={6}
          renderItem={(periodo) => (
            <PeriodoCard
              key={periodo.id}
              periodo={periodo}
              onEditar={() => handleAbrirForm(periodo.id)}
              onDeleteSuccess={refreshData}
            />
          )}
        />
      )}

      <Dialog open={openForm} onClose={handleCerrarForm} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
          {selectedPeriodoId ? "Editar Período" : "Crear Período"}
        </DialogTitle>
        <DialogContent dividers>
          <PeriodForm periodoId={selectedPeriodoId} onSuccess={handleSuccess} />
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