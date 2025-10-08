import ButtonBase from "@components/commonComp/ButtonBase";
import { useNavigate } from "react-router-dom";

export default function CabaniaCard({ cabania, getOcupacion }) {
  const navigate = useNavigate();

  return (
    <li className="p-4 bg-white rounded-lg shadow border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{cabania.nombre}</h2>
      <p className="text-sm text-gray-600 mb-2">{cabania.descripcion}</p>
      <div className="text-sm text-gray-500">
        <p><strong>Capacidad:</strong> {cabania.capacidad}</p>
        <p><strong>Ubicación:</strong> {cabania.ubicacion}</p>
        <p><strong>Ocupación actual:</strong> {getOcupacion(cabania.id)}</p>
      </div>

      <ButtonBase
        variant="contained"
        color="amber"
        onClick={() => navigate(`/admin/cabanas/editar/${cabania.id}`)}
        className="mt-3"
      >
        Editar
      </ButtonBase>
    </li>
  );
}