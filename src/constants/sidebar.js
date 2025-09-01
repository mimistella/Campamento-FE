import { Home, Landmark, Hammer, Calendar, Map, User} from "lucide-react";
export const basePath = "/campista";


export const menuItems = [
  { label: "Mi perfil", path: "perfil", icon: User },
  { label: "Campamento", path: "campamento", icon: Home },
  { label: "Mi cabaña", path: "cabanas", icon: Landmark },
  { label: "Talleres disponibles", path: "talleres", icon: Hammer },
  { label: "Eventos disponibles", path: "eventos", icon: Calendar },
  { label: "Mis misiones", path: "misiones", icon: Map },
];