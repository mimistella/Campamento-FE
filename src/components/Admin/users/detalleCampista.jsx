import { useState, useEffect } from "react";
import api from "@hooks/useApi";

export default function UserDetailCampista({ userData }) {
  const [userTalleres, setUserTalleres] = useState([]);
  const [userPeriodos, setUserPeriodos] = useState([]);
  const [hospedaje, setHospedaje] = useState(null);

  const [loadingTalleres, setLoadingTalleres] = useState(true);
  const [loadingPeriodos, setLoadingPeriodos] = useState(true);
  const [loadingHospedaje, setLoadingHospedaje] = useState(true);

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
      } catch (error) {
        console.error("Error cargando datos del campista:", error);
      } finally {
        setLoadingTalleres(false);
        setLoadingPeriodos(false);
        setLoadingHospedaje(false);
      }
    }

    fetchData();
  }, [userData.id]);

  return (
    <div className="p-4 space-y-6">
      {/* Perfil */}
      <section>
        <h2 className="text-xl font-bold mb-2">Perfil del campista</h2>
        <div className="grid grid-cols-2 gap-2">
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
      </section>

      {/* Hospedaje */}
      <section>
        <h3 className="text-lg font-semibold">Hospedaje</h3>
        {loadingHospedaje ? (
          <p>Cargando...</p>
        ) : hospedaje ? (
          <p>Se hospeda en la cabaña <strong>{hospedaje.cabania.nombre}</strong></p>
        ) : (
          <p>No tiene hospedaje asignado.</p>
        )}
      </section>

      {/* Talleres */}
      <section>
        <h3 className="text-lg font-semibold">Talleres inscriptos</h3>
        {loadingTalleres ? (
          <p>Cargando...</p>
        ) : userTalleres.length ? (
          <ul className="list-disc ml-5">
            {userTalleres.map((i) => (
              <li key={i.id}>
                {i.taller?.titulo} — {i.taller?.fechaHora ? new Date(i.taller.fechaHora).toLocaleString("es-AR", { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }) : "Sin fecha"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tiene talleres asignados.</p>
        )}
      </section>

      {/* Periodos */}
      <section>
        <h3 className="text-lg font-semibold">Periodos</h3>
        {loadingPeriodos ? (
          <p>Cargando...</p>
        ) : userPeriodos.length ? (
          <ul className="list-disc ml-5">
            {userPeriodos.map((p) => (
              <li key={p.id}>{p.periodo?.nombre || "Sin nombre"}</li>
            ))}
          </ul>
        ) : (
          <p>No tiene periodos asignados.</p>
        )}
      </section>
    </div>
  );
}