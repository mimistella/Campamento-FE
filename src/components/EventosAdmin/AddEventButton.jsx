import { useState } from "react";
import { AddEventForm } from "./AddEventForm.jsx";
import AddButton from "../UICommons/AddButton.jsx";

export const AddEventButton = () => {
  const [open, setOpen] = useState(false);

  function HandleOnClick(){
    setOpen(true);
  }

  return (
    <div>

      {/* Botón que abre el modal */}
      <AddButton onClick={HandleOnClick} text="Agregar Evento"/>



      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-xl shadow-lg w-11/12 max-w-md relative">
            
            {/* Botón cerrar (esquina) */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Formulario como componente */}
            <AddEventForm onClose={() => setOpen(false)}/>
          </div>
        </div>
      )}
    </div>
  );
};
