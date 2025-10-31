const EditarTallerForm = ({ formData, onChange, instructores, disabled = false }) => (
  <div className="mb-6 space-y-4 max-w-2xl">
    <div>
      <label className="block mb-1 font-medium">Título del taller</label>
      <input
        type="text"
        name="titulo"
        value={formData.titulo}
        onChange={onChange}
        className="border rounded p-2 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Título del taller"
        disabled={disabled}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Descripción</label>
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={onChange}
        className="border rounded p-2 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        rows={3}
        placeholder="Descripción"
        disabled={disabled}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Fecha y hora</label>
      <input
        type="datetime-local"
        name="fechaHora"
        value={formData.fechaHora}
        onChange={onChange}
        className="border rounded p-2 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={disabled}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Lugar</label>
      <input
        type="text"
        name="lugar"
        value={formData.lugar}
        onChange={onChange}
        className="border rounded p-2 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Lugar"
        disabled={disabled}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Cupo</label>
      <input
        type="number"
        name="cupo"
        value={formData.cupo}
        onChange={onChange}
        className="border rounded p-2 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Cupo"
        min={1}
        disabled={disabled}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Duración (minutos)</label>
      <input
        type="number"
        name="duracionMin"
        value={formData.duracionMin}
        onChange={onChange}
        className="border rounded p-2 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        placeholder="Duración en minutos"
        min={1}
        disabled={disabled}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Instructor</label>
      <select
        name="instructor"
        value={formData.instructor ?? ""}
        onChange={onChange}
        className="border rounded p-2 w-full disabled:bg-gray-100 disabled:cursor-not-allowed"
        required
        disabled={disabled}
      >
        <option value="">Seleccione un instructor</option>
        {instructores.map((inst) => (
          <option key={inst.id} value={inst.id}>
            {inst.nombre} {inst.apellido}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default EditarTallerForm;