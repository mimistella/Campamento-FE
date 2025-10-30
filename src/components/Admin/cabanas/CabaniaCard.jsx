import { useState } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useNavigate } from "react-router-dom";
import { MousePointerIcon } from 'lucide-react';

export default function CabaniaCard({ cabania, getOcupacion }) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li 
      className={`p-4 bg-white rounded-lg shadow border border-gray-200 cursor-pointer transition-all duration-300 ${
        isExpanded ? 'ring-2 ring-amber-500' : 'hover:shadow-md'
      }`}
      onClick={toggleExpand}
    >
      {/* Header siempre visible */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{cabania.nombre}</h2>
          
          {/* Información expandible */}
          {isExpanded && (
            <div className="mt-3 space-y-2">
              <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Capacidad:</strong> {cabania.capacidad}</p>
                <p><strong>Ubicación:</strong> {cabania.ubicacion}</p>
                <p><strong>Ocupación actual:</strong> {getOcupacion(cabania.id)}</p>
                {cabania.deidad && (
                  <p><strong>Deidad:</strong> {cabania.deidad.nombre}</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Indicador simple de expandir/contraer */}
        <div className="text-sm text-gray-400 ml-2">
          {isExpanded ? '▲' : '▼'}
        </div>
      </div>
      
      {/* Botón Editar - solo visible cuando está expandido */}
      {isExpanded && (
        <div className="mt-3 flex justify-end">
          <ButtonBase
            variant="contained"
            color="amber"
            onClick={(e) => {
              e.stopPropagation(); // Evitar que el clic se propague al li
              navigate(`/admin/cabanas/editar/${cabania.id}`);
            }}
          >
            Editar
          </ButtonBase>
        </div>
      )}
      
      {/* Indicador visual de que se puede expandir */}
      {!isExpanded && (
        <div className="text-xs text-gray-400 mt-2">
           <MousePointerIcon className="inline h-3 w-3 mr-1" />
          Haz clic para ver más detalles
        </div>
      )}
    </li>
  );
}