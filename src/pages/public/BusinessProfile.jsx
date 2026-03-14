import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPhone, FaEnvelope, FaGlobe, FaCheckCircle } from "react-icons/fa";
import { fetchPublicBusinessBySlug } from "../../features/publicBusinessSlices";

const BusinessProfile = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { business, businessLoading, businessError } = useSelector(
    (state) => state.publicBusiness,
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicBusinessBySlug(slug));
    }
  }, [dispatch, slug]);

  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard");
  };

  if (businessLoading) {
    return (
      <div className="bg-[#f5f7fa] min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-[#eaf0fb] rounded-lg p-6">
          <div className="text-center">Loading business profile...</div>
        </div>
      </div>
    );
  }

  if (businessError) {
    return (
      <div className="bg-[#f5f7fa] min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-[#eaf0fb] rounded-lg p-6">
          <div className="text-center text-red-500">
            Error loading business profile: {businessError}
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="bg-[#f5f7fa] min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-[#eaf0fb] rounded-lg p-6">
          <div className="text-center">Business not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7fa] min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-[#eaf0fb] rounded-lg p-6">
        {/* header */}
        <div className="flex flex-col items-center text-center">
          <div className="h-20 w-20 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-xl">
            {business.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#1e3a5f]">
            {business.name}
          </h1>
          <p className="text-gray-600">
            {business.industry} · {business.location}
          </p>
          {business.is_verified && (
            <div className="mt-2 inline-flex items-center text-[#c9a84c] font-semibold">
              <FaCheckCircle className="mr-1" /> ✓ Verified
            </div>
          )}
          <button
            onClick={copyLink}
            className="mt-4 px-4 py-2 bg-[#4da3ff] text-white rounded-md text-sm"
          >
            Share profile
          </button>
        </div>

        {/* about */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">About</h2>
          <p className="mt-2 text-gray-700 text-sm">
            {business.description || "No description available."}
          </p>
        </div>

        {/* score */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">
            Kreditsu Score
          </h2>
          <div className="mt-2 flex items-center">
            <span className="text-2xl font-bold text-[#1e3a5f]">
              {business.kreditsu_score}
            </span>
            <span className="ml-1 text-gray-600">/100</span>
          </div>
          <div className="w-full bg-[#eaf0fb] rounded-full h-2 mt-2">
            <div
              className="bg-[#c9a84c] h-2 rounded-full"
              style={{ width: `${business.kreditsu_score}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm font-semibold text-[#1e3a5f]">
            {business.kreditsu_score >= 80
              ? "Gold Member"
              : business.kreditsu_score >= 60
                ? "Silver Member"
                : "Bronze Member"}
          </div>
          <p className="mt-1 text-gray-600 text-xs">
            This score is calculated from transaction history, profile
            completeness, and verification status
          </p>
        </div>

        {/* stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#f5f7fa] p-3 rounded">
            <div className="text-sm text-gray-600">Member since</div>
            <div className="font-semibold">
              {business.member_since || "N/A"}
            </div>
          </div>
          <div className="bg-[#f5f7fa] p-3 rounded">
            <div className="text-sm text-gray-600">Monthly revenue</div>
            <div className="font-semibold">
              {business.monthly_revenue
                ? `₵ ${business.monthly_revenue.toLocaleString()}`
                : "N/A"}
            </div>
          </div>
          <div className="bg-[#f5f7fa] p-3 rounded">
            <div className="text-sm text-gray-600">Total transactions</div>
            <div className="font-semibold">
              {business.total_transactions || "N/A"}
            </div>
          </div>
          <div className="bg-[#f5f7fa] p-3 rounded">
            <div className="text-sm text-gray-600">Expense ratio</div>
            <div className="font-semibold">
              {business.expense_ratio ? `${business.expense_ratio}%` : "N/A"}
            </div>
          </div>
        </div>

        {/* contact */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-[#1e3a5f]">
            Contact information
          </h2>
          <ul className="mt-2 text-gray-700 space-y-2">
            {business.phone && (
              <li className="flex items-center">
                <FaPhone className="mr-2 text-[#1e3a5f]" /> {business.phone}
              </li>
            )}
            {business.email && (
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-[#1e3a5f]" /> {business.email}
              </li>
            )}
            {business.website && (
              <li className="flex items-center">
                <FaGlobe className="mr-2 text-[#1e3a5f]" />
                <a
                  href={`http://${business.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4da3ff] hover:underline"
                >
                  {business.website}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* footer note */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Powered by Kreditsu · Build your business identity at kreditsu.com
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
