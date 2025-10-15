import { useAuth } from "@hooks/useAuth";
import { useInstructor } from "@hooks/useInstructor.js";

export default function InstructorDashboard() {
  const { user } = useAuth();


  const {diasCampamento, loading } = useInstructor();
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
          ¡Hola, {user.nombre||"instructor"}!
        </h1>
            <div className="flex flex-col items-center mb-6">
            <p className="text-3xl font-bold text-center text-amber-700 mb-6">
              ¡Falta poco para nuestro próximo campamento!
            </p>
            <div className="flex items-baseline">
              <p className="text-6xl font-caesar-dressing-regular text-amber-700 drop-shadow-sm">
                {diasCampamento}
              </p>
              <span className="ml-2 text-lg text-amber-800 font-bold">
                días
              </span>
            </div>
          </div>
          </div>
    </div>
  );
}