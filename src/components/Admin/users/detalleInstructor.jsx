import { useInstructor } from "@hooks/useInstructor";

export default function UserDetailInstructor({ userData }) {
  const { talleres, loading } = useInstructor();

  const Italler = (talleres || []).filter((t) => {
    if (!t?.instructor || !userData?.id) return false;
    if (typeof t.instructor === "number") return t.instructor === userData.id;
    if (typeof t.instructor === "string") return Number(t.instructor) === userData.id;
    return t.instructor?.id === userData.id;
  });

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "1800-01-01T00:00:00.000Z") return "No registrado";
    const date = new Date(dateStr);
    return date.toLocaleString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="p-4 space-y-6">
      <section>
        <h2 className="text-xl font-bold mb-2">Perfil del instructor</h2>
        <div className="grid grid-cols-2 gap-2">
      <p><strong>Nombre:</strong> {userData.nombre || "No registrado"}</p>
      <p><strong>Apellido:</strong> {userData.apellido || "No registrado"}</p>
      <p><strong>Email:</strong> {userData.email || "No registrado"}</p>
      <p><strong>Teléfono:</strong> {userData.telefono || "No registrado"}</p>
      <p>
        <strong>Fecha de nacimiento:</strong>{" "}
        {userData.fechaNac && userData.fechaNac !== "1800-01-01T00:00:00.000Z"
          ? new Date(userData.fechaNac).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "No registrado"}
      </p>
      <p><strong>País:</strong> {userData.pais || "No registrado"}</p>
      <p><strong>Ciudad:</strong> {userData.ciudad || "No registrado"}</p>
      <p><strong>Dirección:</strong> {userData.direccion || "No registrado"}</p>
      <p><strong>Alergias:</strong> {userData.alergias || "No registrado"}</p>
      <p><strong>Grupo sanguíneo:</strong> {userData.grupoSanguineo || "No registrado"}</p>
      <p><strong>Teléfono de emergencia:</strong> {userData.telefonoEmergencia || "No registrado"}</p>
      </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold">Talleres que dicta</h3>
        {loading ? (
          <p>Cargando...</p>
        ) : Italler?.length ? (
          <ul className="list-disc ml-5">
            {Italler.map((t) => (
              <li key={t.id}>{t.titulo} — {formatDate(t.fechaHora)}</li>
            ))}
          </ul>
        ) : (
          <p>No tiene talleres asignados.</p>
        )}
      </section>
    </div>
  );
}