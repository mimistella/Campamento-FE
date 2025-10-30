import EditarTallerForm from "@forms/EditarTallerForm";
import { useEditarTaller } from "@hooks/useEditarTaller";

const EditarTaller = () => {
  const {
    id,
    formData,
    taller,
    setTaller,
    instructores,
    campistasInscriptos,
    handleChange,
    handleSave,
    handleDelete,
    handleEliminarInscripto,
    loading,
    loadingTalleres,
    navigate,
  } = useEditarTaller();

  if (loadingTalleres) return <p className="p-6 text-gray-500">Cargando taller...</p>;

  if (!taller)
    return (
      <div className="p-6">
        <p className="text-red-500">No se encontró el taller con ID: {id}</p>
        <button
          onClick={() => navigate("/admin/talleres")}
          className="px-4 py-2 bg-gray-500 text-white rounded mt-4"
        >
          Volver a talleres
        </button>
      </div>
    );

  const estaCancelado = taller.estado?.toLowerCase() === "cancelado";

  const handleReactivar = async () => {
    try {
      const actualizado = { ...formData, estado: "abierto" };
      setTaller({ ...taller, estado: "abierto" });
      await handleSave(actualizado); // reusa el mismo método que guarda
    } catch (err) {
      console.error("Error reactivando taller:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">
        Editar taller: {taller.titulo}
      </h1>

      <EditarTallerForm
        formData={formData}
        onChange={handleChange}
        instructores={instructores}
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
                  className="px-3 py-1 bg-orange-500 text-white rounded"
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
              className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
              disabled
            >
              Taller cancelado
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
              disabled
            >
              No editable
            </button>
            <button
              onClick={handleReactivar}
              className="px-3 py-1 bg-amber-500 text-white rounded"
              disabled={loading}
            >
              Reactivar taller
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-amber-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-orange-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar taller"}
            </button>
            <button
              onClick={() => navigate("/admin/talleres")}
              className="px-4 py-2 bg-amber-400 text-white rounded"
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