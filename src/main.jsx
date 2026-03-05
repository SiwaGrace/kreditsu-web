import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { store } from "./store/store";
import { Provider } from "react-redux";

import { HelmetProvider } from "react-helmet-async";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
        {/* <RouterProvider router={router} /> */}
      </HelmetProvider>
    </Provider>
  </StrictMode>,
);
