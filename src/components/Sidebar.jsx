import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { basePath, menuItems } from "@constants/sidebar";
import { useSidebar } from "@hooks/useSidebar.js";
import { useNivelAcceso } from "@hooks/useNivelAcceso";

const Sidebar = () => {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
  const { nivel: nivelAcceso, loading: nivelLoading } = useNivelAcceso();

  // Mientras carga el nivel, no renderizamos nada o mostramos un placeholder
  if (nivelLoading) return null;

  const getItemDisabled = (path) => {
    switch (path) {
      case "campamento":
        return nivelAcceso < 1;
      case "cabanas":
      case "talleres":
      case "eventos":
      case "misiones":
        return nivelAcceso < 2;
      default:
        return false;
    }
  };

  const mensaje =
    nivelAcceso === 0
      ? "Completa tus datos personales para acceder a las secciones."
      : nivelAcceso === 1
      ? "Inscríbete a un período para desbloquear cabañas, talleres, eventos y misiones."
      : "";

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-amber-600 text-white border-b border-orange-700 z-50 relative">
        <h2 className="text-xl font-caesar-dressing-regular">Campista</h2>
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-2xl text-gray-700"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-amber-600 text-white flex flex-col z-50 transform transition-transform duration-300
        md:static md:h-full md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="p-6 text-2xl font-caesar-dressing-regular text-center border-b border-orange-700 hidden md:block">
          Campista
        </h2>
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const disabled = getItemDisabled(item.path);
            return (
              <NavLink
                key={item.path}
                to={disabled ? "#" : `${basePath}/${item.path}`}
                onClick={disabled ? (e) => e.preventDefault() : closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full p-2 rounded-lg transition 
                  ${isActive ? "bg-amber-500" : "hover:bg-amber-700"} 
                  ${disabled ? "opacity-40 cursor-not-allowed" : ""}`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {mensaje && (
          <p className="text-xs text-yellow-200 mt-2 p-2 text-center">{mensaje}</p>
        )}
      </aside>
    </>
  );
};

export default Sidebar;