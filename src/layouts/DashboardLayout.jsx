import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard-wrapper">
      <h1>hey dashboard layout</h1>
      <Outlet />
    </div>
  );
}
