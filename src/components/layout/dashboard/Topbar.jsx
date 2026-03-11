import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";

function getInitials(name) {
  if (!name || typeof name !== "string") return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0][0] || "U").toUpperCase();
}

export default function Topbar({
  pageTitle,
  user,
  business,
  logoutLoading,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b border-[#eaf0fb] bg-white px-4 lg:left-64 lg:px-6">
      <h1 className="text-lg font-semibold text-[#1e3a5f]">{pageTitle}</h1>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* Business pill — mobile only */}
        {business && (
          <div className="flex items-center gap-2 rounded-full bg-[#eaf0fb] px-3 py-1 lg:hidden">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9a84c] text-white text-[10px] font-semibold">
              {getInitials(business.business?.name || "Mama Cee Test")}
            </div>
            <span className="text-xs font-medium text-[#1e3a5f]">
              {business.business?.name || "Mama Cee Test Groceries"}
            </span>
          </div>
        )}

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-[#eaf0fb] transition-colors"
            aria-label="Open user menu"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#4da3ff] text-sm font-medium text-white">
              {getInitials(user?.name)}
            </div>
            <span className="hidden text-sm font-medium text-[#1e3a5f] sm:block">
              {user?.name ?? "User"}
            </span>
            <FiChevronDown
              className={`h-5 w-5 text-[#1e3a5f] transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[#eaf0fb] bg-white shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-[#eaf0fb]">
                <p className="text-sm font-semibold text-[#1e3a5f]">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {user?.email ?? ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                disabled={logoutLoading}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <FiLogOut className="h-4 w-4 shrink-0" />
                {logoutLoading ? "Logging out…" : "Log out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
