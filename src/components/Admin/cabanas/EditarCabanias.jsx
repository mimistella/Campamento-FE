import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useEditarCabania } from "@hooks/useEditarCabania";

const EditarCabania = () => {
  const {
    cabania,
    campistas,
    formData,
    handleChange,
    handleSave,
    handleDelete,
    handleMoverCampista,
    openMover,
    setOpenMover,
    hospedajeSeleccionado,
    setHospedajeSeleccionado,
    nuevaCabaniaId,
    setNuevaCabaniaId,
    loading,
    cabanias,
  } = useEditarCabania();

  if (!cabania) return <p>No se encontró la cabaña</p>;

  const cabaniaEliminada = cabania.cabinStatus === "Inactivo";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">
        Editar cabaña: {cabania.nombre}
      </h1>

      {/* Formulario principal */}
      <div className="mb-6 space-y-4">
        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="border rounded p-2 w-full focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Descripción de la cabaña"
            rows={3}
            aria-label="Descripción de la cabaña"
            disabled={cabaniaEliminada}
          />
        </div>

        <div>
          <label
            htmlFor="capacidad"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Capacidad
          </label>
          <input
            id="capacidad"
            type="number"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            className="border rounded p-2 w-full focus:ring-2 focus:ring-amber-400 focus:outline-none"
            placeholder="Capacidad máxima"
            aria-label="Capacidad de la cabaña"
            disabled={cabaniaEliminada}
          />
        </div>
      </div>

      {/* Lista de campistas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Campistas hospedados</h2>
        {campistas.length === 0 ? (
          <p className="text-gray-500">No hay campistas en esta cabaña</p>
        ) : (
          <ul className="space-y-2">
            {campistas.map((h) => (
              <li
                key={h.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {h.campista.nombre} {h.campista.apellido}
                </span>
                <button
                  onClick={() => {
                    setHospedajeSeleccionado(h);
                    setOpenMover(true);
                  }}
                  className="px-3 py-1 bg-amber-400 text-white rounded hover:bg-amber-500 transition"
                  disabled={cabaniaEliminada}
                >
                  Mover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded text-white transition ${
            cabaniaEliminada
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
          disabled={cabaniaEliminada}
        >
          {cabaniaEliminada ? "No editable" : "Guardar cambios"}
        </button>

        <button
          onClick={handleDelete}
          className={`px-4 py-2 rounded text-white transition ${
            cabaniaEliminada
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-800 hover:bg-orange-900"
          }`}
          disabled={cabaniaEliminada}
        >
          {cabaniaEliminada ? "Cabaña eliminada" : "Eliminar cabaña"}
        </button>
      </div>

      {/* Dialogo para mover campista */}
      <Dialog
        open={openMover}
        onClose={() => setOpenMover(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Mover campista</DialogTitle>
        <DialogContent dividers>
          <p className="mb-3">
            Seleccioná una nueva cabaña para{" "}
            <strong>
              {hospedajeSeleccionado?.campista?.nombre}{" "}
              {hospedajeSeleccionado?.campista?.apellido}
            </strong>
          </p>

          <label
            htmlFor="nuevaCabania"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nueva cabaña
          </label>
          <select
            id="nuevaCabania"
            value={nuevaCabaniaId}
            onChange={(e) => setNuevaCabaniaId(e.target.value)}
            className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <option value="">-- Seleccionar cabaña --</option>
            {cabanias
              .filter((c) => c.id !== hospedajeSeleccionado?.cabania?.id)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} (capacidad: {c.capacidad})
                </option>
              ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMover(false)} color="error">
            Cancelar
          </Button>
          <Button
            onClick={handleMoverCampista}
            disabled={!nuevaCabaniaId || loading}
            className="!px-4 py-2 !bg-amber-400 !text-white rounded"
            variant="contained"
          >
            {loading ? "Moviendo..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditarCabania;