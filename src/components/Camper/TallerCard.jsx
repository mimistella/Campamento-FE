import { useState } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import { MousePointerIcon } from "lucide-react";
import { useToaster } from "@hooks/useToaster";

export default function TallerCard({ taller, inscribir, misTalleres, inscribiendo }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toast = useToaster();

  const realTaller = taller.taller ? taller.taller : taller;
  const yaInscripto = misTalleres.some(t => t.taller?.id === realTaller.id || t.id === realTaller.id);

  const handleInscribirse = async (e) => {
    e?.stopPropagation();
    if (yaInscripto) return;

    const loadingId = toast.loading("Inscribiéndote al taller...");

    try {
      await inscribir(realTaller.id);
      toast.dismiss(loadingId);
      toast.success(` Inscripción exitosa a "${realTaller.titulo}".`);
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingId);
      toast.error(" Error al inscribirse. Intenta nuevamente.");
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  if (!realTaller) return null;

  return (
    <>
      {/* Card */}
      <li
        className="p-4 bg-white rounded-lg shadow border border-gray-200 cursor-pointer transition-all duration-300 flex flex-col sm:flex-row justify-between items-start gap-2"
        onClick={window.innerWidth < 640 ? toggleModal : () => setIsExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800">{realTaller.titulo}</h2>
          <p className="text-gray-500 text-sm">{new Date(realTaller.fechaHora).toLocaleString("es-AR")}</p>

          {/* Desktop expanded */}
          {isExpanded && (
            <div className="mt-2 space-y-1 text-gray-600 text-sm">
              <p>{realTaller.descripcion}</p>
              <p><strong>Lugar:</strong> {realTaller.lugar}</p>
              {realTaller.instructor && (
                <p><strong>Instructor:</strong> {realTaller.instructor.nombre ?? realTaller.instructor} {realTaller.instructor.apellido ?? ""}</p>
              )}
              <p><strong>Duración:</strong> {realTaller.duracionHoras} hora{realTaller.duracionHoras !== 1 ? "s" : ""}</p>
            </div>
          )}
        </div>

        {/* Botón inscripción desktop */}
        {window.innerWidth >= 640 && (
          <div className="mt-2 sm:mt-0 sm:ml-4">
            <ButtonBase
              variant="contained"
              color="amber"
              disabled={yaInscripto || inscribiendo}
              onClick={handleInscribirse}
            >
              {yaInscripto ? "Ya inscripto" : inscribiendo ? "Inscribiendo..." : "Inscribirse"}
            </ButtonBase>
          </div>
        )}

        {/* Indicador expand */}
        {window.innerWidth >= 640 && (
          <div className="text-gray-400 text-sm ml-2">{isExpanded ? "▲" : "▼"}</div>
        )}

        {/* Mensaje de "clic para ver más detalles" */}
        {!isExpanded && window.innerWidth >= 640 && (
          <div className="text-xs text-gray-400 mt-2 flex items-center">
            <MousePointerIcon className="inline h-3 w-3 mr-1" />
            Haz clic para ver más detalles
          </div>
        )}
      </li>


      {/* Modal mobile */}
      {showModal && window.innerWidth < 640 && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={toggleModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{realTaller.titulo}</h2>
            <p className="text-gray-600 text-sm mb-1">{new Date(realTaller.fechaHora).toLocaleString("es-AR")}</p>
            <p className="text-gray-600 text-sm mb-1">{realTaller.descripcion}</p>
            <p className="text-gray-600 text-sm mb-1"><strong>Lugar:</strong> {realTaller.lugar}</p>
            {realTaller.instructor && (
              <p className="text-gray-600 text-sm mb-1"><strong>Instructor:</strong> {realTaller.instructor.nombre ?? realTaller.instructor}</p>
            )}
            <p className="text-gray-600 text-sm mb-4"><strong>Duración:</strong> {realTaller.duracionHoras} hora{realTaller.duracionHoras !== 1 ? "s" : ""}</p>
            <ButtonBase
              variant="contained"
              color="amber"
              fullWidth
              disabled={yaInscripto || inscribiendo}
              onClick={handleInscribirse}
            >
              {yaInscripto ? "Ya inscripto" : inscribiendo ? "Inscribiendo..." : "Inscribirse"}
            </ButtonBase>
          </div>
        </div>
      )}
    </>
  );
}