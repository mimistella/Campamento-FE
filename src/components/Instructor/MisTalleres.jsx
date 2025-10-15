import { useInstructor } from "@hooks/useInstructor";
import List from "@components/commonComp/List";
import TallerCardInstructor from "@components/Instructor/TallerCardInstructor";

export default function MostrarMisTalleres() {
  const { misTalleres, inscriptos, loading } = useInstructor();

  

  if (loading) return <p className="text-gray-500">Cargando tus talleres...</p>;

  if (!misTalleres || misTalleres.length === 0)
    return <p className="text-center py-8 text-gray-500">No tienes talleres asignados.</p>;

  return (
    <div className="min-h-screen p-6 bg-amber-50">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h1 className="text-2xl font-bold text-amber-700">Mis Talleres</h1>
      </div>

      <List
        items={misTalleres}
        itemsPerPage={6}
        renderItem={(taller) => {
          const cantidadInscriptos = Array.isArray(inscriptos)
  ? inscriptos.filter((i) => i?.taller?.id === parseInt(taller.id)).length
  : 0;
          return <TallerCardInstructor key={taller.id} taller={taller} cantidadInscriptos={cantidadInscriptos} />;
        }}
      />
    </div>
  );
}