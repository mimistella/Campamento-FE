import { useState, useEffect } from 'react';
import Evento from "./Evento";
import { useEventos } from '../../hooks/useEventos.js';

// 🔹 Devuelve los eventos visibles sin duplicar ni acumular
function getVisibleSlides(eventos, currentIndex, count) {
  if (!eventos || eventos.length === 0) return [];
  const slides = [];
  for (let i = 0; i < count; i++) {
    const index = (currentIndex + i) % eventos.length;
    slides.push(eventos[index]);
  }
  return slides;
}

export default function EventsSlider() {
  const { eventos, fetchEventos } = useEventos();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // 🔄 Cargar eventos y manejar resize
  useEffect(() => {
    fetchEventos();
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchEventos]);

  // ⚠️ Evitar overflow de índice si el largo cambia
  useEffect(() => {
    if (eventos.length > 0 && currentIndex >= eventos.length) {
      setCurrentIndex(0);
    }
  }, [eventos, currentIndex]);

  const nextSlide = () => {
    if (eventos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % eventos.length);
  };

  const prevSlide = () => {
    if (eventos.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + eventos.length) % eventos.length);
  };

  const visibleSlides = getVisibleSlides(eventos, currentIndex, isDesktop ? 5 : 1);

  return (
    <div className="flex flex-col items-center bg-amber-100 p-4 h-96 rounded-2xl shadow-md w-full">
      <h2 className="text-amber-700 text-2xl font-semibold mb-4">Eventos del Campamento</h2>

      <div className="flex items-center justify-center w-full relative">
        {/* Botón Izquierda */}
        <button
          onClick={prevSlide}
          className="p-2 text-amber-600 hover:text-amber-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slides */}
        <ul
          key={currentIndex} // 🔹 clave única para forzar reemplazo visual
          className={`flex justify-center items-center gap-6 transition-all duration-500 ease-out ${
            isDesktop ? "flex-row" : "flex-col"
          }`}
        >
          {visibleSlides.map((evento) => (
            <li
              key={evento.id}
              className="bg-amber-200 hover:bg-amber-300 p-4 rounded-xl border border-amber-400 shadow-md hover:shadow-lg 
                        transform hover:scale-105 transition-all duration-300 min-w-[12rem] max-w-[15rem]"
            >
              <Evento
                evento={evento}
                TitleTextSize={isDesktop ? "text-lg" : "text-sm"}
                IsGrid={false}
                textColor="text-amber-900"
              />
            </li>
          ))}
        </ul>

        {/* Botón Derecha */}
        <button
          onClick={nextSlide}
          className="p-2 text-amber-600 hover:text-amber-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores inferiores */}
      <div className="flex gap-2 mt-4">
        {eventos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-amber-500 scale-110" : "bg-amber-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
