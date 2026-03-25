import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSale, fetchSales } from "../../features/salesSlices";

export default function SalesPage() {
  const dispatch = useDispatch();
  const { items, loading, createLoading, error } = useSelector(
    (state) => state.sales,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  const handleOpenModal = () => {
    setFormValues({
      amount: "",
      description: "",
      date: "",
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formValues,
      amount: Number(formValues.amount) || 0,
    };

    try {
      await dispatch(addSale(payload)).unwrap();
      setIsModalOpen(false);
    } catch {
      // error handled via slice
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[#1e3a5f]">Sales</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track money coming into your business.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenModal}
          className="shrink-0 rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#162d4a]"
        >
          + Record sale
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        {loading ? (
          <div className="flex min-h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4da3ff] border-t-transparent" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            No sales recorded yet. Click{" "}
            <span className="font-medium text-[#1e3a5f]">“Record sale”</span> to
            add your first one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Description</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((sale) => (
                  <tr
                    key={
                      sale.id ??
                      `${sale.date}-${sale.amount}-${sale.description}`
                    }
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="px-3 py-2 text-gray-700">
                      {sale.date ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-gray-700">
                      {sale.description ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right font-medium text-[#1e3a5f]">
                      {typeof sale.amount === "number"
                        ? sale.amount.toLocaleString()
                        : sale.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#1e3a5f]">
                  Record a sale
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Capture a single sale with amount, description and date.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  required
                  value={formValues.amount}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
                  placeholder="e.g. 250.00"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
                  Description
                </label>
                <input
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
                  placeholder="e.g. Wholesale order to ABC Stores"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
                />
                <p className="mt-0.5 text-xs text-gray-500">
                  If left empty, we&apos;ll use today&apos;s date.
                </p>
              </div>

              <div className="mt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading}
                  className="rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#162d4a] disabled:opacity-50"
                >
                  {createLoading ? "Saving…" : "Save sale"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
