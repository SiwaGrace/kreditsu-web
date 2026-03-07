import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutralColor px-4 py-6 flex flex-col">
      <header className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primaryBrand font-semibold"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primaryBrand text-primaryColor text-base">
            k
          </span>
          <span className="text-lg">kreditsu</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          <section className="bg-primaryColor rounded-2xl shadow-lg shadow-primaryBrand/10 border border-primaryBrand/10 p-6 sm:p-8">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}
