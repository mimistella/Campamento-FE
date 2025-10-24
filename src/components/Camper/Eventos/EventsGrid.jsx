import { useState, useEffect } from "react";
import Evento from "./Evento";
import { useEventos } from "@hooks/useEventos.js";

export default function EventsGrid() {
  const { eventos, fetchEventos } = useEventos();
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8; // cantidad de eventos por página

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  const totalPages = Math.ceil(eventos.length / perPage);
  const paginatedEventos = eventos.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <section className="w-full bg-amber-100 py-10 px-4 md:px-8 rounded-2xl shadow-inner">
      <h2 className="text-2xl md:text-3xl font-bold text-amber-800 text-center mb-10">
        Próximos Eventos
      </h2>

      {/* GRID DE EVENTOS */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedEventos.map((evento) => (
          <li
            key={evento.id}
            className="p-4 bg-amber-200/60 rounded-xl border border-amber-300 shadow-md hover:shadow-xl 
                       hover:scale-105 transition-all duration-300 bg-[url(/src/assets/images/chb_lg.svg)]
                       bg-no-repeat bg-center bg-blend-overlay"
          >
            <Evento
              evento={evento}
              TitleTextSize="text-lg"
              IsGrid={true}
              textColor="text-amber-900"
            />
          </li>
        ))}
      </ul>

      {/* PAGINADOR */}
      {eventos.length > perPage && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === 1
                ? "bg-amber-300 text-amber-700 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            Anterior
          </button>

          <span className="text-amber-800 font-medium">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === totalPages
                ? "bg-amber-300 text-amber-700 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}
