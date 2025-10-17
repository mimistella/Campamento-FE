// components/Admin/deidades/DeidadCard.jsx
import { useState, useContext } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import DeidadesContext from "@context/DeidadesContext.js";

export default function DeidadCard({ deidad, onEditar }) {
  const { deleteDeidad } = useContext(DeidadesContext);
  const [deleting, setDeleting] = useState(false);

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


  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-amber-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-amber-700 mb-1">{deidad.nombre}</h3>
          <p className="text-sm italic text-gray-600">{deidad.lema || "Sin lema"}</p>
        </div>
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