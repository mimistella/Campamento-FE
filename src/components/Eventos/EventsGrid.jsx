import Evento from "./Evento";
import { useState, useEffect } from "react";
import { useEventos } from "../../hooks/useEventos.js";

const layout = [
    "col-span-2 row-span-2", // evento 1 → 2x2
    "col-span-2 row-span-1", // evento 2 → 2x1
    "col-span-1 row-span-1", // evento 3 → 1x1
    "col-span-1 row-span-1", // evento 4 → 1x1

    "col-span-1 row-span-2", // evento 5 → 1x2
    "col-span-1 row-span-1", // evento 6 → 1x1
    "col-span-2 row-span-2", // evento 8 → 2x2
    "col-span-1 row-span-1", // evento 7 → 1x1
];




export default function EventsGrid() {
    const {eventos, fetchEventos} = useEventos();
    const [visibleCount, setVisibleCount] = useState(8); // mostrar 8 eventos al inicio

    useEffect(() =>{
        fetchEventos();
    }, [fetchEventos])

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 8); // sumar 8 eventos cada clic
    };

    return (
        <>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows gap-8">
                {eventos.slice(0, visibleCount).map((evento, i) => {
                    return (
                        <li
                            key={evento.id}
                            className={`p-5 bg-[#415a77] bg-[url(/src/assets/images/chb_lg.svg)] bg-no-repeat bg-center bg-gray-200/90 bg-blend-overlay
                                hover:scale-105 transition-transform duration-300
                                rounded-b-2xl shadow-gray-800 shadow-lg
                                lg:${layout[i % layout.length]}`}
                        >
                            <Evento evento={evento} textColor="text-blue-950" />
                        </li>
                    );
                })}
            </ul>

            {visibleCount < eventos.length && (
                <div className="flex left-2 md:justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Ver más
                    </button>
                </div>
            )}
        </>
    );
}
