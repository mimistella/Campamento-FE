import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo";
import { useAuth } from "@hooks/useAuth";

export default function InstructorDashboard() {
  const { user } = useAuth();

  const {diasRestantes, loading } = useInscripcionPeriodo();
  if (loading) {
    return (
      <div className="min-h-screen bg-amber-200 flex items-center justify-center">
        <p className="text-orange-600 font-semibold text-lg animate-pulse">
          Cargando tu información...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-200 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-3xl p-8 border border-amber-300">
        <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
          ¡Hola, {user.nombre}!
        </h1>
            <div className="flex justify-center items-center mb-6">
              <p className="text-6xl font-caesar-dressing-regular text-orange-500 drop-shadow-sm">
                {diasRestantes}
              </p>
              <span className="ml-2 text-lg text-amber-800 font-semibold">
                días
              </span>
            </div>
          </div>
    </div>
  );
}