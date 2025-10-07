import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTalleres } from "@hooks/useTalleres";
import {useDashboard} from "@hooks/useDashboard"

const EditarTaller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    talleres, 
    inscripciones, 
    updateTaller, 
    deleteTaller, 
    refreshData, 
    deleteInscripto,
    loading 
  } = useTalleres();

 const { instructores } = useDashboard(); 

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaHora: "",
    lugar: "",
    instructor: null,
    cupo: 0,
    duracionHoras: 0,
  });

  const taller = Array.isArray(talleres) 
    ? talleres.find((t) => t.id === parseInt(id)) 
    : null;


  const campistasInscriptos = (() => {
    if (!inscripciones) return [];
    if (!Array.isArray(inscripciones)) return [];
    return inscripciones.filter((i) => i && i.taller && i.taller.id === parseInt(id));
  })();

  // Inicializar formData cuando el taller esté disponible
  useEffect(() => {
    if (taller) {
      const fechaHoraCorregida = taller.fechaHora 
        ? taller.fechaHora.replace('Z', '').slice(0, 16)
        : "";
      
      let instructorId = null;
      if (taller.instructor?.nombre && taller.instructor?.apellido) {
      const instructorEncontrado = instructores.find(inst => 
        inst.nombre === taller.instructor.nombre && 
        inst.apellido === taller.instructor.apellido
      );
      instructorId = instructorEncontrado?.id || null;      
    }
      
      setFormData({
        titulo: taller.titulo || "",
        descripcion: taller.descripcion || "",
        fechaHora: fechaHoraCorregida,
        lugar: taller.lugar || "",
        instructor: instructorId, // 🔹 Nunca será null
        cupo: taller.cupo || 0,
        duracionHoras: taller.duracionHoras || 0,
      });
    }
  }, [taller, instructores]);

  
  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Cargando taller...</p>
      </div>
    );
  }

  if (!taller) {
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
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === "cupo" || name === "duracionHoras" || name === "instructor" 
        ? Number(value) 
        : value 
    }));
  };

  const handleSave = async () => {
    try {

      if (!formData.instructor) {
        alert("Debe seleccionar un instructor");
        return;
      }
      const dataParaEnviar = {
        ...formData,
        fechaHora: formData.fechaHora ? `${formData.fechaHora}:00.000Z` : null,
        instructor: formData.instructor
      };
      
      await updateTaller(taller.id, dataParaEnviar);
      await refreshData();
      navigate("/admin/talleres");
    } catch (err) {
      console.error("Error actualizando taller:", err);
      alert("Error al actualizar el taller");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este taller?")) {
      try {
        await deleteTaller(taller.id);
        await refreshData();
        navigate("/admin/talleres");
      } catch (err) {
        console.error("Error eliminando taller:", err);
        alert("Error al eliminar el taller");
      }
    }
  };

  const handleEliminarInscripto = async (inscripcionId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta inscripción?")) {
      try {
        await deleteInscripto(inscripcionId);
        await refreshData();
      } catch (err) {
        console.error("Error eliminando inscripción:", err);
        alert("Error al eliminar la inscripción");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-amber-700 mb-4">
        Editar taller: {taller.titulo}
      </h1>

      {/* Formulario de edición */}
      <div className="mb-6 space-y-3 max-w-2xl">
         <label className="block text-sm font-medium text-gray-700 mb-1">
            Titulo del taller *
          </label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
         <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción *
          </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          rows={3}
        />
         <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha y hora del taller *
          </label>
        <input
          type="datetime-local"
          name="fechaHora"
          value={formData.fechaHora}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
         <label className="block text-sm font-medium text-gray-700 mb-1">
            Lugar del taller *
          </label>
        <input
          type="text"
          name="lugar"
          value={formData.lugar}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Lugar"
        />
         <label className="block text-sm font-medium text-gray-700 mb-1">
            Cupo del taller *
          </label>
        <input
          type="number"
          name="cupo"
          value={formData.cupo}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Cupo"
          min={1}
        />
         <label className="block text-sm font-medium text-gray-700 mb-1">
            Duración estimada del taller en horas: *
          </label>
        <input
          type="number"
          name="duracionHoras"
          value={formData.duracionHoras}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder="Duración en horas"
          min={1}
        />
         {/* select instructor */}
        <select
          name="instructor"
          value={formData.instructor || ""}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        >
          <option value="">Seleccione un instructor</option>
          {Array.isArray(instructores) && instructores.map((instructor) => (
            <option key={instructor.id} value={instructor.id}>
              {instructor.nombre} {instructor.apellido}
            </option>
          ))}
        </select>
      </div>

      {/* Campistas inscritos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Campistas inscriptos</h2>
        {campistasInscriptos.length === 0 ? (
          <p className="text-gray-500">No hay campistas inscriptos en este taller</p>
        ) : (
          <ul className="space-y-2">
            {campistasInscriptos.map((inscripcion) => (
              <li key={inscripcion.id} className="flex justify-between items-center border p-2 rounded">
                <span>
                  {inscripcion.campista?.nombre} {inscripcion.campista?.apellido}
                </span>
                <button
                  onClick={() => handleEliminarInscripto(inscripcion.id)}
                  className="px-3 py-1 bg-orange-500 text-white rounded"
                >
                  Eliminar inscripción
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Acciones */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-amber-500 text-white rounded"
        >
          Guardar cambios
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-orange-600 text-white rounded"
        >
          Eliminar taller
        </button>
        <button
          onClick={() => navigate("/admin/talleres")}
          className="px-4 py-2 bg-amber-400 text-white rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditarTaller;