
export default function AlumnoCard({ inscripcion }) {
  const { campista, taller } = inscripcion;
  if (!campista || !taller) return null;

  return (
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
    </li>
  );
}