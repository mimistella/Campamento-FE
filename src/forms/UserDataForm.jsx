import { useState, useEffect } from "react";
import { CircleUserRound, PhoneIcon } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import api from "@hooks/useApi";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useToaster } from "@hooks/useToaster"; 

export default function UserData() {
  const { user } =api.get("/auth/profile");

  const toast = useToaster();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const incompletos = camposObligatorios.filter(
    (campo) => !formData[campo]?.trim()
  );

  if (incompletos.length > 0) {
    toast.error("Por favor, completa todos los campos antes de continuar.");
    return;
  }

  const loadingToastId = toast.loading("Guardando cambios...");

  try {

    // eslint-disable-next-line no-unused-vars
    const { data } = await api.patch("/auth/profile", formData);

    toast.dismiss(loadingToastId);
    toast.success("Los cambios han sido guardados correctamente.");
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error("Ocurrió un error al guardar los cambios.");
    console.error(error);
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-amber-200 p-6">
      {/* Sección izquierda / top en mobile */}
      <div className="flex flex-col items-center justify-center p-6 md:p-8 w-full md:w-1/3 mb-6 md:mb-0">
        <CircleUserRound className="text-white w-24 h-24 mb-4" />
        <h2 className="font-caesar-dressing-regular text-3xl text-white bg-amber-500 px-4 py-2 rounded-xl shadow-md text-center">
          Mi perfil
        </h2>
      </div>

      {/* Sección derecha / form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl flex-1 w-full max-w-5xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5 mx-auto"
      >
        {camposObligatorios.map((campo) => (
          <div key={campo} className="flex flex-col relative">
            <label className="font-semibold mb-1 capitalize text-gray-700">
              {campo === "fechaNac"
                ? "Fecha de Nacimiento"
                : campo === "grupoSanguineo"
                ? "Grupo Sanguíneo"
                : campo === "telefonoEmergencia"
                ? "Teléfono de Emergencia"
                : campo.charAt(0).toUpperCase() + campo.slice(1)}
            </label>

            {campo === "grupoSanguineo" ? (
              <select
                name="grupoSanguineo"
                value={formData.grupoSanguineo}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 bg-white focus:ring-2 focus:ring-amber-400"
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
            ) : campo === "telefonoEmergencia" ? (
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <PhoneInput
                  country={"ar"}
                  value={formData.telefonoEmergencia}
                  onChange={(value) =>
                    setFormData((f) => ({ ...f, telefonoEmergencia: value }))
                  }
                  inputClass="!w-full !pl-10 !pr-3 !py-2 !border !border-gray-300 !rounded-md !outline-none focus:!border-amber-500 transition !h-[42px] !text-base"
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
              </div>
            ) : (
              <input
                type={campo === "fechaNac" ? "date" : "text"}
                name={campo}
                value={formData[campo]}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 focus:ring-2 focus:ring-amber-400"
              />
            )}
          </div>
        ))}

        {/* Botón Aceptar */}
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