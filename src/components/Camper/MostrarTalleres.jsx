import List from "@components/commonComp/List";
import TallerCard from "./TallerCard";
import { useInscripcionTalleres } from "@hooks/useInscripcionTalleres";

export default function MostrarTalleres() {
  const {
    talleresDisponibles,
    misTalleres,
    loadingDisponibles,
    loadingMisTalleres,
    inscribir,
    inscribiendo,
    error,
  } = useInscripcionTalleres();

  if (loadingDisponibles || loadingMisTalleres)
    return <p className="text-gray-500 text-center mt-10">Cargando talleres...</p>;

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-amber-50 space-y-10">
      <section>
        <h1 className="text-2xl font-bold text-amber-700 mb-4">Mis Talleres</h1>
        {misTalleres.length === 0 ? (
          <p className="text-gray-500">No estás inscripto a ningún taller aún.</p>
        ) : (
          <List
            items={misTalleres}
            itemsPerPage={6}
            renderItem={(taller) => (
              <TallerCard
                key={taller.id}
                taller={taller}
                inscribir={inscribir}
                misTalleres={misTalleres}
                inscribiendo={inscribiendo}
              />
            )}
          />
        )}
      </section>

      <section>
        <h1 className="text-2xl font-bold text-amber-700 mb-4">Talleres Disponibles</h1>
        {talleresDisponibles.filter(td => 
          !misTalleres.some(mt => mt.taller?.id === td.id || mt.id === td.id)
        ).length === 0 ? (
          <p className="text-gray-500">
            No hay talleres disponibles para este período o ya estás inscripto a ellos.
          </p>
        ) : (
          <List
            items={talleresDisponibles.filter(td => 
              !misTalleres.some(mt => mt.taller?.id === td.id || mt.id === td.id)
            )}
            itemsPerPage={6}
            renderItem={(taller) => (
              <TallerCard
                key={taller.id}
                taller={taller}
                inscribir={inscribir}
                misTalleres={misTalleres}
                inscribiendo={inscribiendo}
              />
            )}
          />
        )}
      </section>
    </div>
  );
}