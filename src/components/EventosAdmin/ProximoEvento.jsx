import { useContext, useEffect, useState } from 'react';
import EventosContext from '../../context/EventosContext.js';
import Evento from '../Eventos/Evento.jsx';
import Countdown from './Countdown.jsx';
import EditEventButton from './EditEventButton.jsx';

export default function ProximoEvento({ onEdit }) {
  const { eventos, fetchEventos, loadingEventos } = useContext(EventosContext);
  const [eventosSorted, setEventosSorted] = useState([]);

  useEffect(() => {
    fetchEventos();
  }, [fetchEventos]);

  useEffect(() => {
    if (eventos && eventos.length > 0) {
      const sorted = sortEventos(eventos);
      setEventosSorted(sorted);
    }
  }, [eventos]);

  // Loading state
  if (loadingEventos) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-600"></div>
        <p className="text-amber-700 mt-4">Cargando eventos...</p>
      </div>
    );
  }

  // Sin eventos
  if (!eventosSorted || eventosSorted.length === 0) {
    return (
      <div className="p-8 text-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-lg border-2 border-amber-200">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-2xl font-bold text-amber-900 mb-2">No hay eventos próximos</h3>
        <p className="text-amber-700">Los dioses aún no han anunciado nuevas misiones</p>
      </div>
    );
  }

  // Menos de 3 eventos - Vista simple con el más próximo
  if (eventosSorted.length < 3) {
    const proximoEvento = eventosSorted[0];
    
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-6 tracking-wide">
           PRÓXIMO EVENTO 
        </h2>
        
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-xl shadow-2xl border-4 border-amber-600 overflow-hidden">
          {/* Header decorativo */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 p-4 text-center">
            <h3 className="text-2xl font-bold text-white tracking-wider">
              CAMP HALF-BLOOD
            </h3>
          </div>

          {/* Contenido del evento */}
          <div className="p-8">
            <Evento 
              evento={proximoEvento} 
              TitleTextSize="text-4xl" 
              IsGrid={false} 
              isEditMode={true} 
              titleJustify='justify-center' 
              textColor='text-amber-900'
            />

            {/* Countdown destacado */}
            <div className="mt-8 bg-white/70 rounded-lg p-6 shadow-inner">
              <p className="text-center text-amber-800 font-semibold mb-3 text-lg">
                Cuenta regresiva:
              </p>
              <Countdown targetDate={proximoEvento.fechahora} />
            </div>

            {/* Botón editar */}
            <div className="mt-6 flex justify-center">
              <EditEventButton onClick={() => onEdit(proximoEvento)} />
            </div>
          </div>

          {/* Footer decorativo */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 p-2"></div>
        </div>

        {/* Otros eventos (si hay más de 1) */}
        {eventosSorted.length > 1 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-amber-800 text-center mb-4">
              Otros eventos próximos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventosSorted.slice(1).map((evento, index) => (
                <div 
                  key={evento.id || index}
                  className="bg-white/80 border-2 border-amber-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h4 className="font-bold text-amber-900 text-lg mb-2">
                    {evento.titulo}
                  </h4>
                  <p className="text-amber-700 text-sm mb-3">
                    📅 {new Date(evento.fechahora).toLocaleDateString('es-AR')}
                  </p>
                  <p className="text-amber-700 text-sm">
                    🕐 {new Date(evento.fechahora).toLocaleTimeString('es-AR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3 o más eventos
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-amber-900 text-center mb-6 tracking-wide">
        ⚡ PRÓXIMOS EVENTOS ⚡
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Evento principal (más grande) */}
        <li className="relative lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-xl shadow-2xl border-4 border-amber-600 p-6 hover:shadow-3xl transition-shadow">
          <div className="bg-white/50 rounded-lg p-4 mb-4">
            <Evento 
              evento={eventosSorted[0]} 
              TitleTextSize="text-3xl" 
              IsGrid={true} 
              isEditMode={true} 
              titleJustify='justify-center' 
              textColor='text-amber-900'
            />
          </div>
          
          <div className="flex justify-center mb-4 bg-white/70 rounded-lg p-4">
            <Countdown targetDate={eventosSorted[0].fechahora} />
          </div>
          
          <div className="flex justify-center">
            <EditEventButton onClick={() => onEdit(eventosSorted[0])} />
          </div>
        </li>

        {/* Eventos secundarios */}
        {[1, 2].map((index) => (
          <li 
            key={eventosSorted[index]?.id || index}
            className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-xl border-2 border-amber-400 p-4 hover:shadow-2xl transition-shadow"
          >
            <div className="bg-white/50 rounded-lg p-3 mb-3">
              <Evento 
                evento={eventosSorted[index]} 
                TitleTextSize={index === 1 ? "text-2xl" : "text-xl"} 
                IsGrid={true} 
                isEditMode={true} 
                titleJustify='justify-center' 
                textColor='text-amber-900'
              />
            </div>
            
            <div className="flex justify-center mb-3 bg-white/70 rounded-lg p-2">
              <Countdown targetDate={eventosSorted[index].fechahora} />
            </div>
            
            <div className="flex justify-center">
              <EditEventButton onClick={() => onEdit(eventosSorted[index])} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function sortEventos(eventos) {
  if (!eventos || eventos.length === 0) return [];
  
  const sortedEventos = eventos
    .filter(e => new Date(e.fechahora) > new Date()) // Solo futuros
    .sort((a, b) => new Date(a.fechahora) - new Date(b.fechahora)) // Orden ascendente
    .slice(0, 3); // Primeros 3

  return sortedEventos;
}