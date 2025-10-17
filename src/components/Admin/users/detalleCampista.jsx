import { useState, useEffect } from "react";
import api from "@hooks/useApi";
import ButtonBase from "@components/commonComp/ButtonBase";
import { useToaster } from "@hooks/useToaster";

export default function UserDetailCampista({ userData }) {
  const { success, error } = useToaster();
  const [userTalleres, setUserTalleres] = useState([]);
  const [userPeriodos, setUserPeriodos] = useState([]);
  const [hospedaje, setHospedaje] = useState(null);

  const [loadingTalleres, setLoadingTalleres] = useState(true);
  const [loadingPeriodos, setLoadingPeriodos] = useState(true);
  const [loadingHospedaje, setLoadingHospedaje] = useState(true);
  const [activo, setActivo] = useState(true); // estado del campista

  useEffect(() => {
    async function fetchData() {
      try {
        const [inscripcionesResp, periodosResp, hospedajesResp] = await Promise.all([
          api.get("/inscripcion-taller"),
          api.get("/inscripcion-periodo"),
          api.get("/hospedaje")
        ]);

        setUserTalleres(
          (inscripcionesResp.data.data || []).filter(i => i.campista?.id === userData.id)
        );

        setUserPeriodos(
          (periodosResp.data.data || []).filter(i => i.campista === userData.id)
        );

        setHospedaje(
          (hospedajesResp.data.data || []).find(h => h.campista?.id === userData.id) || null
        );
      } catch (err) {
        console.error("Error cargando datos del campista:", err);
      } finally {
        setLoadingTalleres(false);
        setLoadingPeriodos(false);
        setLoadingHospedaje(false);
      }
    }

    fetchData();
  }, [userData.id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "No registrado";
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

  const handleDeactivate = async () => {
    const confirm = window.confirm("¿Estás seguro de desactivar este campista?");
    if (!confirm) return;

    try {
      await api.delete(`/campista/${userData.id}`);
      setActivo(false);
      success("El campista ha sido desactivado");
    } catch (err) {
      console.error(err);
      error("No se pudo desactivar el campista");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Título principal */}
      <h1 className="w-full text-center text-white text-3xl md:text-4xl font-caesar-dressing-regular bg-amber-500 py-4 rounded-md shadow-md">
        Perfil del Campista
      </h1>

      {/* Perfil del campista */}
      <section className="bg-white text-orange-900 shadow-md rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <p><strong>Nombre:</strong> {userData.nombre || "No registrado"}</p>
          <p><strong>Apellido:</strong> {userData.apellido || "No registrado"}</p>
          <p><strong>Email:</strong> {userData.email || "No registrado"}</p>
          <p><strong>Teléfono:</strong> {userData.telefono || "No registrado"}</p>
          <p><strong>País:</strong> {userData.pais || "No registrado"}</p>
          <p><strong>Ciudad:</strong> {userData.ciudad || "No registrado"}</p>
          <p><strong>Dirección:</strong> {userData.direccion || "No registrado"}</p>
          <p><strong>Fecha de nacimiento:</strong> {userData.fechaNac ? new Date(userData.fechaNac).toLocaleDateString("es-AR") : "No registrado"}</p>
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
            disabled={!activo}
          >
            {activo ? "Desactivar campista" : "Campista desactivado"}
          </ButtonBase>
        </div>
      </section>

      {/* Hospedaje */}
      <section className="bg-white text-orange-900 shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-4">Hospedaje</h2>
        {loadingHospedaje ? (
          <p className="text-gray-500">Cargando...</p>
        ) : hospedaje ? (
          <p>Se hospeda en la cabaña <strong>{hospedaje.cabania.nombre}</strong></p>
        ) : (
          <p className="text-gray-500">No tiene hospedaje asignado.</p>
        )}
      </section>

      {/* Talleres */}
      <section className="bg-white text-orange-900 shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-4">Talleres inscriptos</h2>
        {loadingTalleres ? (
          <p className="text-gray-500">Cargando...</p>
        ) : userTalleres.length ? (
          <ul className="space-y-3">
            {userTalleres.map((i) => (
              <li key={i.id} className="bg-amber-100 p-4 rounded-lg shadow-sm flex justify-between items-center">
                <span className="font-medium text-gray-700">
                  {i.taller?.titulo} — {i.taller?.fechaHora ? formatDate(i.taller.fechaHora) : "Sin fecha"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tiene talleres asignados.</p>
        )}
      </section>

      {/* Periodos */}
      <section className="bg-white text-orange-900 shadow-md rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-4">Periodos</h2>
        {loadingPeriodos ? (
          <p className="text-gray-500">Cargando...</p>
        ) : userPeriodos.length ? (
          <ul className="space-y-2">
            {userPeriodos.map((p) => (
              <li key={p.id} className="bg-amber-100 p-3 rounded-lg shadow-sm">
                {p.periodo?.nombre || "Sin nombre"}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tiene periodos asignados.</p>
        )}
      </section>
    </div>
  );
}