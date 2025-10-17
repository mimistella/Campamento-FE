import { useState, useContext } from "react";
import MisionesContext from "../../context/MisionesContext.js";
import useFetch from "../../hooks/useFetch.js";
import DashboardContext from "../../context/DashboardContext.js";

const FormSeleccionarMision = ({ onClose }) => {
  const [misionSel, setMisionSel] = useState("");
  const [campistaSel, setCampistaSel] = useState("");
  const { data: campistas } = useFetch("campista");
  const { misiones, createAsignada } = useContext(MisionesContext);
  const { periodo } = useContext(DashboardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAsignada({
        campista: Number(campistaSel),
        mision: Number(misionSel),
        estado: "asignada",
        periodo: periodo.id,
      });

      onClose();
      setMisionSel("");
      setCampistaSel("");
    } catch (err) {
      console.error("Error al asignar la misión:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-amber-50 rounded-xl shadow-lg space-y-5 border border-amber-200"
    >
      <h2 className="text-amber-900 font-bold text-xl text-center">
        Asignar misión
      </h2>

      {/* Select de títulos */}
      <label className="block text-amber-900 font-semibold">
        Título de la misión
        <select
          value={misionSel}
          onChange={(e) => setMisionSel(e.target.value)}
          className="mt-2 block w-full p-3 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
        >
          <option value="">-- Seleccionar misión --</option>
          {misiones.map((mision) => (
            <option key={mision.id} value={mision.id}>
              {mision.titulo}
            </option>
          ))}
        </select>
      </label>

      {/* Select Campista */}
      <label className="block text-amber-900 font-semibold">
        Campista
        <select
          value={campistaSel}
          onChange={(e) => setCampistaSel(e.target.value)}
          className="mt-2 block w-full p-3 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
        >
          <option value="">-- Seleccionar campista --</option>
          {campistas.map((campista) => (
            <option key={campista.id} value={campista.id}>
              {campista.nombre}
            </option>
          ))}
        </select>
      </label>

      {/* Botón Submit */}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition"
      >
        Guardar misión
      </button>
    </form>
  );
};

export default FormSeleccionarMision;
