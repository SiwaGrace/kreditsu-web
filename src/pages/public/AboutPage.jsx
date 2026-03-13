import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-[#f5f7fa] min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white border border-[#eaf0fb] rounded-lg p-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-4">
          About Kreditsu
        </h1>
        <p className="text-gray-700 leading-relaxed">
          Kreditsu is a digital identity platform built for small and medium
          enterprises (SMEs). Our mission is to empower businesses by creating
          transparent, verifiable profiles that lenders and partners can trust.
          Through Kreditsu, SMEs can showcase their performance metrics,
          transaction history, and verification status – helping them access
          financing and grow sustainably.
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          We believe that every SME deserves a chance to be seen and supported.
          By providing tools to build and share business identities, Kreditsu
          bridges the information gap between entrepreneurs and service
          providers across Africa and beyond.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
