import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPublicBusinesses } from "../../features/publicBusinessSlices";

function getTier(score) {
  const n = Math.max(0, Math.min(100, Number(score) || 0));
  if (n >= 70) return { label: "Gold", color: "#c9a84c" };
  if (n >= 40) return { label: "Silver", color: "#a8a9ad" };
  return { label: "Bronze", color: "#cd7f32" };
}

export default function BusinessDirectory() {
  const dispatch = useDispatch();
  const { list, listLoading, listError } = useSelector(
    (state) => state.publicBusiness,
  );
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { lastFetchedAt: scoreUpdatedAt } = useSelector((state) => state.score);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchPublicBusinesses(1));
  }, [dispatch]);

  // Refresh directory whenever score recalculates (logged-in flows) or window regains focus.
  useEffect(() => {
    if (isAuthenticated && scoreUpdatedAt) {
      dispatch(fetchPublicBusinesses(1));
    }
  }, [dispatch, isAuthenticated, scoreUpdatedAt]);

  useEffect(() => {
    const onFocus = () => dispatch(fetchPublicBusinesses(1));
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [dispatch]);

  const industries = useMemo(() => {
    const all = new Set(list.map((b) => b.industry).filter(Boolean));
    return ["All", ...Array.from(all)];
  }, [list]);

  const filtered = useMemo(() => {
    let data = list;
    if (filter !== "All") data = data.filter((b) => b.industry === filter);
    const key = search.trim().toLowerCase();
    if (key) {
      data = data.filter((b) => {
        const name = (b.name ?? "").toLowerCase();
        const industry = (b.industry ?? "").toLowerCase();
        const location = (b.location ?? b.city ?? "").toLowerCase();
        return (
          name.includes(key) || industry.includes(key) || location.includes(key)
        );
      });
    }
    return data;
  }, [list, filter, search]);

  return (
    <div className="min-h-screen bg-[#f5f7fa] py-8 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1e3a5f]">
            Discover Businesses
          </h1>
          <p className="mt-2 text-gray-600">
            Browse published SME profiles on Kreditsu
          </p>

          <div className="mt-4 flex justify-center">
            <input
              type="text"
              placeholder="Search by name, industry, or location..."
              className="w-full max-w-md rounded-md border border-[#eaf0fb] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4da3ff]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {industries.length > 1 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {industries.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`rounded-full border px-3 py-1 text-sm ${
                    filter === f
                      ? "border-[#4da3ff] bg-[#4da3ff] text-white"
                      : "border-[#eaf0fb] bg-white text-[#1e3a5f]"
                  }`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {listLoading ? (
          <div className="flex min-h-60 items-center justify-center text-gray-500">
            Loading businesses…
          </div>
        ) : listError ? (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {listError}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No businesses found matching your search.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => {
              const score = Math.max(
                0,
                Math.min(100, Number(b.kreditsu_score ?? b.score ?? 0) || 0),
              );
              const tier = getTier(score);
              const initials = String(b.name ?? "")
                .split(" ")
                .filter(Boolean)
                .map((w) => w[0])
                .join("")
                .slice(0, 3)
                .toUpperCase();
              const location = b.location ?? b.city ?? "";

              return (
                <div
                  key={b.id ?? b.slug}
                  className="flex flex-col justify-between rounded-lg border border-[#eaf0fb] bg-white p-4"
                >
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a5f] font-bold text-white">
                        {initials || "SME"}
                      </div>
                      <span
                        className="ml-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white"
                        style={{ backgroundColor: tier.color }}
                      >
                        {tier.label}
                      </span>
                      {b.is_published && (
                        <span className="ml-2 rounded-full bg-[#eaf0fb] px-2 py-0.5 text-xs font-medium text-[#1e3a5f]">
                          Listed
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[#1e3a5f]">
                      {b.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {[b.industry, location].filter(Boolean).join(" · ")}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-[#1e3a5f]">
                        Kreditsu Score
                      </span>
                      <span className="text-gray-500">
                        {Math.round(score)}/100
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#eaf0fb]">
                      <div
                        className="h-2 rounded-full bg-[#4da3ff]"
                        style={{
                          width: `${score}%`,
                        }}
                      />
                    </div>
                  </div>

                  <Link
                    to={`/b/${b.slug}`}
                    className="mt-4 inline-block w-full rounded-md bg-[#4da3ff] py-2 text-center text-sm font-medium text-white hover:bg-[#1e3a5f]"
                  >
                    View profile
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
