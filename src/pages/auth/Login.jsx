import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form data:", formData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold text-primaryBrand">Sign in</h1>
        <p className="text-sm text-secondaryText">
          Access your Kreditsu dashboard to manage your credits and payments.
        </p>
      </div>

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
          className="w-full py-2.5 px-4 rounded-lg bg-primaryBrand text-primaryColor font-medium hover:bg-primaryBrand/90 focus:outline-none focus:ring-2 focus:ring-accentColor/30 focus:ring-offset-2 transition"
        >
          Sign in
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
