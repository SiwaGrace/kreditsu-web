import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlices";
import {
  FiGrid,
  FiBriefcase,
  FiTrendingUp,
  FiCreditCard,
  FiUser,
} from "react-icons/fi";
import Sidebar from "../components/layout/dashboard/Sidebar";
import Topbar from "../components/layout/dashboard/Topbar";
import BottomNav from "../components/layout/dashboard/BottomNav";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: FiGrid },
  { path: "/my-business", label: "My Business", icon: FiBriefcase },
  { path: "/sales", label: "Sales", icon: FiTrendingUp },
  { path: "/expenses", label: "Expenses", icon: FiCreditCard },
  { path: "/profile", label: "Profile", icon: FiUser },
];

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/my-business": "My Business",
  "/sales": "Sales",
  "/expenses": "Expenses",
  "/profile": "Profile",
};

export default function SMELayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutLoading } = useSelector((state) => state.auth);
  const business = true; // replace with useSelector((state) => state.business.business)

  const pageTitle = PAGE_TITLES[location.pathname] ?? "Dashboard";

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/auth/login", { replace: true });
    } catch {
      // error stored in slice
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      <Sidebar
        navItems={NAV_ITEMS}
        business={business}
        logoutLoading={logoutLoading}
        onLogout={handleLogout}
      />

      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <Topbar
          pageTitle={pageTitle}
          user={user}
          business={business}
          logoutLoading={logoutLoading}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto pt-16 pb-20 lg:pb-0">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>

        <BottomNav navItems={NAV_ITEMS} />
      </div>
    </div>
  );
}
