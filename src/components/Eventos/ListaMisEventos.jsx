import { useEffect } from 'react';
import { useEventos } from '../../hooks/useEventos.js';

export const ListaMisEventos = ({ onCancel }) => {
  const { solicitudes, fetchSolicitudes } = useEventos();

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-40 bg-black/30 p-4">
      <div className="bg-amber-100 rounded-2xl shadow-xl w-full max-w-3xl h-auto max-h-[80vh] overflow-y-auto p-8 flex flex-col">
        <h2 className="text-3xl font-bold text-amber-800 text-center mb-4">Mis Eventos</h2>
        <p className="text-amber-900 text-center mb-6">
          Aquí puedes ver y gestionar los eventos a los que estás inscripto.
        </p>

        {solicitudes.length > 0 ? (
          <ul className="space-y-4">
            {solicitudes.map((solicitud) => (
              <li
                key={solicitud.id}
                className="bg-amber-200/70 hover:bg-amber-300 transition-all duration-300 rounded-xl p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <strong className="text-amber-900 text-lg">{solicitud.evento.titulo}</strong>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      solicitud.estado === "pendiente"
                        ? "bg-yellow-300 text-yellow-900"
                        : solicitud.estado === "aceptada"
                        ? "bg-green-300 text-green-900"
                        : "bg-red-300 text-red-900"
                    }`}
                  >
                    {solicitud.estado}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-amber-800 font-semibold text-center mt-6">
            No estás inscripto a ningún evento.
          </p>
        )}

        <button
          className="mt-6 self-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors"
          onClick={onCancel}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
