import { useContext, useEffect, useState } from "react";
import MisionesContext from "@context/MisionesContext.js";

const ListaMisionesAsignadas = () => {
  const { asignadas, fetchAsignadas, updateAsignada } =
    useContext(MisionesContext);

  const [menuActivo, setMenuActivo] = useState(null); // ID del menú abierto

  useEffect(() => {
    fetchAsignadas();
  }, [fetchAsignadas]);

  const handleEstadoChange = async (asigna, nuevoEstado) => {
    try {
      await updateAsignada(asigna.id, {
         ...asigna ,
         campista: asigna.campista.id,
         mision: asigna.mision.id,
         periodo: asigna.periodo.id,
         estado: nuevoEstado, });
      setMenuActivo(null);
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  return (
    <div className="inset-0 bg-white shadow-md border-2 p-4 rounded-lg">
      <h1 className="text-2xl font-bold p-4 text-amber-900">
        Lista de Misiones Asignadas
      </h1>

      <ul className="space-y-3">
        {asignadas.map((asigna) => (
          <li
            key={asigna.id}
            className="relative flex justify-between items-center p-3 bg-amber-100 border-1 border-amber-900 rounded-md hover:bg-amber-200 transition"
          >
            <p className="text-amber-950 font-semibold">
              {asigna.mision.titulo} — {asigna.campista.nombre}{" "}
              {asigna.campista.apellido} —{" "}
              <span
                className={`${
                  asigna.estado === "completada"
                    ? "text-green-700 font-bold"
                    : asigna.estado === "asignada" 
                    ? "text-amber-800"
                    : "text-red-700 font-bold"
                }`}
              >
                {asigna.estado}
              </span>
            </p>

            {/* Botón menú */}
            <button
              onClick={() =>
                setMenuActivo(menuActivo === asigna.id ? null : asigna.id)
              }
              className="text-amber-900 hover:text-amber-700 text-lg font-bold px-2"
            >
              ⋮
            </button>

            {/* Menú desplegable */}
            {menuActivo === asigna.id && (
              <div className="absolute right-2 top-10 bg-white border border-amber-200 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-amber-900">
                  <li>
                    <button
                      onClick={() =>
                        handleEstadoChange(asigna, "asignada")
                      }
                      className="block px-4 py-2 w-full text-left hover:bg-amber-100"
                    >
                      Asignada
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        handleEstadoChange(asigna, "completada")
                      }
                      className="block px-4 py-2 w-full text-left hover:bg-amber-100"
                    >
                      Completada
                    </button>
                    <button
                      onClick={() =>
                        handleEstadoChange(asigna, "fallida")
                      }
                      className="block px-4 py-2 w-full text-left hover:bg-amber-100"
                    >
                      Fallida
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaMisionesAsignadas;
