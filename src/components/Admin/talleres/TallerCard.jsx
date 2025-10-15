import { useState } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useNavigate } from "react-router-dom";
import {MousePointerIcon} from "lucide-react"
export default function TallerCard({ taller}) {
  const navigate= useNavigate();
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
          <h2 className="text-xl font-semibold text-gray-800 mb-1">{taller.titulo}</h2>
          
          {/* Información expandible */}
          {isExpanded && (
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-600">{taller.descripcion}</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Fecha:</strong> {new Date(taller.fechaHora).toLocaleString("es-AR")}</p>
                <p><strong>Lugar:</strong> {taller.lugar}</p>
                <p><strong>Instructor:</strong> {taller.instructor.nombre} {taller.instructor.apellido}</p>
                <p><strong>Cupo:</strong> {taller.cupo} personas</p>
               <p><strong>Duración:</strong> {taller.duracionMin} minuto{taller.duracionMin !== 1 ? 's' : ''}</p>
              <p><strong>Período:</strong> {taller.periodo.id}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Indicador simple de expandir/contraer */}
        <div className="text-sm text-gray-400 ml-2">
          {isExpanded ? '▲' : '▼'}
        </div>
      </div>
      
      {/* Botón Editar */}
      {isExpanded && (
        <div className="mt-3 flex justify-end">
          <ButtonBase
            variant="contained"
            color="amber"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/talleres/editar/${taller.id}`);
            }}
          >
            Editar
          </ButtonBase>
        </div>
      )}
      
      {/* Texto de se puede expandir */}
      {!isExpanded && (
        <div  className="text-xs text-gray-400 mt-2">
           <MousePointerIcon className="inline h-3 w-3 mr-1" />
          Haz clic para ver más detalles
        </div>
      )}
    </li>
  );
}