import { useState } from "react";
import api from "../../hooks/useApi.js";

const FormSeleccionarMision = ({misiones, campistas, onClose, onChange}) =>{

    const [misionSel, setMisionSel] = useState("");
    const [campistaSel, setCampistaSel] = useState(null)
    //const [mision, setMision] = useState(null)


    const  handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(misionSel)
            await api.post("/asigna-mision", {
                "campista":campistaSel,
                "mision":misionSel,
                estado : "asignada"
            });

            // Cierra el modal al guardar
            onClose();
            onChange();

        } catch (err) {
            console.error("Error creando misión:", err);
        }
    };

    return(
        <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-lg shadow-md space-y-4">
            
            {/* Select de títulos */}
            <label className="block text-gray-700 font-semibold">
                Título de la misión
                <select
                    value={misionSel}
                    onChange={(e) => setMisionSel(e.target.value)}
                    className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
            <label className="block text-gray-700 font-semibold">
                Campista
                <select
                    value={campistaSel}
                    onChange={(e) => setCampistaSel(e.target.value)}
                    className="mt-2 block w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                <option value=""> -- Seleccionar Campista -- </option>
                {campistas.map((campista) =>(
                    <option key={campista.id} value={campista.id}>
                        {campista.nombre}
                    </option>
                ))}
                </select>
            </label>

            {/* Botón Submit */}
            <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
                Guardar misión
            </button>
        </form>
    )
}

export default FormSeleccionarMision;