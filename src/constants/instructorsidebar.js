import { Hammer, User, Users2} from "lucide-react";
export const basePath = "/instructor";


export const menuItems = [
  { label: "Mi perfil", path: "perfil", icon: User },
  { label: "Mis alumnos", path: "alumnos", icon: Users2 },
  { label: "Mis Talleres", path: "talleres", icon: Hammer },
];