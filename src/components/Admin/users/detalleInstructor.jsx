import { useState, useEffect } from "react";
import { useInstructor } from "@hooks/useInstructor";
import { useUsuarios } from "@hooks/useUsuario";
import api from "@hooks/useApi";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useToaster } from "@hooks/useToaster";

export default function UserDetailInstructor({ userData }) {
  const { talleres: initialTalleres, loading: initialLoading } = useInstructor();
  const { usuarios } = useUsuarios();
  const { success, error } = useToaster();

  const [talleres, setTalleres] = useState([]);
  const [loading, setLoading] = useState(initialLoading);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [nuevoInstructorId, setNuevoInstructorId] = useState("");
  const [activo, setActivo] = useState(userData.activo !== false); // true si está activo

  // Inicializar talleres
  useEffect(() => {
    setTalleres(initialTalleres || []);
    setLoading(initialLoading);
  }, [initialTalleres, initialLoading]);

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

  const openModal = (taller) => {
    setSelectedTaller(taller);
    setNuevoInstructorId("");
    setModalOpen(true);
  };

  const assignInstructor = async () => {
    if (!selectedTaller || !nuevoInstructorId) return;

    try {
      await api.patch(`/talleres/${selectedTaller.id}`, { instructor: Number(nuevoInstructorId) });
      setTalleres((prev) =>
        prev.map((t) =>
          t.id === selectedTaller.id
            ? { ...t, instructor: Number(nuevoInstructorId) }
            : t
        )
      );
      setModalOpen(false);
      alert("Instructor asignado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al asignar instructor");
    }
  };

  const handleDeactivate = async () => {
    if (Italler.length > 0) {
      alert("Este instructor todavía tiene talleres asignados y no puede ser desactivado.");
      return;
    }

    const confirm = window.confirm("¿Estás seguro de desactivar este instructor?");
    if (!confirm) return;

    try {
      await api.delete(`/instructor/${userData.id}`);
      setActivo(false); 
      success("El instructor ha sido desactivado");
    } catch (err) {
      console.error(err);
      error("No se pudo desactivar el instructor");
    }
  };

  const desactivarDisabled = !activo || Italler.length > 0;

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Título principal */}
      <h1 className="w-full text-center text-white text-3xl md:text-4xl font-caesar-dressing-regular bg-amber-500 py-4 rounded-md shadow-md">
        Perfil del Instructor
      </h1>

      {/* Perfil del instructor */}
      <section className="bg-white text-orange-900 shadow-md rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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

        {/* Botón Desactivar */}
        <div className="mt-6 flex justify-center">
          <ButtonBase
            variant="contained"
            color="amber"
            onClick={handleDeactivate}
            disabled={desactivarDisabled}
          >
            {activo ? "Desactivar instructor" : "Instructor desactivado"}
          </ButtonBase>
        </div>
      </section>

      {/* Talleres */}
      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-4">Talleres que dicta</h2>
        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : Italler?.length ? (
          <ul className="space-y-3">
            {Italler.map((t) => (
              <li key={t.id} className="flex flex-col md:flex-row md:items-center justify-between bg-amber-100 p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-700">{t.titulo} — {formatDate(t.fechaHora)}</span>
                <ButtonBase
                  className="mt-2 md:mt-0"
                  onClick={() => openModal(t)}
                  variant="contained"
                  color="amber"
                >
                  Asignar a otro instructor
                </ButtonBase>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tiene talleres asignados.</p>
        )}
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Asignar un nuevo instructor al taller "{selectedTaller?.titulo}"
            </h3>
            <select
              className="w-full border rounded p-2 mb-4"
              value={nuevoInstructorId}
              onChange={(e) => setNuevoInstructorId(e.target.value)}
            >
              <option value="">Seleccionar instructor</option>
              {usuarios
                .filter(u => u.role === "instructor")
                .map((ins) => (
                  <option key={ins.id} value={ins.id}>
                    {ins.nombre} {ins.apellido}
                  </option>
                ))}
            </select>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition"
                onClick={assignInstructor}
              >
                Asignar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}