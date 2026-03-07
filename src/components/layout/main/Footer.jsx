import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-dividerBorder bg-primaryColor">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 text-xs text-secondaryText">
        <span className="font-medium text-primaryBrand">Kreditsu</span>
        <span>
          © {new Date().getFullYear()} Kreditsu. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
