import { DashboardCard } from "./DashboardCard";
import { useContext } from "react";
import DashboardContext  from "../../context/DashboardContext";

export default function AdminDashboard() {
  const { diasCampamento, inscriptosPeriodo, instructores, cabaniasActivasPeriodo} =
    useContext(DashboardContext);



  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido, Admin!</h1>
      <p className="text-lg text-gray-600 mt-1 italic">
        "Donde los semidioses encuentran su destino ⚡"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <DashboardCard
          title="Días para el próximo campamento"
          value={diasCampamento !== null ? `${diasCampamento} días` : null}
        />
        <DashboardCard title="Cantidad de inscriptos" value={inscriptosPeriodo ? inscriptosPeriodo.length :0} />
        <DashboardCard title="Cantidad de instructores" value={instructores ? instructores.length : 0} />
        <DashboardCard title="Cabañas activas" value={cabaniasActivasPeriodo ? cabaniasActivasPeriodo.length : 0} />
      </div>
    </div>
  );
}