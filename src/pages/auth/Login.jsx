import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../features/auth/authSlices";
import { fetchBusiness } from "../../features/businessSlices";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loginLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // clear error on unmount
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      const result = await dispatch(fetchBusiness());
      const from = location.state?.from?.pathname;

      if (result.meta.requestStatus === "fulfilled") {
        // has business — go where they were headed or dashboard
        navigate(from ?? "/dashboard", { replace: true });
      } else {
        // no business — onboarding first
        navigate("/onboarding", { replace: true });
      }
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold text-primaryBrand">Sign in</h1>
        <p className="text-sm text-secondaryText">
          Access your Kreditsu dashboard to manage your credits and payments.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-secondaryText mb-1.5"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-lg border border-primaryBrand/15 bg-surfaceColor text-primaryText placeholder:text-secondaryText/70 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:border-accentColor/60 transition"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-secondaryText mb-1.5"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-lg border border-primaryBrand/15 bg-surfaceColor text-primaryText placeholder:text-secondaryText/70 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:border-accentColor/60 transition"
            required
          />
        </div>

        <div className="flex justify-end">
          <Link
            to="/auth/forgot-password"
            className="text-xs font-medium text-accentColor hover:text-accentColor/80 underline underline-offset-2"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loginLoading}
          className="w-full py-2.5 px-4 rounded-lg bg-primaryBrand text-primaryColor font-medium hover:bg-primaryBrand/90 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loginLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-secondaryText">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth/register"
          className="font-medium text-accentColor hover:text-accentColor/80 underline underline-offset-2"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
