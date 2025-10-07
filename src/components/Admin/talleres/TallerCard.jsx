import  ButtonBase  from "@components/commonComp/ButtonBase";
import { useNavigate } from "react-router-dom";

export default function TallerCard({ taller}) {
  const navigate= useNavigate();

  return (
    <li className="p-4 bg-white rounded-lg shadow border border-gray-200">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{taller.titulo}</h2>
        <p className="text-sm text-gray-600 mb-2">{taller.descripcion}</p>
        <div className="text-sm text-gray-500">
          <p><strong>Fecha:</strong> {new Date(taller.fechaHora).toLocaleString("es-AR")}</p>
          <p><strong>Lugar:</strong> {taller.lugar}</p>
          <p>
            <strong>Instructor:</strong> {taller.instructor.nombre} {taller.instructor.apellido}
          </p>
        </div>
      </div>
      <ButtonBase
        variant="contained"
        color="amber"
        onClick={() => navigate(`/admin/talleres/editar/${taller.id}`)}
        className="mt-3"
      >
        Editar
      </ButtonBase>
    </li>
  );
}