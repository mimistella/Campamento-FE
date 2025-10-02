export function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-gray-700 font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-amber-600 mt-2">
        {value !== null ? value : "Cargando..."}
      </p>
    </div>
  );
}
