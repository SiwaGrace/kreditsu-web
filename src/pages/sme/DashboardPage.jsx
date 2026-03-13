import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSales } from "../../features/salesSlices";
import { fetchExpenses } from "../../features/expensesSlices";
import StatCard from "../../components/ui/StatCard";

function formatCurrency(num) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function getScoreTier(score) {
  if (score >= 70) return { label: "Gold", color: "#c9a84c" };
  if (score >= 40) return { label: "Silver", color: "#a8a9ad" };
  return { label: "Bronze", color: "#cd7f32" };
}

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { business } = useSelector((state) => state.business);
  const { items: sales } = useSelector((state) => state.sales);
  const { items: expenses } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchExpenses());
  }, [dispatch]);

  const score = business?.kreditsu_score ?? 0;
  const tier = getScoreTier(score);
  const salesTotal = sales.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);
  const expensesTotal = expenses.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0,
  );

  const quickLinks = [
    { to: "/my-business", label: "My Business", desc: "Profile & details" },
    { to: "/sales", label: "Sales", desc: "Record & view sales" },
    { to: "/expenses", label: "Expenses", desc: "Track spending" },
    { to: "/profile", label: "Profile", desc: "Account settings" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">
          Welcome back, {user?.name?.split(/\s+/)[0] ?? "there"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {business?.name
            ? `Here’s an overview of ${business.name}.`
            : "Here’s your dashboard overview."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Kreditsu Score"
          value={Math.round(score)}
          subtitle={
            <span>
              Tier:{" "}
              <span
                className="font-medium"
                style={{ color: tier.color }}
              >
                {tier.label}
              </span>
            </span>
          }
        />
        <StatCard
          title="Total sales"
          subtitle={`${sales.length} transaction${sales.length !== 1 ? "s" : ""}`}
          value={formatCurrency(salesTotal)}
        />
        <StatCard
          title="Total expenses"
          subtitle={`${expenses.length} transaction${expenses.length !== 1 ? "s" : ""}`}
          value={formatCurrency(expensesTotal)}
        />
        <StatCard
          title="Net"
          subtitle="Sales minus expenses"
          value={formatCurrency(salesTotal - expensesTotal)}
        />
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Quick links
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group flex items-start gap-3 rounded-xl border border-[#eaf0fb] bg-white p-4 shadow-sm transition-colors hover:border-[#4da3ff]/30 hover:bg-[#f5f7fa]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eaf0fb] text-[#1e3a5f] transition-colors group-hover:bg-[#4da3ff]/15">
                {label.charAt(0)}
              </span>
              <div className="min-w-0">
                <span className="font-medium text-[#1e3a5f] group-hover:text-[#4da3ff]">
                  {label}
                </span>
                <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="rounded-xl border border-[#eaf0fb] bg-white shadow-sm">
        <div className="border-b border-[#eaf0fb] px-5 py-4">
          <h2 className="text-sm font-semibold text-[#1e3a5f]">
            Recent activity
          </h2>
          <p className="mt-0.5 text-xs text-gray-500">
            Your latest sales and expenses
          </p>
        </div>
        <div className="p-5">
          {sales.length === 0 && expenses.length === 0 ? (
            <div className="rounded-lg bg-[#f5f7fa] py-10 text-center text-sm text-gray-500">
              No transactions yet.{" "}
              <Link
                to="/sales"
                className="font-medium text-[#4da3ff] hover:underline"
              >
                Record a sale
              </Link>{" "}
              or{" "}
              <Link
                to="/expenses"
                className="font-medium text-[#4da3ff] hover:underline"
              >
                add an expense
              </Link>{" "}
              to get started.
            </div>
          ) : (
            <ul className="space-y-2">
              {[...sales.slice(0, 3).map((s) => ({ ...s, type: "sale" })), ...expenses.slice(0, 3).map((e) => ({ ...e, type: "expense" }))]
                    .sort(
                      (a, b) =>
                        new Date(b.date || 0) - new Date(a.date || 0)
                    )
                    .slice(0, 5)
                    .map((item, i) => (
                      <li
                        key={item.id ?? `${item.type}-${i}-${item.amount}`}
                        className="flex items-center justify-between rounded-lg border border-[#eaf0fb] px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                              item.type === "sale"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.type === "sale" ? "+" : "−"}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-[#1e3a5f]">
                              {item.description || (item.type === "sale" ? "Sale" : "Expense")}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.date ?? "—"}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            item.type === "sale"
                              ? "text-emerald-600"
                              : "text-amber-600"
                          }`}
                        >
                          {item.type === "sale" ? "+" : "−"}
                          {formatCurrency(Number(item.amount) || 0)}
                        </span>
                      </li>
                    ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
