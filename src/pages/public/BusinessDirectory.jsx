import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { fetchPublicBusinesses } from "../../features/publicBusinessSlices";

const FILTERS = [
  "All",
  "Retail",
  "Food",
  "Services",
  "Agriculture",
  "Manufacturing",
];

const BusinessDirectory = () => {
  const dispatch = useDispatch();
  const {
    list: businesses,
    listLoading,
    listError,
  } = useSelector((state) => state.publicBusiness);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchPublicBusinesses());
  }, [dispatch]);

  const filtered = useMemo(() => {
    let list = businesses;
    if (filter !== "All") {
      list = list.filter((b) => b.industry === filter);
    }
    if (search.trim() !== "") {
      const key = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(key) ||
          b.industry.toLowerCase().includes(key) ||
          b.location.toLowerCase().includes(key),
      );
    }
    return list;
  }, [search, filter, businesses]);

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a5f]">
            Discover Businesses
          </h1>
          <p className="text-gray-600 mt-2">
            Browse verified SME profiles on Kreditsu
          </p>
          <div className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Search by name, industry, or location..."
              className="w-full max-w-md px-4 py-2 border border-[#eaf0fb] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4da3ff]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`px-3 py-1 rounded-full text-sm border ${
                  filter === f
                    ? "bg-[#4da3ff] text-white"
                    : "bg-white text-[#1e3a5f] border-[#eaf0fb]"
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* results */}
        {listLoading ? (
          <p className="text-center text-gray-500">Loading businesses...</p>
        ) : listError ? (
          <p className="text-center text-red-500">
            Error loading businesses: {listError}
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No businesses found matching your search
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-[#eaf0fb] rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center mb-2">
                    <div className="h-10 w-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold">
                      {b.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    {b.is_verified && (
                      <FaCheckCircle
                        className="text-[#c9a84c] ml-2"
                        title="Verified"
                      />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-[#1e3a5f]">
                    {b.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {b.industry} · {b.location}
                  </p>
                </div>
                <div className="mt-4">
                  <div className="text-sm mb-1">Kreditsu Score</div>
                  <div className="w-full bg-[#eaf0fb] rounded-full h-2">
                    <div
                      className="bg-[#4da3ff] h-2 rounded-full"
                      style={{ width: `${b.kreditsu_score}%` }}
                    ></div>
                  </div>
                </div>
                <a
                  href={`/b/${b.slug}`}
                  className="mt-4 inline-block text-center w-full py-2 bg-[#4da3ff] text-white rounded-md"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDirectory;
