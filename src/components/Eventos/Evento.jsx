import inscribirAEvento from "./InscripcionEvento.jsx";

export default function Evento({evento, TitleTextSize = "text-4xl", IsGrid = true}){
    return (
        <>
            {/* Titulo evento */}
            <h2 className={`flex justify-center ${TitleTextSize} text-[#ffd700] mb-1`}>
            {evento.titulo}
            </h2>

            {IsGrid && (
                <div className="grid grid-cols-2 gap-4">
                    <p className="col-span-2">
                        <strong>Descripción:</strong> {evento.descripcion}
                    </p>
                </div>
            )}
            

            <div>
            <p><strong>Fecha:</strong> {evento.fechahora}</p>
            <p><strong>Lugar:</strong> {evento.lugar}</p>
            </div>

            <button
            className="flex mx-auto mt-4 bg-green-800 bg-opacity-20 hover:bg-green-950 text-white font-bold py-2 px-4 rounded"
            onClick={() => inscribirAEvento({ evento }) }
            >
                Inscribirse
            </button>
        </>
    );
}