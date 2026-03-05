import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-wrapper">
      <h1>hey auth layout</h1>
      <Outlet />
    </div>
  );
}
