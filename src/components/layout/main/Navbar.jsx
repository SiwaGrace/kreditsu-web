import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="border-b border-dividerBorder bg-primaryColor/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primaryBrand font-semibold"
          onClick={closeMenu}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryBrand text-primaryColor text-sm">
            k
          </span>
          <span className="text-lg tracking-tight">Kreditsu</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 sm:flex sm:gap-4">
          <Link
            to="/about"
            className="text-sm font-medium text-secondaryText hover:text-primaryBrand transition-colors"
          >
            About
          </Link>
          <Link
            to="/directory"
            className="text-sm font-medium text-secondaryText hover:text-primaryBrand transition-colors"
          >
            Directory
          </Link>
          <Link
            to="/auth/login"
            className="text-sm font-medium text-secondaryText hover:text-primaryBrand transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/auth/register"
            className="inline-flex items-center justify-center rounded-full bg-primaryBrand px-4 py-1.5 text-sm font-medium text-primaryColor shadow-sm hover:bg-primaryBrand/90 transition-colors"
          >
            Get started
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-secondaryText hover:bg-surfaceColor hover:text-primaryBrand sm:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="sm:hidden border-t border-dividerBorder bg-primaryColor/95 backdrop-blur">
          <nav className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <div className="flex flex-col gap-1">
              <Link
                to="/about"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-secondaryText hover:bg-surfaceColor hover:text-primaryBrand transition-colors"
              >
                About
              </Link>
              <Link
                to="/directory"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-secondaryText hover:bg-surfaceColor hover:text-primaryBrand transition-colors"
              >
                Directory
              </Link>
              <Link
                to="/auth/login"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-secondaryText hover:bg-surfaceColor hover:text-primaryBrand transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                onClick={closeMenu}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-primaryBrand px-4 py-2 text-sm font-medium text-primaryColor shadow-sm hover:bg-primaryBrand/90 transition-colors"
              >
                Get started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
