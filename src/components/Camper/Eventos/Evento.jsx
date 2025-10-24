import InscribirAEvento from "./InscripcionEvento.jsx";

export default function Evento({evento, TitleTextSize = "text-4xl", IsGrid = true, isEditMode = false, titleJustify = "justify-center", textColor = "text-black" }) {
    return (
        <div className={`${textColor} flex flex-col justify-around h-5/6`}>
            {/* Titulo evento */}
            <h2 className={`flex ${titleJustify} ${TitleTextSize} px-8 mb-1`}>
            {evento.titulo}
            </h2>

            {IsGrid && (
                <div className="">
                    <strong>Descripción:</strong> {evento.descripcion}
                </div>
            )}
            

            <p><strong>Fecha:</strong> {new Date(evento.fechahora).toLocaleString('es-AR')}</p>
            <p><strong>Lugar:</strong> {evento.lugar}</p>

            {!isEditMode && (() => {
                return (
                    <InscribirAEvento evento={evento}/>
                );
            })()}
        </div>
    );
}