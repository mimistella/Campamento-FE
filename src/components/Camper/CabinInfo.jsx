import React from "react";
import { MapPinIcon, SparklesIcon } from "lucide-react";

const CabinInfo = ({ cabin }) => {
  if (!cabin) return null;

  const images = import.meta.glob("/src/assets/cabanias/*.{png,jpg,jpeg,webp}", {
    eager: true,
  });

  const getCabinImage = (deidadNombre) => {
    if (!deidadNombre) return "/placeholder.png";

    const formattedName = deidadNombre
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    for (const path in images) {
      const filename = path
        .split("/")
        .pop()
        .split(".")[0]
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      if (filename === formattedName) return images[path].default;
    }

    return "/placeholder.png";
  };
  
  const formatDescription = (text) => {
    if (!text) return "Sin descripción disponible.";

    const sections = {
      "Estructura y Aspecto": text.split("Atributos de los Campistas:")[0]?.replace("Estructura y Aspecto:", "").trim(),
      "Atributos de los Campistas": text.split("Atributos de los Campistas:")[1]?.split("Actividades Destacadas:")[0].trim(),
      "Actividades Destacadas": text.split("Actividades Destacadas:")[1]?.trim()
    };

    // Función para limpiar y formatear items con guiones
    const formatItems = (content) => {
      // Buscar patrones como "-Texto" o " -Texto" o "Texto -más texto"
      const items = [];
      let currentText = '';
      
      // Separar por guiones que indican nuevos items
      const parts = content.split(/(?=\s*-[^\s])/g); // Separar por "-" seguido de caracter
      
      parts.forEach(part => {
        const trimmed = part.trim();
        if (trimmed.startsWith('-')) {
          // Si ya hay texto acumulado, agregarlo como párrafo
          if (currentText) {
            items.push({ type: 'text', content: currentText });
            currentText = '';
          }
          // Agregar el item con guión
          items.push({ type: 'item', content: trimmed.substring(1).trim() });
        } else {
          // Acumular texto normal
          currentText += (currentText ? ' ' : '') + trimmed;
        }
      });
      
      // Agregar el último texto si queda
      if (currentText) {
        items.push({ type: 'text', content: currentText });
      }
      
      return items;
    };

    return Object.entries(sections).map(([title, content]) => {
      if (!content) return null;

      const formattedItems = formatItems(content);

      return (
        <div key={title} className="mb-5">
          <h4 className="text-lg font-semibold text-amber-600 mb-2">{title}</h4>
          <div className="space-y-2">
            {formattedItems.map((item, index) => {
              if (item.type === 'text') {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                );
              } else {
                return (
                  <div key={index} className="flex items-start text-gray-700 leading-relaxed">
                    <SparklesIcon className="h-5 w-5 flex-shrink-0 text-orange-700 mr-2 mt-0.5" />
                    <span>{item.content}</span>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full lg:max-w-5xl min-h-screen my-8 px-4 lg:px-6 mx-auto">
      <div className="flex flex-col md:flex-row h-full">
      {/* Lado izquierdo - Imagen fija */}
      <div className="w-full md:w-1/3 bg-amber-600 p-6 flex flex-col items-center">
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
          <img
            src={getCabinImage(cabin.deidad?.nombre)}
            alt={cabin.nombre || "Cabaña"}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-white text-lg sm:text-xl font-bold text-center">
          La cabaña de {cabin.deidad.nombre || "Desconocida"}
        </h2>
        <p className="text-amber-100 text-center mt-2">Cabaña #{cabin.id ?? "N/A"}</p>
        </div>

        {/* Contenido a la derecha */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl sm:text-4xl text-amber-600 mb-4 font-caesar-dressing-regular break-words">
            Mi Cabaña: {cabin.nombre || "Sin nombre"}
          </h1>

          <div className="mb-4">
            <h3 className="font-bold text-gray-800 flex items-center mb-2">
              <MapPinIcon className="h-5 w-5 text-orange-400 mr-2" /> Ubicación
            </h3>
            <p className="text-gray-700">{cabin.ubicacion || "No especificada"}</p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-gray-800 mb-2">Acerca de {cabin.deidad?.nombre}</h3>
            <p className="text-gray-700 mb-4">{cabin.deidad?.descripcion || "No hay descripción disponible."}</p>
          </div>

          {/* Texto formateado con secciones y lista con íconos */}
          <div>{formatDescription(cabin.descripcion)}</div>
        </div>
      </div>
    </div>
  );
};

export default CabinInfo;