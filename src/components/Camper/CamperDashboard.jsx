import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo";
import { useAuth } from "@hooks/useAuth";

export default function CampistaDashboard() {
  const { user } = useAuth();
  const { inscripciones, diasRestantes, loading } = useInscripcionPeriodo();

  const tieneDatosCompletos = Boolean(
    user?.nombre && user?.apellido && user?.telefono && user?.grupoSanguineo
  );

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
          ¡Hola, {user.nombre || "campista"}!
        </h1>

        {/*Está inscripto */}
        {inscripciones.lengt > 0 ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-amber-800 mb-3">
              Días que faltan para mi campamento
            </h2>

            <div className="flex justify-center items-center mb-6">
              <p className="text-6xl font-caesar-dressing-regular text-orange-500 drop-shadow-sm">
                {diasRestantes}
              </p>
              <span className="ml-2 text-lg text-amber-800 font-semibold">
                días
              </span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              ¡Ya estás inscripto! Antes de que termine el contador recordá decirnos quien es tu padre divino e inscribite a nuestros Talleres. 
            </p>
          </div>
        ) : (

          <div className="text-center">
            {!tieneDatosCompletos ? (
              <p className="text-gray-700 leading-relaxed">
                Por favor dirígete a la sección{" "}
                <strong className="text-orange-600">Mi Perfil</strong> y completa tu
                información personal antes de continuar ¡Queremos conocerte!.
              </p>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                Ya completaste tus datos personales. Ahora puedes seleccionar el{" "}
                <strong className="text-orange-600">período</strong> al que deseas
                asistir para unirte al campamento. 
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}