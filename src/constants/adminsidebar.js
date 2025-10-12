import { Home, Landmark, Hammer, Calendar, Map, Users,CalendarClock} from "lucide-react";
export const basePath = "/admin";
export const menuItems = [
  { path: "dashboard", label: "Dashboard", icon: Home },
  { path: "cabanas", label: "Cabañas", icon: Landmark },
  { path: "talleres", label: "Talleres", icon: Hammer },
  { path: "eventos", label: "Eventos", icon: Calendar },
  { path: "misiones", label: "Misiones", icon: Map },
  { path: "usuarios", label: "Usuarios", icon: Users },
  {path: "periodos", label: "Períodos", icon: CalendarClock}
];
