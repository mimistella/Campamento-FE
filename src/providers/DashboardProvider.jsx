import DashboardContext from "../context/DashboardContext";
import { useDashboard } from "../hooks/useDashboard";

export function DashboardProvider({ children }) {
  const value = useDashboard();

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}