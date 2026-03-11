import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function BusinessGuard() {
  const { hasBusiness, businessChecked } = useSelector(
    (state) => state.business,
  );

  if (!businessChecked) return null;

  if (!hasBusiness) return <Navigate to="/onboarding" replace />;

  return <Outlet />;
}
