import { NavLink } from "react-router-dom";

export default function BottomNav({ navItems }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex border-t border-[#eaf0fb] bg-white lg:hidden">
      {navItems.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/dashboard"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
              isActive ? "text-[#1e3a5f]" : "text-gray-400"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon
                className={`h-5 w-5 ${isActive ? "text-[#4da3ff]" : "text-gray-400"}`}
              />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
