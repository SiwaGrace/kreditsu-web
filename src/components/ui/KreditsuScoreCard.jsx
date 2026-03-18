import { useEffect, useState } from "react";
import { fetchScore } from "../../api/score.api";

function getTier(score) {
  const n = Math.max(0, Math.min(100, Number(score) || 0));
  if (n >= 70) return { label: "Gold", color: "#c9a84c" };
  if (n >= 40) return { label: "Silver", color: "#a8a9ad" };
  return { label: "Bronze", color: "#cd7f32" };
}

export default function KreditsuScoreCard() {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadScore = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchScore();
        setScoreData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch score");
        console.error("Error fetching score:", err);
      } finally {
        setLoading(false);
      }
    };

    loadScore();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#eaf0fb] bg-white p-6 shadow-sm">
        <div className="flex min-h-50 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4da3ff] border-t-transparent" />
        </div>
      </div>
    );
  }

  if (error || !scoreData) {
    return (
      <div className="rounded-2xl border border-[#eaf0fb] bg-white p-6 shadow-sm">
        <div className="text-center text-sm text-red-600">
          {error || "Failed to load score"}
        </div>
      </div>
    );
  }

  const { score, breakdown } = scoreData;
  const numericScore = Math.max(0, Math.min(100, Number(score) || 0));
  const tier = getTier(numericScore);

  // Convert breakdown object to array for rendering
  const subScores = Object.entries(breakdown).map(([key, item]) => ({
    label: item.label || formatKeyToLabel(key),
    points: item.points,
    max: item.max,
  }));

  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (numericScore / 100) * circumference;

  function formatKeyToLabel(key) {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="rounded-2xl border border-[#eaf0fb] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1e3a5f]">
          Kreditsu Score
        </h3>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
          style={{ backgroundColor: tier.color }}
        >
          {tier.label}
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        {/* Circular score */}
        <div className="relative shrink-0">
          <svg
            className="h-28 w-28 -rotate-90"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#eaf0fb"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#4da3ff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-[#1e3a5f]">
              {Math.round(numericScore)}
            </span>
          </div>
        </div>

        {/* Sub-scores breakdown */}
        <div className="min-w-0 flex-1 space-y-3">
          {subScores.map(({ label, max, points }) => {
            const pct = max > 0 ? (points / max) * 100 : 0;
            return (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#1e3a5f]">{label}</span>
                  <span className="text-gray-500">
                    {points} / {max}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#f5f7fa]">
                  <div
                    className="h-full rounded-full bg-[#4da3ff] transition-[width] duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
