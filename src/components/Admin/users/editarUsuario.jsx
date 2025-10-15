import { useParams } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import { useEffect, useState } from "react";
import api from "@hooks/useApi";
import UserDetailAdmin from "./detalleAdmin";
import UserDetailCampista from "./detalleCampista";
import UserDetailInstructor from "./detalleInstructor";

export default function EditarUsuario() {
  const { id, role } = useParams();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      

      if (!id || !role) {
        console.warn("Esperando id o role válidos...");
        setLoading(false);
        return;
      }

      const endpointMap = {
        admin: `/admin/${id}`,
        administrador: `/admin/${id}`,
        instructor: `/instructor/${id}`,
        campista: `/campista/${id}`,
      };

      const endpoint = endpointMap[role.toLowerCase()];
      if (!endpoint) {
        console.error(" rol no reconocido:", role);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get(endpoint);
        if (!cancelled) {
          setUserData(res.data.data);
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [id, role]);

  if (loading) return <p>Cargando usuario...</p>;
  if (!userData) return <p>No se encontró el usuario.</p>;

  if (role?.toLowerCase() === "admin" && user?.id !== userData?.id) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-red-600">
          No puedes editar el perfil de otro administrador.
        </h2>
      </div>
    );
  }

  switch (role?.toLowerCase()) {
    case "campista":
      return <UserDetailCampista userData={userData} />;
    case "instructor":
      return <UserDetailInstructor userData={userData} />;
    case "admin":
    case "administrador":
    default:
      return <UserDetailAdmin userData={userData} />;
  }
}