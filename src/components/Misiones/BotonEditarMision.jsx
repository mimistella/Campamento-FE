import { useState } from "react";
import FormEditarMision from "./FormEditarMision.jsx";

const BotonEditarMision = ({ mision, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ ...mision });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition flex items-center justify-center gap-2"
      >
        ✏️ Editar
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative space-y-4">
            {/* Botón cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-xl font-bold text-center text-gray-800">
              Editar Misión
            </h2>

            {/* Formulario */}
            <FormEditarMision formData={formData} handleChange={handleChange}/>

            {/* Botón guardar */}
            <button
              onClick={handleSave}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              💾 Guardar cambios
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BotonEditarMision;
