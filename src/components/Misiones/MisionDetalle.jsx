import BotonEditarMision from "./BotonEditarMision.jsx";

const MisionDetalle = ({ mision }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
            <div className="space-y-2">
                {/* Título */}
                <h2 className="text-center text-2xl font-bold text-gray-800">
                    {mision.titulo}
                </h2>

                {/* Descripción */}
                <p className="italic text-gray-600 leading-relaxed">
                    {mision.descripcion}
                </p>

                {/* Recompensa */}
                <p className="text-lg font-medium text-amber-500">
                    Recompensa: {mision.recompensa}
                </p>

                {/* Pista */}
                <p className="text-gray-700">
                    🔎 <span className="font-semibold">Pista:</span> {mision.pista}
                </p>
            </div>

            {/* Botón editar */}
            <BotonEditarMision mision={mision}/>
        </div>
    );
    };

export default MisionDetalle;
