import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  logout,
  updateUser,
  deleteAccount,
} from "../../features/auth/authSlices";
import Modal from "../../components/common/Modal";

function getInitials(user) {
  if (!user?.name || typeof user.name !== "string") return "U";
  const parts = user.name.trim().split(/\s+/);
  if (parts.length >= 2)
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (parts[0][0] || "U").toUpperCase();
}

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, updateLoading, logoutLoading, deleteLoading, error, message } =
    useSelector((state) => state.auth);

  const [formValues, setFormValues] = useState({ name: "", email: "" });
  const [savedMessage, setSavedMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name ?? "",
        email: user.email ?? "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (message) setSavedMessage(message);
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setSavedMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavedMessage("");
    try {
      await dispatch(updateUser(formValues)).unwrap();
      setSavedMessage("Profile updated successfully.");
    } catch {
      // error in slice
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/auth/login", { replace: true });
    } catch {
      // error in slice
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    try {
      await dispatch(deleteAccount()).unwrap();
      toast.success("Account deleted successfully.");
      navigate("/auth/login", { replace: true });
    } catch (err) {
      toast.error(err ?? "Failed to delete account.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4da3ff] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1e3a5f]">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account details and security.
        </p>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#4da3ff] text-lg font-semibold text-white">
            {getInitials(user)}
          </div>
          <div>
            <p className="font-medium text-[#1e3a5f]">{user.name || "—"}</p>
            <p className="text-sm text-gray-500">{user.email || "—"}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {(savedMessage || (message && !error)) && (
        <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {savedMessage || message}
        </div>
      )}

      {/* Update form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-[#1e3a5f]">
          Update information
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Name
            </label>
            <input
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="Your name"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-[#1e3a5f]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#4da3ff] focus:ring-2 focus:ring-[#4da3ff]/20"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateLoading}
            className="rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162d4a] disabled:opacity-50"
          >
            {updateLoading ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>

      {/* Logout */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#1e3a5f]">Session</h2>
        <p className="mt-1 text-sm text-gray-500">
          Sign out of your account on this device.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="mt-4 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-[#1e3a5f] hover:bg-gray-50 disabled:opacity-50"
        >
          {logoutLoading ? "Logging out…" : "Log out"}
        </button>
      </div>

      {/* Delete account — UI only */}
      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
        <h2 className="text-lg font-semibold text-red-800">Danger zone</h2>
        <p className="mt-1 text-sm text-red-700/90">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={deleteLoading}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {deleteLoading ? "Deleting…" : "Delete account"}
        </button>
      </div>

      <Modal
        isOpen={showDeleteModal}
        title="Delete account"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmLabel="Delete account"
        cancelLabel="Cancel"
        confirmLoading={deleteLoading}
      >
        <p className="text-sm text-gray-700">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}
