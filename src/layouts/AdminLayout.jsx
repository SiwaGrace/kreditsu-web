import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-neutralColor text-primaryText flex flex-col">
      <header>AdminLayout header</header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}
