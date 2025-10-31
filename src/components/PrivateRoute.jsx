import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@context/AuthContext";

export const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="*" replace />;
  }

  return <Outlet />;
};