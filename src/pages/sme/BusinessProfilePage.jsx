import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { editBusiness, fetchBusiness } from "../../features/businessSlices";
import {
  fetchBusinessDocuments,
  addBusinessDocument,
  removeBusinessDocument,
} from "../../features/businessDocumentsSlices";
import KreditsuScoreCard from "../../components/ui/KreditsuScoreCard";
import { formatDate } from "../../utils/formatDate";

export default function BusinessProfilePage() {
  const dispatch = useDispatch();
  const { business, loading, updateLoading, error, businessChecked } =
    useSelector((state) => state.business);
  const {
    items: documents,
    loading: docsLoading,
    createLoading: docsUploading,
    deleteLoading: docsDeleting,
    error: docsError,
  } = useSelector((state) => state.businessDocuments);

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
  const [slug, setSlug] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [docType, setDocType] = useState("registration_certificate");
  const [docFile, setDocFile] = useState(null);
  const [docsMessage, setDocsMessage] = useState("");

  // Ensure we have the latest business data when landing on this page
  useEffect(() => {
    if (!businessChecked && !loading) {
      dispatch(fetchBusiness());
    }
  }, [businessChecked, loading, dispatch]);

  useEffect(() => {
    if (business) {
      dispatch(fetchBusinessDocuments());
    }
  }, [business, dispatch]);

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
      setSlug(business.slug ?? "");
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
    setIsSubmitting(true);

    try {
      await dispatch(editBusiness(formValues)).unwrap();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Ensure loading shows for at least 1s
      setSavedMessage("Business details updated successfully.");
      toast.success("Business details updated successfully.");
    } catch {
      // error is handled in slice and surfaced via `error`
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDocTypeChange = (e) => {
    setDocType(e.target.value);
    setDocsMessage("");
  };

  const handleDocFileChange = (e) => {
    setDocFile(e.target.files?.[0] ?? null);
    setDocsMessage("");
  };

  const handleUploadDocument = async (e) => {
    e.preventDefault();
    setDocsMessage("");

    if (!docFile) {
      setDocsMessage("Please select a file to upload.");
      return;
    }

    const maxBytes = 5120 * 1024; // 5MB
    if (docFile.size > maxBytes) {
      setDocsMessage("File is too large. Maximum size is 5MB.");
      return;
    }

    try {
      await dispatch(
        addBusinessDocument({ type: docType, file: docFile }),
      ).unwrap();
      setDocsMessage("Document uploaded successfully.");
      setDocFile(null);
      setDocType("registration_certificate");
      toast.success("Document uploaded successfully.");
    } catch {
      // error is handled in slice/remote state
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm("Delete this document?")) return;

    try {
      await dispatch(removeBusinessDocument(id)).unwrap();
      toast.success("Document deleted.");
    } catch {
      // error is handled in slice
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

      <KreditsuScoreCard score={business.kreditsu_score ?? 0} />

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
              Business slug
            </label>
            <input
              name="slug"
              value={slug}
              readOnly
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500"
            />
            <p className="mt-0.5 text-xs text-gray-500">
              This is the permanent identifier used in your public URL and
              cannot be changed.
            </p>
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
            disabled={updateLoading || isSubmitting}
            className="inline-flex items-center rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d4a] disabled:opacity-50"
          >
            {updateLoading || isSubmitting ? "Saving changes…" : "Save changes"}
          </button>
        </div>
      </form>
      {/* document upload */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#1e3a5f]">
              Business documents
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload required documents (max 5MB) to help verify your business.
            </p>
          </div>
        </div>

        {(docsError || docsMessage) && (
          <div
            className={`mt-4 rounded-lg px-4 py-3 text-sm ${
              docsError
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {docsError ?? docsMessage}
          </div>
        )}

        <form
          onSubmit={handleUploadDocument}
          className="mt-6 grid gap-4 md:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Document type
            </label>
            <select
              value={docType}
              onChange={handleDocTypeChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
            >
              <option value="registration_certificate">
                Registration certificate
              </option>
              <option value="tax_id">Tax ID</option>
              <option value="utility_bill">Utility bill</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Upload file
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleDocFileChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
            />
            <p className="mt-1 text-xs text-gray-500">
              Max size 5MB. Accepted formats: PDF, PNG, JPG.
            </p>
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={docsUploading || docsLoading}
              className="inline-flex items-center rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d4a] disabled:opacity-50"
            >
              {docsUploading || docsLoading ? "Uploading…" : "Upload document"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-[#1e3a5f]">
            Uploaded documents
          </h3>
          {docsLoading && (
            <div className="mt-3 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4da3ff] border-t-transparent" />
            </div>
          )}

          {!docsLoading && documents.length === 0 && (
            <div className="mt-3 rounded-lg bg-[#f5f7fa] px-4 py-3 text-sm text-gray-500">
              No documents uploaded yet.
            </div>
          )}

          {!docsLoading && documents.length > 0 && (
            <div className="mt-3 space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id ?? `${doc.type}-${doc.created_at}`}
                  className="flex flex-col gap-2 rounded-lg border border-[#eaf0fb] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium text-[#1e3a5f]">
                      {doc.type?.replace("_", " ")}
                    </div>
                    <div className="text-xs text-gray-500">
                      Uploaded{" "}
                      {doc.created_at ? formatDate(doc.created_at) : "—"}
                    </div>
                    {doc.verified_at ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {doc.file_path && (
                      <a
                        href={`http://kreditsu-api.test/storage/${doc.file_path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-[#4da3ff] hover:underline"
                      >
                        View
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteDocument(doc.id)}
                      disabled={docsDeleting}
                      className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
