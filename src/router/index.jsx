import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import SMELayout from "../layouts/SMELayout";

import { RouterProvider } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";
import Root from "../Root";

// public pages
import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import BusinessDirectory from "../pages/public/BusinessDirectory";
import BusinessProfile from "../pages/public/BusinessProfile";
import NotFound from "../pages/NotFound";
import UnauthorizedPage from "../pages/UnauthorizedPage";

// auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// protected pages
import OnboardingPage from "../pages/sme/OnboardingPage";
// BusinessGuard will check if user has a business and redirect to onboarding if not
import BusinessGuard from "../router/BusinessGuard";
import Dashboard from "../pages/sme/DashboardPage";
import Profile from "../pages/sme/ProfilePage";
import ExpensesPage from "../pages/sme/ExpensesPage";
import SalesPage from "../pages/sme/SalesPage";
import BusinessProfilePage from "../pages/sme/BusinessProfilePage";

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
          {
            path: "directory",
            element: <BusinessDirectory />,
          },
          {
            path: "b/:slug",
            element: <BusinessProfile />,
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
          // onboarding — auth required but no business required
          {
            path: "onboarding",
            element: <OnboardingPage />,
          },

          // dashboard — auth + business required
          {
            element: <BusinessGuard />,
            children: [
              {
                element: <SMELayout />,
                children: [
                  { path: "dashboard", element: <Dashboard /> },
                  { path: "my-business", element: <BusinessProfilePage /> },
                  { path: "sales", element: <SalesPage /> },
                  { path: "expenses", element: <ExpensesPage /> },
                  { path: "profile", element: <Profile /> },
                ],
              },
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
