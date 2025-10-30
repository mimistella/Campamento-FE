import { useState, useContext } from "react";
import MisionesContext from "@context/MisionesContext.js";
import { useToaster } from "@hooks/useToaster";
import { handleApiError } from "@components/utilities/HandleApiError";

const AddMisionForm = ({ onClose }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [recompensa, setRecompensa] = useState("");
  const [pista, setPista] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { createMision } = useContext(MisionesContext);
  const { success: toastSuccess, error: toastError } = useToaster();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createMision({
        titulo,
        descripcion,
        recompensa,
        pista,
      });
      toastSuccess("Misión creada exitosamente");
      setTitulo("");
      setDescripcion("");
      setRecompensa("");
      setPista("");
      setFormErrors({});
      onClose();
    } catch (err) {
      const { errorMessage, fieldErrors } = handleApiError(err, "Creando misión");
      toastError(errorMessage);
      setFormErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 sm:p-6 w-full max-w-lg relative shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-amber-700 hover:text-amber-900 text-lg font-bold"
        >
          ✖
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-900">
            ⚔️ Nueva Misión
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Título */}
          <div>
            <label className="block text-amber-900 font-semibold text-sm mb-1">
              Título
            </label>
            <input
              type="text"
              placeholder="El Laberinto del Minotauro"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className={`w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 placeholder-amber-400 focus:outline-none
                 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 
                 ${formErrors?.titulo ? "ring-2 ring-red-400 border-red-400" : ""}`}
              required
            />
            {formErrors?.titulo && (
              <p className="text-sm text-red-600 mt-1">{formErrors.titulo}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-amber-900 font-semibold text-sm mb-1">
              Descripción
            </label>
            <textarea
              placeholder="Detalles de la misión..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="3"
              className={`w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 placeholder-amber-400 focus:outline-none 
                focus:border-amber-500 focus:ring-1 focus:ring-amber-200 resize-none 
                ${formErrors?.descripcion ? "ring-2 ring-red-400 border-red-400" : ""}`}
              required
            ></textarea>
            {formErrors?.descripcion && (
              <p className="text-sm text-red-600 mt-1">{formErrors.descripcion}</p>
            )}
          </div>

          {/* Recompensa y Pista */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-amber-900 font-semibold text-sm mb-1">
                💎 Recompensa
              </label>
              <input
                type="text"
                placeholder="100 dracmas de oro"
                value={recompensa}
                onChange={(e) => setRecompensa(e.target.value)}
                className={`w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 placeholder-amber-400 focus:outline-none 
                  focus:border-amber-500 focus:ring-1 focus:ring-amber-200 
                  ${formErrors?.recompensa ? "ring-2 ring-red-400 border-red-400" : ""}`}
                required
              />
              {formErrors?.recompensa && (
                <p className="text-sm text-red-600 mt-1">{formErrors.recompensa}</p>
              )}
            </div>

            <div>
              <label className="block text-amber-900 font-semibold text-sm mb-1">
                🧭 Pista
              </label>
              <input
                type="text"
                placeholder="Busca en el bosque de pinos"
                value={pista}
                onChange={(e) => setPista(e.target.value)}
                className={`w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 placeholder-amber-400 focus:outline-none 
                  focus:border-amber-500 focus:ring-1 focus:ring-amber-200 
                  ${formErrors?.pista ? "ring-2 ring-red-400 border-red-400" : ""}`}
                required
              />
              {formErrors?.pista && (
                <p className="text-sm text-red-600 mt-1">{formErrors.pista}</p>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-2.5 px-4 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Guardando...
                </span>
              ) : (
                "⚡ Crear"
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-full sm:flex-1 bg-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-400 transition-all disabled:opacity-50 text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMisionForm;
