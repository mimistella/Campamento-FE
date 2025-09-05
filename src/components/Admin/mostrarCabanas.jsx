import { useContext, useState } from "react";
import DashboardContext from "../../context/DashboardContext";

const MostrarCabanas = () => {
  const { cabanias, getOcupacion, loading, cabaniasActivas, refreshData, lastUpdated } = useContext(DashboardContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [mostrarSoloActivas, setMostrarSoloActivas] = useState(false);
  const itemsPerPage = 3;

 // última actualización
  const formatLastUpdate = () => {
    if (!lastUpdated) return "Nunca";
    return new Date(lastUpdated).toLocaleTimeString();
  };

  if (loading) return <p>Cargando cabañas...</p>;
  
  // Obtener las cabañas según el filtro seleccionado
  const cabaniasFiltradas = mostrarSoloActivas ? cabaniasActivas: cabanias;
  
  if (!cabaniasFiltradas || cabaniasFiltradas.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-amber-700">Cabañas del campamento</h1>
          <button
            onClick={() => setMostrarSoloActivas(!mostrarSoloActivas)}
            className={`px-4 py-2 rounded ${
              mostrarSoloActivas
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {mostrarSoloActivas ? "Mostrar todas las cabañas" : "Mostrar solo cabañas activas"}
          </button>
        </div>
        <p className="text-center py-8 text-gray-500">
          {mostrarSoloActivas 
            ? "No hay cabañas activas en este momento" 
            : "No hay cabañas disponibles"}
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(cabaniasFiltradas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCabanias = cabaniasFiltradas.slice(startIndex, startIndex + itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-amber-700">
            Cabañas del campamento
          </h1>
          <p className="text-sm text-gray-500">
            Actualizado: {formatLastUpdate()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refreshData}
            className="px-3 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Actualizar
          </button>
          <button
            onClick={() => {
              setMostrarSoloActivas(!mostrarSoloActivas);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded ${
              mostrarSoloActivas
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {mostrarSoloActivas ? "Mostrar todas" : "Solo activas"}
          </button>
        </div>
      </div>
 

      {/* Indicador de filtro activo */}
      {mostrarSoloActivas && (
        <div className="mb-4 p-3 bg-amber-100 text-amber-800 rounded-lg">
          <p className="text-sm">Mostrando solo cabañas con hospedajes activos</p>
        </div>
      )}

      {/* Lista de cabañas */}
      <ul className="space-y-4 mb-6">
        {currentCabanias.map((c) => (
          <li
            key={c.id}
            className="p-5 bg-white rounded-lg shadow border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {c.nombre}
            </h2>
            <p className="text-sm text-gray-600 mb-2">{c.descripcion}</p>
            <div className="text-sm text-gray-500">
              <p>
                <strong>Capacidad:</strong> {c.capacidad}
              </p>
              <p>
                <strong>Ubicación:</strong> {c.ubicacion}
              </p>
              <p>
                <strong>Ocupación actual:</strong> {getOcupacion(c.id)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Paginación */}
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          Anterior
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-amber-600 text-white font-bold'
                : page === '...'
                ? 'bg-transparent cursor-default'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          Siguiente
        </button>
      </div>

      {/* Información de paginación */}
      <p className="text-center text-gray-600 mt-2">
        Página {currentPage} de {totalPages} • {cabaniasFiltradas.length} cabañas
        {mostrarSoloActivas ? " activas" : " en total"}
      </p>
    </div>
  );
};

export default MostrarCabanas;