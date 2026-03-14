import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register, clearError } from "../../features/auth/authSlices";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

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
      await dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirmation: formData.passwordConfirmation,
        }),
      ).unwrap();
      navigate("/onboarding", { replace: true });
    } catch (error) {}
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold text-primaryBrand">
          Create account
        </h1>
        <p className="text-sm text-secondaryText">
          Set up your Kreditsu profile to start tracking and managing your
          credits in one place.
        </p>
      </div>

      {/* error message */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-secondaryText mb-1.5"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-lg border border-primaryBrand/15 bg-surfaceColor text-primaryText placeholder:text-secondaryText/70 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:border-accentColor/60 transition"
            required
          />
        </div>

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pr-11 px-4 py-2.5 rounded-lg border border-primaryBrand/15 bg-surfaceColor text-primaryText placeholder:text-secondaryText/70 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:border-accentColor/60 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center justify-center text-secondaryText hover:text-primaryText"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="passwordConfirmation"
            className="block text-sm font-medium text-secondaryText mb-1.5"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pr-11 px-4 py-2.5 rounded-lg border border-primaryBrand/15 bg-surfaceColor text-primaryText placeholder:text-secondaryText/70 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:border-accentColor/60 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center justify-center text-secondaryText hover:text-primaryText"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <FiEyeOff size={18} />
              ) : (
                <FiEye size={18} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={registerLoading}
          className="w-full py-2.5 px-4 rounded-lg bg-primaryBrand text-primaryColor font-medium hover:bg-primaryBrand/90 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {registerLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-secondaryText">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-medium text-accentColor hover:text-accentColor/80 underline underline-offset-2"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
