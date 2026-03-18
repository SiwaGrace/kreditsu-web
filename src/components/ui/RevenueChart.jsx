import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FiBarChart2 } from "react-icons/fi";

function formatCurrency(num) {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export default function RevenueChart({ snapshots }) {
  if (!snapshots || snapshots.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <FiBarChart2 className="h-8 w-8 text-gray-300 mb-3" />
        <p className="text-sm font-medium text-gray-400">No data yet</p>
        <p className="text-xs text-gray-300 mt-1">
          Start recording sales and expenses to see your revenue trend
        </p>
      </div>
    );
  }

  // Sort by month ascending for chart display
  const chartData = [...snapshots]
    .sort((a, b) => new Date(a.month) - new Date(b.month))
    .map((snapshot) => ({
      month: new Date(`${snapshot.month}-01`).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      sales: snapshot.total_sales,
      expenses: snapshot.total_expenses,
      profit: snapshot.net_profit,
    }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#10b981"
            name="Total Sales"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#f59e0b"
            name="Total Expenses"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#4da3ff"
            name="Net Profit"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
