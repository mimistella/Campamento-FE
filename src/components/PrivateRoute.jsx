import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@context/AuthContext";

export const PrivateRoute = ({ adminOnly = false }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <div>Cargando...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};