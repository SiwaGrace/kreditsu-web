// src/pages/OnboardingPage.jsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerBusiness } from "../../features/businessSlices";

export default function OnboardingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createLoading, error, hasBusiness } = useSelector(
    (state) => state.business,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await dispatch(
        registerBusiness({
          name: formData.get("name"),
          industry: formData.get("industry"),
          location: formData.get("location"),
        }),
      ).unwrap();
      navigate("/dashboard", { replace: true });
    } catch {
      // error stored in slice
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1e3a5f] text-white font-bold text-lg mb-3">
            k
          </div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">
            Set up your business
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Tell us a bit about your business to get started
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1e3a5f] mb-1">
              Business name <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Mama Cee Groceries"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1e3a5f] mb-1">
              Industry
            </label>
            <input
              name="industry"
              placeholder="e.g. Retail, Food, Services"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1e3a5f] mb-1">
              Location
            </label>
            <input
              name="location"
              placeholder="e.g. Accra, Ghana"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
            />
          </div>

          <button
            type="submit"
            disabled={createLoading}
            className="mt-2 w-full rounded-lg bg-[#1e3a5f] py-2.5 text-sm font-semibold text-white hover:bg-[#162d4a] transition-colors disabled:opacity-50"
          >
            {createLoading ? "Creating…" : "Create business"}
          </button>
          {hasBusiness && (
            <p className="text-sm text-gray-400 mt-1">
              You already have a business.{" "}
              <a
                href="/dashboard"
                className="text-primaryBrand hover:text-primaryBrand/80 transition-colors"
              >
                Go to dashboard
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
