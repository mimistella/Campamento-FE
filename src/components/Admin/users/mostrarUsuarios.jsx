import { useState, useMemo } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useUsuarios } from "@hooks/useUsuario";
import List from "@components/commonComp/List";
import UserCard from "@components/Admin/users/userCard";
import ButtonBase from "@components/commonComp/ButtonBase";
import UserForm from "@forms/UserForm";
import { useToaster } from "@hooks/useToaster";

export default function MostrarUsuarios() {
  const { usuarios, refreshData, lastUpdated, loading } = useUsuarios();
  const { success, error, promise } = useToaster();
  const [filtroRol, setFiltroRol] = useState(""); 
  const [openForm, setOpenForm] = useState(false);
  const [userSeleccionado, setUserSeleccionado] = useState(null);

  const handleCerrarForm = () => {
    setOpenForm(false);
    setUserSeleccionado(null);
  };

  const handleRefresh = async () => {
    await promise(refreshData, {
      loadingMsg: "Actualizando usuarios...",
      successMsg: "Usuarios actualizados correctamente ",
      errorMsg: "Error al actualizar usuarios ",
    });
  };

  const usuariosFiltrados = useMemo(() => {
    return usuarios
      .filter((u) => (filtroRol ? u.role === filtroRol : true));
  }, [usuarios, filtroRol]);

  if (loading) return <p className="text-gray-500">Cargando usuarios...</p>;

  return (
    <div className="min-h-screen p-6 bg-amber-50">
      {/* Título y botones */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-amber-700">Usuarios Disponibles</h1>
          <p className="text-sm text-gray-500">
            Actualizado: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Nunca"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <ButtonBase color="amber" onClick={handleRefresh}>Actualizar</ButtonBase>

          {/* Select filtro por rol */}
          <select
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:ring-amber-400 focus:border-amber-400"
          >
            <option value="">Todos los roles</option>
            <option value="campista">Campista</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>

          <ButtonBase color="amber" onClick={() => setOpenForm(true)}>+ Crear usuario</ButtonBase>
        </div>
      </div>

      {/* Estado cuando no hay usuarios */}
      {(!usuariosFiltrados || usuariosFiltrados.length === 0) && (
        <p className="text-center py-8 text-gray-500">
        </p>
      )}

      {/* Lista */}
      {usuariosFiltrados && usuariosFiltrados.length > 0 && (
        <List
          items={usuariosFiltrados}
          itemsPerPage={6}
          renderItem={(user) => (
            <UserCard
               key={`${user.role}-${user.id}`}
              user={user}
            />
          )}
        />
      )}

      {/* Modal Formulario */}
      <Dialog open={openForm} onClose={handleCerrarForm} maxWidth="sm" fullWidth>
        <DialogTitle className="!font-caesar-dressing-regular text-white bg-amber-400">
          {userSeleccionado ? "Editar Usuario" : "Crear Usuario"}
        </DialogTitle>
        <DialogContent dividers>
          <UserForm
            user={userSeleccionado}
            onSuccess={() => {
              success(userSeleccionado ? "Usuario actualizado correctamente" : "Usuario creado con éxito");
              handleCerrarForm();
              refreshData();
            }}
            onError={() => error("Ocurrió un error al guardar el usuario")}
          />
        </DialogContent>
        <DialogActions>
          <ButtonBase variant="outlined" color="gray" onClick={handleCerrarForm}>Cerrar</ButtonBase>
        </DialogActions>
      </Dialog>
    </div>
  );
}