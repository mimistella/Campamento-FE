import { useState } from "react";
import api from "../../hooks/useApi.js";

export const AddEventForm = ({ onClose }) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechahora, setFechahora] = useState("");
    const [lugar, setLugar] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post("/eventos", {
                titulo,
                descripcion,
                fechahora,
                lugar,
            });

            // 🚀 cerrar modal al guardar
            onClose();

            // limpiar inputs
            setTitulo("");
            setDescripcion("");
            setFechahora("");
            setLugar("");
        } catch (err) {
            console.error("Error creando evento:", err);
            setError("No se pudo crear el evento. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-600">{error}</p>}

            <input
                type="text"
                placeholder="Título del evento"
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
                type="datetime-local"
                value={fechahora}
                onChange={(e) => setFechahora(e.target.value)}
                className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />

            <input
                type="text"
                placeholder="Lugar"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
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
    );
};
