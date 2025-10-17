import { useState, useContext } from "react";
import EventosContext from "../../context/EventosContext.js";

export function EditEventForm({ event, onFinished }) {
  const [titulo, setTitulo] = useState(event.titulo);
  const [fechahora, setFechahora] = useState(event.fechahora);
  const [descripcion, setDescripcion] = useState(event.descripcion);
  const [lugar, setLugar] = useState(event.lugar);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { updateEvento } = useContext(EventosContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedEvent = {
      ...event,
      titulo,
      fechahora,
      descripcion,
      lugar,
      periodo: event.periodo.id,
    };

    try {
      await updateEvento(event.id, updatedEvent);
      onFinished();
    } catch (err) {
      console.error("❌ Error editando evento:", err.response?.data || err.message);
      setError("No se pudo actualizar el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 sm:p-6 w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-900">
          ✏️ Editar Evento
        </h2>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Título */}
        <div>
          <label className="block text-amber-900 font-semibold text-sm mb-1">
            Título
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-amber-900 font-semibold text-sm mb-1">
            Descripción
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="3"
            className="w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200 resize-none"
            required
          ></textarea>
        </div>

        {/* Fecha y Lugar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-amber-900 font-semibold text-sm mb-1">
              📅 Fecha y hora
            </label>
            <input
              type="datetime-local"
              value={fechahora}
              onChange={(e) => setFechahora(e.target.value)}
              className="w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
              required
            />
          </div>

          <div>
            <label className="block text-amber-900 font-semibold text-sm mb-1">
              📍 Lugar
            </label>
            <input
              type="text"
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              className="w-full bg-white/70 border-2 border-amber-300 rounded-lg px-3 py-2 text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200"
              required
            />
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
              "💾 Guardar cambios"
            )}
          </button>

          <button
            type="button"
            onClick={onFinished}
            disabled={loading}
            className="w-full sm:flex-1 bg-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-400 transition-all disabled:opacity-50 text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
