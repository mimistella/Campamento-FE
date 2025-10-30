//import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo";
import { useContext } from "react";
import PeriodosContext from "@context/PeriodosContext.js";
import { useAuth } from "@hooks/useAuth";

export default function CampistaDashboard() {
  const { mydata } = useAuth();
  const { inscripciones, diasRestantes, loading } = useContext(PeriodosContext);

  const tieneDatosCompletos = Boolean(
    mydata?.nombre && mydata?.apellido && mydata?.telefono && mydata?.grupoSanguineo
  );
  
  console.log("mydata en dashboard:", mydata);
  console.log("diasRestantes:", diasRestantes);
  console.log("inscripciones:", inscripciones);
  
  // Determinar el estado del campamento basado en las fechas de inscripción
  const inscripcionActual = inscripciones[0];
  const campamentoComenzo = inscripcionActual?.periodo?.fechaInicioPer 
    ? new Date(inscripcionActual.periodo.fechaInicioPer) <= new Date()
    : false;
  const esDiaInicio = diasRestantes === 0 && !campamentoComenzo;

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
          ¡Hola, {mydata?.nombre || "campista"}!
        </h1>

        {/* Está inscripto */}
        {inscripciones.length > 0 ? (
          <div className="text-center">
            {esDiaInicio ? (
              // Día 0 - Hoy arranca el campamento
              <>
                <h2 className="text-3xl font-bold text-orange-600 mb-4">
                  ¡Hoy arranca el campamento!
                </h2>
                
                <div className="flex justify-center items-center mb-6">
                  <p className="text-7xl font-caesar-dressing-regular text-orange-500 drop-shadow-sm">
                  </p>
                </div>

                <p className="text-xl font-semibold text-amber-800">
                  No te olvides de inscribirte a nuestros eventos y talleres.
                </p>
              </>
            ) : campamentoComenzo ? (
              // Campamento en curso - Mostrar días restantes hasta el fin
              <>
                <h2 className="text-2xl font-bold text-orange-600 mb-4">
                  ¡Ya estamos aquí!
                </h2>
                
                <div className="flex justify-center items-center mb-6">
                  <p className="text-6xl font-caesar-dressing-regular text-orange-500 drop-shadow-sm">
                    {diasRestantes ?? "…"}
                  </p>
                  <span className="ml-2 text-lg text-amber-800 font-semibold">
                    {diasRestantes === 1 ? "día" : "días"}
                  </span>
                </div>

                <p className="text-lg text-amber-800 mb-4">
                  {diasRestantes > 0 
                    ? "para que termine el campamento" 
                    : "¡El campamento ha finalizado!"}
                </p>

                <p className="text-xl font-semibold text-amber-800">
                  No te olvides de inscribirte a nuestros eventos y talleres.
                </p>
              </>
            ) : (
              // Días positivos - Cuenta regresiva
              <>
                <h2 className="text-xl font-semibold text-amber-800 mb-3">
                  Días que faltan para mi campamento
                </h2>

                <div className="flex justify-center items-center mb-6">
                  <p className="text-6xl font-caesar-dressing-regular text-orange-500 drop-shadow-sm">
                    {diasRestantes ?? "…"}
                  </p>
                  <span className="ml-2 text-lg text-amber-800 font-semibold">
                    {diasRestantes === 1 ? "día" : "días"}
                  </span>
                </div>

                <p className="text-xl font-semibold text-amber-800 mb-3">
                  ¡Ya estás inscripto! Antes de que termine el contador, recordá decirnos
                  quién es tu padre divino e inscribirte a nuestros talleres.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="text-center">
            {!tieneDatosCompletos ? (
              <p className="text-amber-700 leading-relaxed">
                Por favor, dirigite a la sección{" "}
                <strong className="text-orange-600">Mi Perfil</strong> y completá tu
                información personal antes de continuar. ¡Queremos conocerte!
              </p>
            ) : (
              <p className="text-amber-800 mb-3">
                Ya completaste tus datos personales. Ahora podés seleccionar el{" "}
                <strong className="text-orange-600">período</strong> al que deseás
                asistir para unirte al campamento.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}