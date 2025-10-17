import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ButtonBase from "@components/commonComp/ButtonBase";
import { MousePointerIcon } from "lucide-react";
import PeriodForm from "@forms/PeriodForm";

export default function PeriodoAdminCard({ periodo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleAbrirForm = (e) => {
    e.stopPropagation();
    setOpenForm(true);
  };

  const handleCerrarForm = () => {
    setOpenForm(false);
  };

  if (!periodo || !periodo.id) {
    return (
      <li className="p-4 bg-red-100 rounded-lg border border-red-400 text-red-700">
        Período inválido o no disponible
      </li>
    );
  }

  return (
    <>
      <li
        className={`p-4 bg-white rounded-lg shadow border border-gray-200 cursor-pointer transition-all duration-300 ${
          isExpanded ? "ring-2 ring-amber-500" : "hover:shadow-md"
        }`}
        onClick={toggleExpand}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">{periodo.nombre}</h2>
            {isExpanded && (
              <div className="mt-2 text-gray-600 text-sm space-y-1">
                <p>{periodo.descripcion}</p>
                <p><strong>Estado:</strong> {periodo.estado}</p>
                <p><strong>Inicio inscripción:</strong> {new Date(periodo.fechaInicioInsc).toLocaleDateString("es-AR")}</p>
                <p><strong>Fin inscripción:</strong> {new Date(periodo.fechaFinInsc).toLocaleDateString("es-AR")}</p>
                <p><strong>Inicio del campamento:</strong> {new Date(periodo.fechaInicioPer).toLocaleDateString("es-AR")}</p>
                <p><strong>Fin del campamento:</strong> {new Date(periodo.fechaFinPer).toLocaleDateString("es-AR")}</p>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-400 ml-2">{isExpanded ? "▲" : "▼"}</div>
        </div>

        {isExpanded && (
          <div className="mt-3 flex justify-end">
            <ButtonBase variant="contained" color="amber" onClick={handleAbrirForm}>
              Editar
            </ButtonBase>
          </div>
        )}

        {!isExpanded && (
          <div className="text-xs text-gray-400 mt-2 flex items-center">
            <MousePointerIcon className="inline h-3 w-3 mr-1" />
            Haz clic para ver más detalles
          </div>
        )}
      </li>

      <Dialog open={openForm} onClose={handleCerrarForm} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
          Editar período: {periodo.nombre}
        </DialogTitle>
        <DialogContent dividers>
          <PeriodForm periodoId={periodo.id} onSuccess={handleCerrarForm} />
        </DialogContent>
        <DialogActions>
          <ButtonBase variant="outlined" color="gray" onClick={handleCerrarForm}>
            Cerrar
          </ButtonBase>
        </DialogActions>
      </Dialog>
    </>
  );
}