import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBusiness, fetchBusiness } from "../../features/businessSlices";

export default function BusinessProfilePage() {
  const dispatch = useDispatch();
  const { business, loading, updateLoading, error, businessChecked } =
    useSelector((state) => state.business);

  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
    industry: "",
    description: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    established_at: "",
    is_published: false,
  });
  const [savedMessage, setSavedMessage] = useState("");

  // Ensure we have the latest business data when landing on this page
  useEffect(() => {
    if (!businessChecked && !loading) {
      dispatch(fetchBusiness());
    }
  }, [businessChecked, loading, dispatch]);

  // Sync form with store business
  useEffect(() => {
    if (business) {
      setFormValues((prev) => ({
        ...prev,
        name: business.name ?? "",
        type: business.type ?? "",
        industry: business.industry ?? "",
        description: business.description ?? "",
        location: business.location ?? "",
        phone: business.phone ?? "",
        email: business.email ?? "",
        website: business.website ?? "",
        established_at: business.established_at ?? "",
        is_published: Boolean(business.is_published),
      }));
    }
  }, [business]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSavedMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavedMessage("");

    try {
      await dispatch(editBusiness(formValues)).unwrap();
      setSavedMessage("Business details updated successfully.");
    } catch {
      // error is handled in slice and surfaced via `error`
    }
  };

  if (!businessChecked || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4da3ff] border-t-transparent" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="max-w-xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-[#1e3a5f]">
          No business profile yet
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          You haven&apos;t set up your business profile. Go through onboarding
          to create your business.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">
          My business profile
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and update your core business details. These help lenders and
          partners understand who you are.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {savedMessage && !error && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {savedMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Business name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              required
              value={formValues.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="e.g. Mama Cee Groceries"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Business type
            </label>
            <input
              name="type"
              value={formValues.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="e.g. Sole proprietor, Limited company"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Industry
            </label>
            <input
              name="industry"
              value={formValues.industry}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="e.g. Retail, Food, Services"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Established date
            </label>
            <input
              type="date"
              name="established_at"
              value={formValues.established_at || ""}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Location
            </label>
            <input
              name="location"
              value={formValues.location}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="e.g. Accra, Ghana"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Phone
            </label>
            <input
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="e.g. +233 20 000 0000"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="e.g. hello@mybusiness.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Website
            </label>
            <input
              name="website"
              value={formValues.website}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="e.g. https://mybusiness.com"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
            Description
          </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
            placeholder="Briefly describe what your business does, your products or services, and who you serve."
          />
        </div>

        <div className="flex items-start gap-3 rounded-xl bg-[#f5f7fa] px-4 py-3">
          <input
            id="is_published"
            type="checkbox"
            name="is_published"
            checked={formValues.is_published}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#4da3ff]"
          />
          <div>
            <label
              htmlFor="is_published"
              className="text-sm font-medium text-[#1e3a5f]"
            >
              Show my business in the public directory
            </label>
            <p className="mt-0.5 text-xs text-gray-500">
              When turned on, your business can appear in Kreditsu&apos;s public
              SME directory so lenders and partners can discover you.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={updateLoading}
            className="inline-flex items-center rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d4a] disabled:opacity-50"
          >
            {updateLoading ? "Saving changes…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
