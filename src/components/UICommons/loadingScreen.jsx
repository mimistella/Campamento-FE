import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Columnas griegas animadas */}
        <div className="flex gap-4 mb-8 justify-center">
          <div className="w-3 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-sm animate-bounce" style={{ animationDelay: '0s', animationDuration: '1s' }}>
            <div className="w-full h-2 bg-amber-600 -mt-2"></div>
          </div>
          <div className="w-3 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-sm animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}>
            <div className="w-full h-2 bg-amber-600 -mt-2"></div>
          </div>
          <div className="w-3 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t-sm animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1s' }}>
            <div className="w-full h-2 bg-amber-600 -mt-2"></div>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-3xl font-bold text-amber-900 mb-4 tracking-wide">
          CAMP HALF-BLOOD
        </h2>

        {/* Texto de carga */}
        <p className="text-amber-700 text-lg mb-6 animate-pulse">
          Consultando el Oráculo...
        </p>

        {/* Rayos animados */}
        <div className="flex gap-2 justify-center">
          <svg className="w-8 h-8 text-yellow-500 animate-ping" style={{ animationDuration: '1.5s' }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3L6 13h5l-1 7 5-10h-5l1-7z"/>
          </svg>
          <svg className="w-8 h-8 text-amber-500 animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3L6 13h5l-1 7 5-10h-5l1-7z"/>
          </svg>
          <svg className="w-8 h-8 text-orange-500 animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.6s' }} fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3L6 13h5l-1 7 5-10h-5l1-7z"/>
          </svg>
        </div>

        {/* Barra de progreso */}
        <div className="mt-8 w-64 mx-auto">
          <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 animate-pulse rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Texto decorativo */}
        <p className="text-amber-600 text-sm mt-6 italic">
          "Los dioses esperan..."
        </p>
      </div>
    </div>
  );
}

// Versión alternativa más simple
export function SimpleLoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner circular con laurel */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 border-8 border-amber-200 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-amber-600 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">⚡</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-amber-900">Cargando...</h3>
        <p className="text-amber-600 mt-2">Camp Half-Blood</p>
      </div>
    </div>
  );
}

// Versión con espadas cruzadas
export function SwordLoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Espadas cruzadas animadas */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-32 bg-gradient-to-b from-gray-400 to-gray-600 rounded transform rotate-45 animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-32 bg-gradient-to-b from-gray-400 to-gray-600 rounded transform -rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-amber-500 rounded-full animate-ping"></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-amber-400 mb-2 tracking-widest">
          HALF-BLOOD
        </h2>
        <p className="text-amber-300 animate-pulse">Preparando la profecía...</p>
      </div>
    </div>
  );
}