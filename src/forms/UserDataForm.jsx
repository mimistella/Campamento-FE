import { useState, useEffect } from "react";
import api from "@hooks/useApi";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useToaster } from "@hooks/useToaster";
import { CircleUserRound, PhoneIcon } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    fechaNac: "",
    pais: "",
    ciudad: "",
    direccion: "",
    grupoSanguineo: "",
    telefonoEmergencia: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const toast = useToaster();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data?.data || null);
      } catch (error) {
        console.error("Error obteniendo perfil:", error);
        toast.error("No se pudo cargar el perfil.");
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      const fechaParaInput = user.fechaNac
        ? new Date(user.fechaNac).toISOString().split("T")[0]
        : "";
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        telefono: user.telefono || "",
        fechaNac: fechaParaInput,
        pais: user.pais || "",
        ciudad: user.ciudad || "",
        direccion: user.direccion || "",
        grupoSanguineo: user.grupoSanguineo || "",
        telefonoEmergencia: user.telefonoEmergencia || "",
      });
    }
  }, [user]);

  const camposObligatorios = [
    "nombre",
    "apellido",
    "telefono",
    "fechaNac",
    "pais",
    "ciudad",
    "direccion",
    "grupoSanguineo",
    "telefonoEmergencia",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const parseBackendErrors = (error) => {
    setFieldErrors({});

    if (error.response?.data?.errors) {
      const errors = error.response.data.errors;
      const newFieldErrors = {};

      // Si es un array de errores de Zod
      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          if (err.path && err.path.length > 0) {
            const fieldName = err.path[0];
            newFieldErrors[fieldName] = err.message;
          }
        });
        setFieldErrors(newFieldErrors);
        return "Por favor, corrige los errores en el formulario.";
      }

      if (typeof errors === "object") {
        Object.keys(errors).forEach((key) => {
          newFieldErrors[key] = Array.isArray(errors[key])
            ? errors[key][0]
            : errors[key];
        });
        setFieldErrors(newFieldErrors);
        return "Por favor, corrige los errores en el formulario.";
      }
    }

    // Mensaje de error general del backend
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    switch (error.response?.status) {
      case 400:
        return "Los datos enviados no son válidos.";
      case 401:
        return "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
      case 403:
        return "No tienes permisos para realizar esta acción.";
      case 404:
        return "No se encontró el recurso solicitado.";
      case 409:
        return "Ya existe un registro con estos datos.";
      case 422:
        return "Los datos no cumplen con los requisitos de validación.";
      case 500:
        return "Error en el servidor. Por favor, inténtalo más tarde.";
      default:
        return "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    const incompletos = camposObligatorios.filter(
      (campo) => !formData[campo]?.trim()
    );

    if (incompletos.length > 0) {
      toast.error("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    const loadingToastId = toast.loading("Guardando cambios...");

    try {
      await api.patch("/auth/profile", formData);
      toast.dismiss(loadingToastId);
      toast.success("Los cambios han sido guardados correctamente.");
    } catch (error) {
      toast.dismiss(loadingToastId);
      const errorMessage = parseBackendErrors(error);
      toast.error(errorMessage);
      console.error("Error al guardar:", error);
    }
  };

  const getFieldLabel = (campo) => {
    const labels = {
      fechaNac: "Fecha de Nacimiento",
      grupoSanguineo: "Grupo Sanguíneo",
      telefonoEmergencia: "Teléfono de Emergencia",
    };
    return labels[campo] || campo.charAt(0).toUpperCase() + campo.slice(1);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-amber-200 p-6">
      <div className="flex flex-col items-center justify-center p-6 md:p-8 w-full md:w-1/3 mb-6 md:mb-0">
        <CircleUserRound className="text-white w-24 h-24 mb-4" />
        <h2 className="font-caesar-dressing-regular text-3xl text-white bg-amber-500 px-4 py-2 rounded-xl shadow-md text-center">
          Mi perfil
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl flex-1 w-full max-w-5xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto"
      >
        {camposObligatorios.map((campo) => (
          <div key={campo} className="flex flex-col relative">
            <label className="font-semibold mb-1 capitalize text-gray-700">
              {getFieldLabel(campo)}
            </label>

            {campo === "grupoSanguineo" ? (
              <>
                <select
                  name="grupoSanguineo"
                  value={formData.grupoSanguineo}
                  onChange={handleChange}
                  required
                  className={`border rounded-lg p-2 bg-white focus:ring-2 focus:ring-amber-400 ${
                    fieldErrors.grupoSanguineo
                      ? "border-red-500 focus:ring-red-400"
                      : ""
                  }`}
                >
                  <option value="">Seleccionar</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {fieldErrors.grupoSanguineo && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldErrors.grupoSanguineo}
                  </span>
                )}
              </>
            ) : campo === "telefonoEmergencia" ? (
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                <PhoneInput
                  country={"ar"}
                  value={formData.telefonoEmergencia}
                  onChange={(value) => {
                    setFormData((f) => ({ ...f, telefonoEmergencia: value }));
                    if (fieldErrors.telefonoEmergencia) {
                      setFieldErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.telefonoEmergencia;
                        return newErrors;
                      });
                    }
                  }}
                  inputClass={`!w-full !pl-10 !pr-3 !py-2 !border !rounded-md !outline-none transition !h-[42px] !text-base ${
                    fieldErrors.telefonoEmergencia
                      ? "!border-red-500 focus:!border-red-400"
                      : "!border-gray-300 focus:!border-amber-500"
                  }`}
                  buttonClass="!border-none !bg-transparent !absolute !left-0 !top-1/2 !-translate-y-1/2 !z-20"
                  dropdownClass="!z-50"
                  containerClass="w-full"
                  inputProps={{
                    name: "telefonoEmergencia",
                    required: true,
                    placeholder: "Teléfono de emergencia",
                  }}
                  masks={{ ar: ".......... " }}
                  enableSearch
                />
                {fieldErrors.telefonoEmergencia && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldErrors.telefonoEmergencia}
                  </span>
                )}
              </div>
            ) : (
              <>
                <input
                  type={campo === "fechaNac" ? "date" : "text"}
                  name={campo}
                  value={formData[campo]}
                  onChange={handleChange}
                  required
                  className={`border rounded-lg p-2 focus:ring-2 ${
                    fieldErrors[campo]
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-amber-400"
                  }`}
                />
                {fieldErrors[campo] && (
                  <span className="text-red-500 text-sm mt-1">
                    {fieldErrors[campo]}
                  </span>
                )}
              </>
            )}
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
          <ButtonBase
            type="submit"
            className="bg-amber-500 text-white hover:bg-amber-600 px-8 py-3 rounded-xl shadow-md transition text-lg font-semibold"
          >
            Aceptar
          </ButtonBase>
        </div>
      </form>
    </div>
  );
}