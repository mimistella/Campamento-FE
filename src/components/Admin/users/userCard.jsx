import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  const handleClick = () => {
      navigate(`/admin/usuarios/editar/${user.id}/${user.role}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-lg p-4 hover:shadow-md transition"
    >
      <h3>{user.nombre} {user.apellido}</h3>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  );
}