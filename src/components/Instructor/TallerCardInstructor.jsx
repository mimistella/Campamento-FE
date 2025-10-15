export default function TallerCardInstructor({ taller, cantidadInscriptos }) {
  if (!taller) return null;

  const fecha = new Date(taller.fechaHora).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const duracion =
    taller.duracionMinutos ?? taller.duracionMin ?? taller.duracionHoras ?? 0;

  return (
    <li className="p-4 bg-white rounded-lg shadow border border-gray-200 flex flex-col gap-2">
      <h2 className="text-xl font-semibold text-gray-800">{taller.titulo}</h2>

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