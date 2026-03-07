import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Kreditsu. All rights reserved.</p>
      </footer>
    </div>
  );
}
