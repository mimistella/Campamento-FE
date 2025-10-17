import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {  HiLogout } from "react-icons/hi";
import '../../index.css'; 
import { useSidebar } from "@hooks/useSidebar";
import {basePath, menuItems} from "@constants/instructorsidebar"
import { useAuth }from "@hooks/useAuth";
import ButtonBase from "@components/commonComp/ButtonBase";

export default function Sidebar() {

  const { isOpen, toggleSidebar, closeSidebar } = useSidebar();
   const { logout } = useAuth();   
  const handleLogout = () => {
    logout();
    closeSidebar();
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-amber-600 text-white border-b border-orange-700">
        <h2 className="text-xl font-caesar-dressing-regular">Instructor</h2>
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-2xl"
        >
          {isOpen ? <X /> : <Menu />}
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
        md:static md:h-full md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-caesar-dressing-regular text-center border-b border-orange-700 hidden md:block">
          Instructor
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={`${basePath}/${item.path}`}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full p-2 rounded-lg transition ${
                  isActive
                    ? "bg-amber-500"
                    : "hover:bg-amber-700"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

         {/* Botón de logout */}
                <div className="p-4 border-t border-orange-700">
                  <ButtonBase
                    onClick={handleLogout}
                    variant="contained"
                    className="w-full flex items-center justify-center gap-2 !bg-amber-500 !hover:bg-amber-600 text-white"
                  >
                    <HiLogout className="w-5 h-5" />
                    Cerrar sesión
                  </ButtonBase>
                </div>
            
      </aside>
    </>
  );
}
