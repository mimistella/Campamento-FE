// providers/DeidadesProvider.jsx
import DeidadesContext  from "@context/DeidadesContext.js";
import { useDeidades } from "../hooks/useDeidades.js";

export function DeidadesProvider({ children }) {
  const deidadesData = useDeidades();

  return (
    <DeidadesContext.Provider value={deidadesData}>
      {children}
    </DeidadesContext.Provider>
  );
}