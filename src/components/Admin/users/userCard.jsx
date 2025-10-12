import { useState } from "react";
import ButtonBase from "@components/commonComp/ButtonBase";
import { MousePointerIcon } from "lucide-react";

export default function UserCard({ user }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <li
      className={`p-4 bg-white rounded-lg shadow border border-gray-200 cursor-pointer transition-all duration-300 ${
        isExpanded ? "ring-2 ring-amber-500" : "hover:shadow-md"
      }`}
      onClick={toggleExpand}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {user.nombre} {user.apellido}
          </h2>
          <p className="text-sm text-gray-600 capitalize">{user.rol}</p>
        </div>
        <div className="text-sm text-gray-400">{isExpanded ? "▲" : "▼"}</div>
      </div>

      {isExpanded && (
        <div className="mt-3 text-sm text-gray-600 space-y-1">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Telefono:</strong> {user.telefono}</p>

        </div>
      )}

      {!isExpanded && (
        <div className="text-xs text-gray-400 mt-2">
          <MousePointerIcon className="inline h-3 w-3 mr-1" />
          Haz clic para ver más detalles
        </div>
      )}
    </li>
  );
}