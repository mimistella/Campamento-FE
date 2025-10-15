import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInstructor } from "@hooks/useInstructor";
import AlumnoCard from "@components/Instructor/AlumnoCard";
import List from "@components/commonComp/List";

export default function MisAlumnos() {
  const { misTalleres, inscriptos, loading } = useInstructor();
  const [searchParams] = useSearchParams();
  const tallerQuery = searchParams.get("taller");

  const [tallerSeleccionado, setTallerSeleccionado] = useState("todos");


  useEffect(() => {
    if (tallerQuery) {
      setTallerSeleccionado(tallerQuery);
    }
  }, [tallerQuery]);

  const talleresOpciones = useMemo(() => {
    if (!Array.isArray(misTalleres)) return [];
    return misTalleres.map((t) => ({
      id: t.id,
      titulo: t.titulo,
    }));
  }, [misTalleres]);


  const alumnosFiltrados = useMemo(() => {
  if (!Array.isArray(inscriptos) || !Array.isArray(misTalleres)) return [];


  const misTalleresIds = misTalleres.map((t) => t.id);

  if (tallerSeleccionado === "todos") {
    return inscriptos.filter((i) =>
      misTalleresIds.includes(i?.taller?.id)
    );
  }

  return inscriptos.filter(
    (i) => i?.taller?.id === parseInt(tallerSeleccionado)
  );
}, [inscriptos, misTalleres, tallerSeleccionado]);

  if (loading)
    return <p className="text-gray-500">Cargando tus alumnos...</p>;

  if (!inscriptos || inscriptos.length === 0)
    return (
      <p className="text-center py-8 text-gray-500">
        No hay alumnos inscriptos en tus talleres todavía.
      </p>
    );

  return (
    <div className="min-h-screen p-6 bg-amber-50">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-amber-700">Mis Alumnos</h1>

        {/* Filtro por taller */}
        <select
          value={tallerSeleccionado}
          onChange={(e) => setTallerSeleccionado(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="todos">Todos los talleres</option>
          {talleresOpciones.map((t) => (
            <option key={t.id} value={t.id}>
              {t.titulo}
            </option>
          ))}
        </select>
      </div>

      {/* Lista paginada */}
      <List
        items={alumnosFiltrados}
        itemsPerPage={6}
        renderItem={(inscripcion) => (
          <AlumnoCard key={inscripcion.id} inscripcion={inscripcion} />
        )}
      />
    </div>
  );
}