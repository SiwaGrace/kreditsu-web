import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlices";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logoutLoading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/auth/login", { replace: true });
    } catch {
      // Slice already stores error state on failure.
    }
  };

  return (
    <div className="dashboard-wrapper">
      <h1>hey dashboard layout</h1>
      <button type="button" onClick={handleLogout} disabled={logoutLoading}>
        {logoutLoading ? "Logging out..." : "Logout"}
      </button>
      <Outlet />
    </div>
  );
}
