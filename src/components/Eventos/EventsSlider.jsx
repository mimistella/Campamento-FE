import { useState, useEffect } from 'react';
import Evento from "./Evento";

//Define las slides a mostrar 
function shownSlides(eventos, currentIndex, maxEventsShown = 5) {
    if (currentIndex + maxEventsShown > eventos.length) {
        // If there are not enough events to fill the last slide, we can loop back to the start
        const slides = eventos.slice(currentIndex).concat(eventos.slice(0, maxEventsShown - (eventos.length - currentIndex)));
        return slides;
    }

    const slides = eventos.slice(currentIndex, currentIndex + maxEventsShown);
    return slides;
}

//Tamaños predefinidos para el slider

const heights = ['h-48', 'h-60', 'h-72', 'h-60', 'h-48'];
const widths = ['w-48', 'w-60', 'w-72', 'w-60', 'w-48'];


function desktopVersion(eventos, currentIndex){
    console.log("working on desktop")
    console.log(typeof(window.innerWidth) + " " + window.innerWidth)
    return (
        <>
            {shownSlides(eventos, currentIndex).map((evento, index) => (
                <li key={evento.id} className={`p-2 bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7)),url(/src/assets/images/EventoBg.jpg)] bg-cover bg-center 
                                                ${heights[index]} ${widths[index]} mx-10 hover:scale-110 transition-all ease-out duration-300 text-[#ffd700] text-sm overflow-clip`}>
                    <Evento evento={evento} TitleTextSize={"text-xs"} IsGrid={false} />
                </li>
            ))}
        </>
    );
}

function mobileVersion(eventos, currentIndex){
    console.log("working on mobile")
    console.log(typeof(window.innerWidth) + " " + window.innerWidth)

    return (
        <>
            {shownSlides(eventos, currentIndex, 1).map((evento) => (
                <li key={evento.id} className={`p-2 bg-[#1b263b] h-32 hover:scale-110 transition-all ease-out duration-300 text-[#ffd700] text-sm overflow-clip`}>
                    <Evento evento={evento} TitleTextSize={"text-xs"} IsGrid={false} />
                </li>
            ))}
        </>
    );
}


export default function EventsSlider({ eventos }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    //currentIndex es el indice del primer evento que se muestra en el slider, el que esta mas a la izquierda

      const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);

    useEffect(() => {
        function handleResize() {
        setIsDesktop(window.innerWidth >= 1280);
        }

        // Escuchamos el resize
        window.addEventListener("resize", handleResize);

        // Limpieza al desmontar
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % eventos.length);
    };
    const prevSlide = () => {
        setCurrentIndex((currentIndex) => (currentIndex - 1 + eventos.length) % eventos.length);
    };

    return (
        <ul className='flex justify-center items-center transition ease-out duration-0 text-xs h-auto
                        lg:min-h-[26rem] mb-6 '>
                            

            {/* Botón para la izquierda */}
            <button className='p-2' onClick={() => {prevSlide()}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
            </button>

            {/* Slides */}
            {isDesktop ? (
                desktopVersion(eventos, currentIndex)
            ) : (
                mobileVersion(eventos, currentIndex)
            )}

            {/* Botón para la derecha */}
            <button className='p-2' onClick={() => {nextSlide()}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </button>

        </ul>
    );
}

