import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo";
import { useAuth } from "@hooks/useAuth";

export default function CampistaDashboard() {
  const { user } = useAuth();
  const { inscripcion, diasRestantes, loading } = useInscripcionPeriodo();

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold text-center mb-6">
        ¡Hola, {user.email || "campista"}! 
      </h1>

      {inscripcion ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Días que faltan para mi campamento:
          </h2>
          <p className="text-5xl font-bold text-amber-600 mb-4">
            {diasRestantes}
          </p>
          <p className="text-gray-700">
            ¡Por favor no olvides revisar los <strong>talleres disponibles</strong> antes de que termine la cuenta regresiva!
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            Parece que no estás inscripto aún 
          </p>
          <p className="text-gray-600">
            Por favor dirígete al apartado <strong>Campamento</strong> e inscríbete a un período para unirte a nosotros.
            <br />
            No olvides completar la información adicional en tu perfil, ¡queremos conocerte más! 
          </p>
        </div>
      )}
    </div>
  );
}