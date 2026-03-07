import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/main/Navbar";
import Footer from "../components/layout/main/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-neutralColor text-primaryText flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
