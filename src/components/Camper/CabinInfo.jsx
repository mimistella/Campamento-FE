import React from 'react';
import { MapPinIcon, UsersIcon, SparklesIcon } from 'lucide-react';

const CabinInfo = ({ cabin }) => {
  if (!cabin) return null;

  // Import.meta.glob busca imágenes estáticamente en tiempo de build
const images = import.meta.glob('/src/assets/cabanias/*.{png,jpg,jpeg,webp}', { eager: true });

const getCabinImage = (deidadNombre) => {
  if (!deidadNombre) return '/placeholder.png';

  // Normalizamos el nombre (quitamos tildes, pasamos a minúsculas)
  const formattedName = deidadNombre
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // elimina tildes

  // Buscar coincidencia flexible
  for (const path in images) {
    const filename = path.split('/').pop().split('.')[0]
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (filename === formattedName) {
      // Vite guarda la imagen bajo .default
      return images[path].default;
    }
  }

  // Si no encontró nada, usa el placeholder
  return '/placeholder.png';
};



  return (
    <div className="w-full lg:max-w-4xl min-h-screen my-0 lg:my-8 px-0 sm:px-4 lg:px-6">
      {/* Nombre de la cabaña */}
      <div className="text-center mb-8 lg:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-amber-600 mb-2 font-caesar-dressing-regular break-words">
          Mi Cabaña: {cabin.nombre || 'Sin nombre'}
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
                src={getCabinImage(cabin.deidad?.nombre)}
                alt={cabin.nombre || 'Cabaña'}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white text-lg sm:text-xl font-bold text-center">
              La cabaña de {cabin.deidad.nombre || 'Desconocida'}
            </h2>
            <p className="text-amber-100 text-center mt-2">
              Cabaña #{cabin.id ?? 'N/A'}
            </p>
          </div>

          {/* Lado derecho - Deidad */}
          <div className="w-full md:w-2/3 p-6">
            <h2 className="text-xl sm:text-2xl text-amber-600 font-bold mb-4 border-b border-amber-200 pb-2">
              Acerca de {cabin.deidad.nombre || 'esta deidad'}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed break-words">
              {cabin.deidad.lema || 'No hay descripción disponible.'}
            </p>

            {/* Ubicación */}
            <div className="flex items-start mb-4">
              <MapPinIcon className="text-orange-400 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800">Ubicación</h3>
                <p className="text-gray-700">{cabin.ubicacion || 'No especificada'}</p>
            {/* Descripción */}
            <h3 className="font-bold text-gray-800 mt-4">Descripción</h3>
            <p className="text-gray-700">
              {cabin.descripcion || 'Sin descripción disponible.'}
            </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinInfo;