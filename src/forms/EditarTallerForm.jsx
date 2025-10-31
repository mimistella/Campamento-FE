const EditarTallerForm = ({ formData, onChange, instructores }) => (
  <div className="mb-6 space-y-4 max-w-2xl">
    <div>
      <label className="block mb-1 font-medium">Título del taller</label>
      <input
        type="text"
        name="titulo"
        value={formData.titulo}
        onChange={onChange}
        className="border rounded p-2 w-full"
        placeholder="Título del taller"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Descripción</label>
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={onChange}
        className="border rounded p-2 w-full"
        rows={3}
        placeholder="Descripción"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Fecha y hora</label>
      <input
        type="datetime-local"
        name="fechaHora"
        value={formData.fechaHora}
        onChange={onChange}
        className="border rounded p-2 w-full"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Lugar</label>
      <input
        type="text"
        name="lugar"
        value={formData.lugar}
        onChange={onChange}
        className="border rounded p-2 w-full"
        placeholder="Lugar"
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Cupo</label>
      <input
        type="number"
        name="cupo"
        value={formData.cupo}
        onChange={onChange}
        className="border rounded p-2 w-full"
        placeholder="Cupo"
        min={1}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Duración (minutos)</label>
      <input
        type="number"
        name="duracionMin"
        value={formData.duracionMin}
        onChange={onChange}
        className="border rounded p-2 w-full"
        placeholder="Duración en minutos"
        min={1}
      />
    </div>

    <div>
      <label className="block mb-1 font-medium">Instructor</label>
      <select
        name="instructor"
        value={formData.instructor ?? ""}
        onChange={onChange}
        className="border rounded p-2 w-full"
        required
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