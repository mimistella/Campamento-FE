import { Home, Landmark, Hammer, Calendar, Map, Users} from "lucide-react";
export const basePath = "/admin";
export const menuItems = [
  { path: "dashboard", label: "Dashboard", icon: Home },
  { path: "cabanas", label: "Cabañas", icon: Landmark },
  { path: "talleres", label: "Talleres", icon: Hammer },
  { path: "eventos", label: "Eventos", icon: Calendar },
  { path: "misiones", label: "Misiones", icon: Map },
  { path: "campistas", label: "Campistas", icon: Users },
];
