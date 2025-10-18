// forms/AddDeidadForm.jsx
import { useState, useContext, useEffect } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import DeidadesContext from "@context/DeidadesContext.js";
import { handleApiError } from "../utilities/handleApiError.js";
import { useToaster } from "../../hooks/useToaster.js";

export default function DeidadForm({ deidad, isEdit = false, onSuccess }) {
  const { createDeidad, updateDeidad } = useContext(DeidadesContext);
  const { error:toastError, success:toastSuccess } = useToaster();
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    lema: "",
    simbolo: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (deidad && isEdit) {
      setFormData({
        nombre: deidad.nombre || "",
        descripcion: deidad.descripcion || "",
        lema: deidad.lema || "",
        simbolo: deidad.simbolo || "",
      });
    }
  }, [deidad, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      toastError("El nombre es obligatorio");
      return;
    }

    setLoading(true);

    try {
      if (isEdit) {
        await updateDeidad(deidad.id, formData);
      } else {
        await createDeidad(formData);
      }

      if (onSuccess){
        onSuccess();
      } 
      toastSuccess(`deidad ${isEdit ? 'actualizada' : 'creada'} con exito`);
    } catch (err) {
      const {errorMessage, fieldErrors} = handleApiError(err, "guardando deidad")
      toastError(errorMessage)
      setFormErrors(fieldErrors);
      console.log(fieldErrors);

    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      {/* {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )} */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Zeus"
          required
          className={`w-full px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            formErrors.nombre ? "ring-2 ring-red-400" : ""
          }`}
        />
        {formErrors.nombre && (
          <p className="text-sm text-red-600 mt-1">{formErrors.nombre}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción <span className="text-red-500">*</span>
        </label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción de la deidad..."
          rows="2"
          className={`w-full px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            formErrors.descripcion ? "ring-2 ring-red-400" : ""
          }`}
        />
        {formErrors.descripcion && (
          <p className="text-sm text-red-600 mt-1">{formErrors.descripcion}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lema <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="lema"
          value={formData.lema}
          onChange={handleChange}
          placeholder="Lema de la deidad..."
          className={`w-full px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            formErrors.lema ? "ring-2 ring-red-400" : ""
          }`}
        />
        {formErrors.lema && (
          <p className="text-sm text-red-600 mt-1">{formErrors.lema}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Símbolo <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="simbolo"
          value={formData.simbolo}
          onChange={handleChange}
          placeholder="Ej: Rayo, águila, roble"
          className={`w-full px-3 py-2 border rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            formErrors.simbolo ? "ring-2 ring-red-400" : ""
          }`}
        />
        {formErrors.simbolo && (
          <p className="text-sm text-red-600 mt-1">{formErrors.simbolo}</p>
        )}
      </div>

      <ButtonBase
        type="submit"
        color="amber"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? isEdit ? "Actualizando..." : "Creando..."
          : isEdit ? "Actualizar deidad" : "Crear deidad"}
      </ButtonBase>
    </form>
  );
}