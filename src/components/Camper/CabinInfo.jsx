import React from 'react';
import { MapPinIcon, UsersIcon, SparklesIcon } from 'lucide-react';

const CabinInfo = ({ cabin }) => {
  if (!cabin) return null;

  const camperAttributes = cabin.camperAttributes || [];
  const activities = cabin.activities || [];

  return (
    <div className="w-full lg:max-w-4xl min-h-screen my-0 lg:my-8 px-0 sm:px-4 lg:px-6">
      {/* Nombre de la cabaña */}
      <div className="text-center mb-8 lg:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-amber-600 mb-2 font-caesar-dressing-regular break-words">
          Mi Cabaña: {cabin.name || 'Sin nombre'}
        </h1>
        <div className="h-1 w-24 sm:w-32 bg-orange-400 mx-auto rounded"></div>
      </div>

      <div className="bg-white rounded-none lg:rounded-lg shadow-none lg:shadow-lg overflow-hidden h-full">
        {/* Foto e info */}
        <div className="flex flex-col md:flex-row h-full">
          {/* Lado izquierdo - Imagen */}
          <div className="w-full md:w-1/3 bg-amber-600 p-6 flex flex-col items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
              <img
                src={cabin.imageUrl || '/placeholder.png'}
                alt={cabin.name || 'Cabaña'}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white text-lg sm:text-xl font-bold text-center">
              La cabaña de {cabin.deity || 'Desconocida'}
            </h2>
            <p className="text-amber-100 text-center mt-2">
              Cabaña #{cabin.cabinNumber ?? 'N/A'}
            </p>
          </div>

          {/* Lado derecho - Deidad */}
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-xl sm:text-2xl text-amber-600 font-bold mb-4 border-b border-amber-200 pb-2">
              Acerca de {cabin.deity || 'esta deidad'}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed break-words">
              {cabin.deityDescription || 'No hay descripción disponible.'}
            </p>

            {/* Ubicación */}
            <div className="flex items-start mb-4">
              <MapPinIcon className="text-orange-400 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Ubicación</h3>
                <p className="text-gray-700">{cabin.location || 'No especificada'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cualidades de los campistas */}
        {camperAttributes.length > 0 && (
          <div className="border-t border-amber-100 p-6">
            <div className="flex items-start mb-4">
              <UsersIcon className="text-orange-400 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
              <h3 className="font-bold text-gray-800 text-lg">
                Cualidades de sus campistas
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {camperAttributes.map((attribute, index) => (
                <div
                  key={index}
                  className="bg-amber-50 rounded-lg p-4 flex items-start"
                >
                  <SparklesIcon className="text-amber-600 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-800">{attribute.name}</h4>
                    <p className="text-gray-700 break-words">{attribute.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actividades de la Cabaña */}
        {activities.length > 0 && (
          <div className="border-t border-amber-100 p-6 bg-amber-50">
            <h3 className="font-bold text-gray-800 text-lg mb-4">
              Actividades de la Cabaña
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {activities.map((activity, index) => (
                <li key={index} className="break-words">
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CabinInfo;