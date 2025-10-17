export const BotonMisEventos = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="fixed overflow-hidden z-20 bottom-6 right-6 lg:top-6 lg:bottom-auto bg-blue-950 px-8 py-4 rounded-lg text-white font-semibold group">
            {/* Gradiente radial de fondo */}
            <span
                className="absolute inset-0 transition-transform duration-300 scale-0 group-hover:scale-100"
                style={{
                background: 'radial-gradient(ellipse, #2563EB, #1E3A8A)', // azul-600 a azul-950
                }}
            ></span>
            
            {/* Texto */}
            <span className="relative z-10">{text}</span>
        </button>
    );
}
