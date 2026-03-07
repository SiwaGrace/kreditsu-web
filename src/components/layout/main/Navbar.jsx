import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-dividerBorder bg-primaryColor/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primaryBrand font-semibold"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primaryBrand text-primaryColor text-sm">
            k
          </span>
          <span className="text-lg tracking-tight">Kreditsu</span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4">
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
      </div>
    </header>
  );
};

export default Navbar;
