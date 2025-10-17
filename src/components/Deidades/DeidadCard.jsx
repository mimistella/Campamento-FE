// components/Admin/deidades/DeidadCard.jsx
import { useState, useContext } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import DeidadesContext from "@context/DeidadesContext.js";

export default function DeidadCard({ deidad, onEditar }) {
  const { deleteDeidad, toggleActivo } = useContext(DeidadesContext);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar la deidad ${deidad.nombre}?`)) return;

    setDeleting(true);
    try {
      await deleteDeidad(deidad.id);
    } catch (error) {
      alert("Error al eliminar la deidad");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleActivo = async () => {
    setToggling(true);
    try {
      await toggleActivo(deidad.id);
    } catch (error) {
      alert("Error al cambiar estado");
      console.error(error);
    } finally {
      setToggling(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-amber-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-amber-700 mb-1">{deidad.nombre}</h3>
          <p className="text-sm text-gray-600">{deidad.dominio || "Sin dominio"}</p>
        </div>

        <button
          onClick={handleToggleActivo}
          disabled={toggling}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
            deidad.activo
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-red-100 text-red-800 hover:bg-red-200"
          } disabled:opacity-50`}
        >
          {toggling ? "..." : deidad.activo ? "Activa" : "Inactiva"}
        </button>
      </div>

      {deidad.descripcion && (
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {deidad.descripcion}
        </p>
      )}

      {deidad.simbolos && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Símbolos:</p>
          <p className="text-sm text-gray-700">{deidad.simbolos}</p>
        </div>
      )}

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div className="bg-amber-50 p-2 rounded">
          <p className="text-gray-600 text-xs">Cabañas</p>
          <p className="font-bold text-amber-700">{deidad.cabanias?.length || 0}</p>
        </div>
        <div className="bg-amber-50 p-2 rounded">
          <p className="text-gray-600 text-xs">Campistas</p>
          <p className="font-bold text-amber-700">{deidad.campistas?.length || 0}</p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-2 pt-4 border-t">
        <ButtonBase
          variant="outlined"
          color="amber"
          onClick={() => onEditar(deidad)}
          className="flex-1"
        >
          ✏️ Editar
        </ButtonBase>

        <ButtonBase
          variant="outlined"
          color="red"
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1"
        >
          {deleting ? "Eliminando..." : "🗑️ Eliminar"}
        </ButtonBase>
      </div>
    </div>
  );
}