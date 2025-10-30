import { DashboardCard } from "./DashboardCard";
import { useContext } from "react";
import DashboardContext  from "@context/DashboardContext";
import PeriodosContext from "@context/PeriodosContext.js";

export default function AdminDashboard() {
// const { diasCampamento, campamentoEnCurso, inscriptosPeriodo, instructores, cabaniasActivasPeriodo } =
// useContext(DashboardContext);

const { diasCampamento, campamentoEnCurso, instructores, cabaniasActivasPeriodo } =
useContext(DashboardContext);
const { cantidadInscriptosPeriodo } = useContext(PeriodosContext)


const tituloDias = campamentoEnCurso
  ? "Días para que termine el campamento"
  : "Días para el próximo campamento";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido, Admin!</h1>
      <p className="text-lg text-gray-600 mt-1 italic">
        "Donde los semidioses encuentran su destino ⚡"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <DashboardCard title={tituloDias} value={diasCampamento !== null ? `${diasCampamento} días` : null}/>
        <DashboardCard title="Cantidad de inscriptos" value={cantidadInscriptosPeriodo ? cantidadInscriptosPeriodo.length :0} />
        <DashboardCard title="Cantidad de instructores" value={instructores ? instructores.length : 0} />
        <DashboardCard title="Cabañas activas" value={cabaniasActivasPeriodo ? cabaniasActivasPeriodo.length : 0} />
      </div>
    </div>
  );
}