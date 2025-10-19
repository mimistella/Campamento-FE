import { useEffect } from "react";
import { useContext } from "react";
import EventosContext from "@context/EventosContext.js";

const SolicitudesList = ({onClose}) => {
	const {solicitudes, fetchSolicitudes, updateSolicitud} = useContext(EventosContext);
  useEffect(() => {
    fetchSolicitudes()
  }, [fetchSolicitudes]);

  const handleAccion = async (solicitud, nuevoEstado) => {
    try {
			console.log(solicitud.campista.id)
      await updateSolicitud(solicitud.id, {
				...solicitud,
				campista:solicitud.campista.id,
				evento:solicitud.evento.id,
				 estado:nuevoEstado,
			});
    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-11/12 max-w-3xl p-6 relative overflow-hidden">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ✖
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Solicitudes de Eventos
        </h2>

        {/* Lista */}
        {solicitudes.length > 0 ? (
          <ul className="divide-y divide-amber-200 max-h-[400px] overflow-y-auto pr-1">
            {solicitudes.map((solicitud) => (
              <li
                key={solicitud.id}
                className="py-3 px-2 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-amber-50 rounded-md transition"
              >
                {/* Información */}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-amber-950">
                    {solicitud.evento?.titulo || "Evento sin título"}
                  </p>
                  <p className="text-sm text-gray-700 italic">
                    {solicitud.descripcion || "Sin descripción"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Solicitado por:{" "}
                    <span className="font-medium">
                      {solicitud.campista?.nombre} {solicitud.campista?.apellido}
                    </span>
                  </p>
                </div>

                {/* Estado y acciones */}
                <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold text-center ${
                      solicitud.estado === "pendiente"
                        ? "bg-amber-100 text-amber-800"
                        : solicitud.estado === "aprobada"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {solicitud.estado}
                  </span>

                  {solicitud.estado === "pendiente" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccion(solicitud, "aceptado")}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleAccion(solicitud, "rechazado")}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No hay solicitudes por el momento.
          </p>
        )}
      </div>
    </div>
  );
};

export default SolicitudesList;
