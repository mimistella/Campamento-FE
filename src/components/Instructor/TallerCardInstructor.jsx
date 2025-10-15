import { useNavigate } from "react-router-dom";
import { MousePointer } from "lucide-react";

export default function TallerCardInstructor({ taller, cantidadInscriptos }) {
  const navigate = useNavigate();

  if (!taller) return null;

  const fecha = new Date(taller.fechaHora).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const duracion =
    taller.duracionMinutos ?? taller.duracionMin ?? taller.duracionHoras ?? 0;

  const handleClick = () => {
    navigate(`/instructor/alumnos?taller=${taller.id}`);
  };

  return (
    <li
      onClick={handleClick}
      className="p-4 bg-white rounded-lg shadow border border-gray-200 flex flex-col gap-2 cursor-pointer hover:shadow-md hover:bg-amber-50 transition-all group relative"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{taller.titulo}</h2>

        {/* Ícono que aparece al hover */}
        <MousePointer
          size={18}
          strokeWidth={1.8}
          className="text-amber-600 opacity-50 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <p className="text-gray-600 text-sm">
        <strong>Fecha:</strong> {fecha}
      </p>

      <p className="text-gray-600 text-sm">
        <strong>Lugar:</strong> {taller.lugar}
      </p>

      <p className="text-gray-600 text-sm">
        <strong>Duración:</strong> {duracion} minuto{duracion !== 1 ? "s" : ""}
      </p>

      <p className="text-gray-600 text-sm">
        <strong>Descripción:</strong> {taller.descripcion}
      </p>

      <p className="text-amber-700 font-semibold">
        Inscriptos: {cantidadInscriptos ?? 0}
      </p>
    </li>
  );
}