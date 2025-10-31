import EditarTallerForm from "@forms/EditarTallerForm";
import { useEditarTaller } from "@hooks/useEditarTaller";
import { useNavigate } from "react-router-dom";

const EditarTaller = () => {
  const {
    id,
    formData,
    taller,
    instructores,
    campistasInscriptos,
    handleChange,
    handleSave,
    handleReactivar,
    handleDelete,
    handleEliminarInscripto,
    loading,
    loadingTalleres,
  } = useEditarTaller();

  const navigate = useNavigate();
  if (loadingTalleres) return <p className="p-6 text-gray-500">Cargando taller...</p>;

  if (!taller)
    return (
      <div className="p-6">
        <p className="text-amber-900">No se encontró el taller con ID: {id}</p>
        <button
          onClick={() => navigate("/admin/talleres")}
          className="px-4 py-2 bg-gray-500 text-white rounded mt-4"
        >
          Volver a talleres
        </button>
      </div>
    );

  const estaCancelado = taller.estado?.toLowerCase() === "cancelado";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">
        Editar taller: {taller.titulo}
      </h1>

      {estaCancelado && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700">
           Este taller está cancelado. Reactivalo para poder editarlo.
        </div>
      )}

      <EditarTallerForm
        formData={formData}
        onChange={handleChange}
        instructores={instructores}
        disabled={estaCancelado}
      />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Campistas inscriptos</h2>
        {campistasInscriptos.length === 0 ? (
          <p className="text-gray-500">No hay campistas inscriptos</p>
        ) : (
          <ul className="space-y-2">
            {campistasInscriptos.map((i) => (
              <li
                key={i.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {i.campista?.nombre} {i.campista?.apellido}
                </span>
                <button
                  onClick={() => handleEliminarInscripto(i.id)}
                  className="px-3 py-1 bg-orange-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={loading || estaCancelado}
                >
                  Eliminar inscripción
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-4">
        {estaCancelado ? (
          <>
            <button
              onClick={handleReactivar}
              className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-orange-700"
              disabled={loading}
            >
              {loading ? "Reactivando..." : "Reactivar Taller"}
            </button>
            <button
              onClick={() => navigate("/admin/talleres")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              disabled={loading}
            >
              Volver
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar taller"}
            </button>
            <button
              onClick={() => navigate("/admin/talleres")}
              className="px-4 py-2 bg-amber-400 text-white rounded hover:bg-amber-500"
              disabled={loading}
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditarTaller;