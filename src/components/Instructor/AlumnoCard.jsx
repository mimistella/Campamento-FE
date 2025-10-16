import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ButtonBase from "@components/commonComp/ButtonBase";
import LibretaForm from "@forms/LibretaForm";

export default function AlumnoCard({ inscripcion }) {
  const { campista, taller } = inscripcion;
  const [openForm, setOpenForm] = useState(false);

  if (!campista || !taller) return null;

  const handleAbrirForm = (e) => {
    e.stopPropagation();
    setOpenForm(true);
  };

  const handleCerrarForm = () => {
    setOpenForm(false);
    setTimeout(() => document.activeElement?.blur(), 0);
  };

  const tieneNota = inscripcion?.nota != null && inscripcion?.comentario != null;

  return (
    <>
      <li className="bg-white shadow rounded-lg border border-gray-200 p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {campista.nombre} {campista.apellido}
        </h2>
        <p className="text-gray-600 text-sm">
          <strong>Email:</strong> {campista.email}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Taller:</strong> {taller.titulo}
        </p>

        {tieneNota && (
          <div className="mt-2 bg-amber-50 p-2 rounded-md border border-amber-100">
            <p className="text-sm text-gray-700">
              <strong>Nota:</strong> {inscripcion.nota}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Comentario:</strong> {inscripcion.comentario}
            </p>
          </div>
        )}

        <div className="mt-3 flex justify-end">
          <ButtonBase
            variant="contained"
            color="amber"
            onClick={handleAbrirForm}
          >
            {tieneNota ? "Modificar nota" : "Asignar nota"}
          </ButtonBase>
        </div>
      </li>

      {/* Modal del formulario de feedback */}
      <Dialog open={openForm} onClose={handleCerrarForm} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
          Feedback del taller
        </DialogTitle>

        <DialogContent dividers>
          <LibretaForm inscripcion={inscripcion} onClose={handleCerrarForm} />
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