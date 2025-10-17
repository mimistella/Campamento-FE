export const BotonMisEventos = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="fixed overflow-hidden z-20 bottom-6 right-6 lg:top-6 lg:bottom-auto 
                 bg-amber-900 px-8 py-4 rounded-lg text-amber-50 font-semibold 
                 shadow-md shadow-amber-700/50 
                 group transition-all duration-300"
    >
      {/* Gradiente radial de fondo en hover */}
      <span
        className="absolute inset-0 transition-transform duration-300 scale-0 group-hover:scale-100"
        style={{
          background: 'radial-gradient(ellipse, #f59e0b, #78350f)', // amber-500 a amber-900
        }}
      ></span>

      {/* Texto */}
      <span className="relative z-10 group-hover:text-amber-50 transition-colors duration-300">
        {text}
      </span>
    </button>
  );
};
