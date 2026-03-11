import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function getInitials(name) {
  if (!name || typeof name !== "string") return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0][0] || "U").toUpperCase();
}

export default function Sidebar({
  navItems,
  business,
  logoutLoading,
  onLogout,
}) {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col bg-[#1e3a5f] lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1e3a5f] ring-2 ring-white/40 text-white font-semibold text-sm">
          k
        </div>
        <span className="font-semibold text-white text-lg tracking-tight">
          Kreditsu
        </span>
      </div>

      {/* Business context block */}

      {business && (
        <div className="mx-3 mb-3 rounded-xl bg-white/10 px-3 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a84c] text-white text-sm font-semibold">
              {getInitials("Mama Cee")}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Mama Cee
              </p>
              <p className="truncate text-xs text-white/60">Retail · Accra</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-2">
        {navItems.map(({ path, label, icon: Icon }) => (
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
          onClick={onLogout}
          disabled={logoutLoading}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white transition-colors hover:bg-red-500/20 hover:text-red-200 disabled:opacity-50"
        >
          <FiLogOut className="h-5 w-5 shrink-0" />
          {logoutLoading ? "Logging out…" : "Log out"}
        </button>
      </div>
    </aside>
  );
}
