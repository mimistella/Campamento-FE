import DashboardContext from "../context/DashboardContext";
import { useDashboardData } from "../hooks/useDashboardData";

export function DashboardProvider({ children }) {
  const dashboardData = useDashboardData();

  return (
    <DashboardContext.Provider value={dashboardData}>
      {children}
    </DashboardContext.Provider>
  );
}