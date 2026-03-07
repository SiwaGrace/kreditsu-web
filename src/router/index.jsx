import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import { RouterProvider } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import Root from "../Root";

// public pages
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import NotFound from "../pages/NotFound";
import UnauthorizedPage from "../pages/UnauthorizedPage";

// auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// protected pages
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // ← silently checks session on every app load
    children: [
      // public Routes
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
        ],
      },

      // auth Routes
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
        ],
      },

      // protected Routes:SME routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "profile", element: <Profile /> },
            ],
          },
        ],
      },

      // catch unauthorized and all - 404 not found
      { path: "unauthorized", element: <UnauthorizedPage /> },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

{
  /* <ProtectedRoute roles={['sme']} />      // only SMEs
<ProtectedRoute roles={['lender']} />   // only lenders
<ProtectedRoute roles={['admin']} />    // only admins */
}
