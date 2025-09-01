
export default function AdminDashboard() {
return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido, Admin!</h1>
      <p className="text-lg text-gray-600 mt-1 italic">
        "Donde los semidioses encuentran su destino ⚡"
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-700 font-semibold">
            Días para el próximo campamento
          </h3>
          <p className="text-2xl font-bold text-amber-600 mt-2">12 días</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-700 font-semibold">Cantidad de inscriptos</h3>
          <p className="text-2xl font-bold text-amber-600 mt-2">128</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-700 font-semibold">
            Cantidad de instructores
          </h3>
          <p className="text-2xl font-bold text-amber-600 mt-2">15</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-gray-700 font-semibold">Cabañas activas</h3>
          <p className="text-2xl font-bold text-amber-600 mt-2">10</p>
        </div>
      </div>
    </div>
  );
}