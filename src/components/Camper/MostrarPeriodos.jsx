import {usePeriodo} from "@hooks/usePeriodo"
import List from "@components/commonComp/List";
import PeriodoCard from "@components/Camper/PeriodoCard";
import { useInscripcionPeriodo } from "@hooks/useInscripcionPeriodo.js";

export default function MostrarPeriodos() {
  const { periodos, loading } = usePeriodo();
  const { inscripciones, triggerRefresh } = useInscripcionPeriodo(); 


  if (loading) return <p className="text-gray-500">Cargando Períodos...</p>;
const periodosActivos = periodos;


  return (
    <div className="min-h-screen p-6 bg-amber-50">
      {/* Título y botones */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-amber-700">Periodos Disponibles</h1>

        </div>
      </div>

      {/* Estado cuando no hay periodos */}
      {(!periodosActivos || periodosActivos.length === 0) && (
        <p className="text-center py-8 text-gray-500">
         "No hay periodos disponibles"
        </p>
      )}

      {/* Lista con paginación */}
      {periodosActivos && periodosActivos.length > 0 && (
        <List
          items={periodosActivos}
          itemsPerPage={6}
          renderItem={(periodo) => (
            <PeriodoCard
              key={periodo.id}
              periodo={periodo}
              inscripcionesUsuario={inscripciones}
               onRefetch={() => {
                triggerRefresh(); 
      }}
             
            />
          )}
        />
      )}


    </div>
  );
}