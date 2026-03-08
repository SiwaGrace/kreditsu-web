import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlices";

const NAV_ITEMS = [
  { path: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { path: "/my-business", label: "My Business", icon: BusinessIcon },
  { path: "/sales", label: "Sales", icon: SalesIcon },
  { path: "/expenses", label: "Expenses", icon: ExpensesIcon },
  { path: "/profile", label: "Profile", icon: ProfileIcon },
];

const PAGE_TITLES = {
  "/dashboard": "Dashboard",
  "/my-business": "My Business",
  "/sales": "Sales",
  "/expenses": "Expenses",
  "/profile": "Profile",
};

function DashboardIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
}

function BusinessIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5m-18-18v18m10.5-18v18m10-11V9.75m-10 0v10.5"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 7.5h.75m-.75 3h.75m-.75 3h.75m-3.75 0h.75"
      />
    </svg>
  );
}

function SalesIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
      />
    </svg>
  );
}

function ExpensesIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
      />
    </svg>
  );
}

function ProfileIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function LogoutIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v3.75m0 10.5V18a2.25 2.25 0 002.25 2.25h6a2.25 2.25 0 002.25-2.25v-3.75m-9 0h9"
      />
    </svg>
  );
}

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function getInitials(user) {
  if (!user?.name || typeof user.name !== "string") return "U";
  const parts = user.name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0][0] || "U").toUpperCase();
}

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutLoading } = useSelector((state) => state.auth);

  const pageTitle = PAGE_TITLES[location.pathname] ?? "Dashboard";

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/auth/login", { replace: true });
    } catch {
      // Slice already stores error state on failure.
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      {/* Fixed sidebar */}
      <aside
        className="fixed left-0 top-0 z-30 flex h-full w-64 flex-col bg-[#1e3a5f]"
        style={{ height: "100vh" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] ring-2 ring-white/40 text-white font-semibold text-sm">
            k
          </div>
          <span className="font-semibold text-white text-lg tracking-tight">
            Kreditsu
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-2">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#eaf0fb] text-[#1e3a5f] border-l-4 border-[#4da3ff] pl-2"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-5 w-5 shrink-0 ${isActive ? "text-[#1e3a5f]" : "text-white"}`}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white transition-colors hover:bg-red-500/20 hover:text-red-200 disabled:opacity-50"
          >
            <LogoutIcon className="h-5 w-5 shrink-0" />
            {logoutLoading ? "Logging out…" : "Log out"}
          </button>
        </div>
      </aside>

      {/* Main area: topbar + content */}
      <div className="flex min-h-screen flex-1 flex-col pl-64">
        {/* Fixed topbar */}
        <header className="fixed top-0 right-0 z-20 flex h-16 items-center justify-between border-b border-[#eaf0fb] bg-white px-6 left-64">
          <h1 className="text-lg font-semibold text-[#1e3a5f]">{pageTitle}</h1>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4da3ff] text-sm font-medium text-white">
              {getInitials(user)}
            </div>
            <span className="text-sm font-medium text-[#1e3a5f]">
              {user?.name ?? "User"}
            </span>
            <button
              type="button"
              className="rounded p-0.5 text-[#1e3a5f] hover:bg-[#eaf0fb]"
              aria-label="Open user menu"
            >
              <ChevronIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-auto pt-16">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
