/**
 * Stat card for dashboard metrics. Optional icon slot and subtitle.
 */
export default function StatCard({ title, value, subtitle, children }) {
  return (
    <div className="rounded-xl border border-[#eaf0fb] bg-white p-5 shadow-sm transition-shadow hover:shadow-[0_2px_8px_rgba(30,58,95,0.06)]">
      {title && (
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {title}
        </p>
      )}
      <div className="mt-1 flex items-baseline gap-2">
        {children ?? (
          <span className="text-2xl font-bold text-[#1e3a5f]">{value}</span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}
