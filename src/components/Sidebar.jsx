import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useSidebar } from "../hooks/useSidebar";
import { basePath, menuItems } from "../constants/sidebarct";

const Sidebar = () => {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold text-amber-700">Campista</h2>
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
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 p-6 transform transition-transform duration-300
        md:static md:h-screen md:translate-x-0 md:flex md:flex-col md:w-56 md:border-r md:border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold text-amber-700 mb-6 hidden md:block">
          Campista
        </h2>
        <nav className="flex flex-col gap-1">
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={`${basePath}/${item.path}`}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md font-medium transition-colors ${
                  isActive
                    ? "bg-amber-200 text-amber-800"
                    : "text-gray-700 hover:bg-amber-100 hover:text-amber-700"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;