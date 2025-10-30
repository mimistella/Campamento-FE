const EditarTallerForm = ({ formData, onChange, instructores }) => (
  <div className="mb-6 space-y-3 max-w-2xl">
    <input
      type="text"
      name="titulo"
      value={formData.titulo}
      onChange={onChange}
      className="border rounded p-2 w-full"
      placeholder="Título del taller"
    />
    <textarea
      name="descripcion"
      value={formData.descripcion}
      onChange={onChange}
      className="border rounded p-2 w-full"
      rows={3}
      placeholder="Descripción"
    />
    <input
      type="datetime-local"
      name="fechaHora"
      value={formData.fechaHora}
      onChange={onChange}
      className="border rounded p-2 w-full"
    />
    <input
      type="text"
      name="lugar"
      value={formData.lugar}
      onChange={onChange}
      className="border rounded p-2 w-full"
      placeholder="Lugar"
    />
    <input
      type="number"
      name="cupo"
      value={formData.cupo}
      onChange={onChange}
      className="border rounded p-2 w-full"
      placeholder="Cupo"
      min={1}
    />
    <input
      type="number"
      name="duracionMin"
      value={formData.duracionMin}
      onChange={onChange}
      className="border rounded p-2 w-full"
      placeholder="Duración en minutos"
      min={1}
    />
    <select
      name="instructor"
      value={formData.instructor || ""}
      onChange={onChange}
      className="border rounded p-2 w-full"
      required
    >
      <option value="">Seleccione un instructor</option>
      {Array.isArray(instructores) &&
        instructores.map((inst) => (
          <option key={inst.id} value={inst.id}>
            {inst.nombre} {inst.apellido}
          </option>
        ))}
    </select>
  </div>
);

export default EditarTallerForm;