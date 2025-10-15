import { useState } from "react";
import { useContext } from "react";
import MisionesContext from "../../context/MisionesContext.js";

const AddMisionForm = ({ onClose }) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [recompensa, setRecompensa] = useState("");
    const [pista, setPista] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { createMision } = useContext(MisionesContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        

        try {
            
            await createMision({
                titulo,
                descripcion,
                recompensa,
                pista,
            });

            // Cierra el modal al guardar
            onClose();
            // Limpiar inputs
            setTitulo("");
            setDescripcion("");
            setRecompensa("");
            setPista("");
        } catch (err) {
            console.error("Error creando misión:", err);
            setError("No se pudo crear la misión. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md relative">
            
                <h2 className="text-xl font-bold mb-4">Crear Mision</h2>
                {/* Botón cerrar (esquina) */}
                <button
                    onClick={() => onClose()}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                    >
                    ✖
                </button>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                    {error && <p className="text-red-600">{error}</p>}

                    <input
                        type="text"
                        placeholder="Título de la misión"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <textarea
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>

                    <input
                        type="text"
                        placeholder="Recompensa"
                        value={recompensa}
                        onChange={(e) => setRecompensa(e.target.value)}
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Pista"
                        value={pista}
                        onChange={(e) => setPista(e.target.value)}
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>



                </form>
            </div>
            
        </div>
    );
};

export default AddMisionForm;