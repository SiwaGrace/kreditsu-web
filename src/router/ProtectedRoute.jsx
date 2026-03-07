import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "../components/PageLoader";

export default function ProtectedRoute() {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // remove this when auth is implemented
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="auth/login" state={{ from: location }} replace />;
  }

  // if roles are specified, check if user has the right role
  // if (roles && !roles.includes(user.role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <Outlet />;
}
