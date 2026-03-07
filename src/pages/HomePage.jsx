import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <section className="border-b border-dividerBorder bg-primaryColor">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16 lg:py-20 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          {/* Hero copy */}
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-dividerBorder bg-neutralColor/60 px-3 py-1 text-xs font-medium text-secondaryText">
              Built for SMEs
              <span className="h-1 w-1 rounded-full bg-secondaryBrand" />
              Unlock credit & procurement
            </p>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primaryBrand">
                Stop being invisible to lenders and corporates.{" "}
                <span className="text-accentColor">
                  Get the visibility your business deserves.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-secondaryText max-w-xl">
                Kreditsu gives SMEs a verified digital identity and transaction
                history — so lenders can trust you, corporates can find you, and
                opportunities stop passing you by.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-primaryBrand px-5 py-2 text-sm font-medium text-primaryColor shadow-sm hover:bg-primaryBrand/90 transition-colors"
              >
                Build your profile free
              </Link>
              <Link
                to="/auth/login"
                className="text-sm font-medium text-primaryBrand hover:text-accentColor transition-colors"
              >
                See how it works
              </Link>
            </div>

            <p className="text-xs text-secondaryText/80">
              No credit card required. Start building your business credit
              profile today.
            </p>
          </div>

          {/* Right side visual */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-accentColor/10 blur-2xl" />
            <div className="rounded-3xl border border-dividerBorder bg-neutralColor shadow-lg shadow-primaryBrand/10 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primaryBrand text-primaryColor text-sm font-semibold">
                    MC
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-primaryText">
                      Mama Cee Groceries
                    </p>
                    <p className="text-xs text-secondaryText">
                      Retail · Accra, Ghana
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-secondaryBrand/10 px-3 py-1 text-[11px] font-medium text-secondaryBrand">
                  Verified
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-secondaryText">
                  About
                </p>
                <p className="text-xs text-secondaryText">
                  A family-owned grocery store supplying fresh produce and dry
                  goods to households and small restaurants across East Legon
                  and Adenta.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1 rounded-xl border border-dividerBorder bg-primaryColor/80 p-3">
                  <p className="text-[11px] font-medium text-secondaryText">
                    Website
                  </p>
                  <p className="truncate text-primaryBrand">
                    mamacee.kreditsu.com
                  </p>
                </div>
                <div className="space-y-1 rounded-xl border border-dividerBorder bg-primaryColor/80 p-3">
                  <p className="text-[11px] font-medium text-secondaryText">
                    Contact
                  </p>
                  <p className="text-primaryBrand">+233 55 000 0000</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primaryColor bg-surfaceColor text-[11px] text-primaryBrand">
                    JD
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primaryColor bg-surfaceColor text-[11px] text-primaryBrand">
                    MK
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primaryColor bg-surfaceColor text-[11px] text-primaryBrand">
                    +
                  </span>
                </div>
                <p className="text-[11px] text-secondaryText">
                  Credit profile active
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-neutralColor">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 lg:py-16 sm:px-6 lg:px-8">
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-primaryBrand">
              Everything you need to get financially visible
            </h2>
            <p className="text-sm text-secondaryText max-w-2xl mx-auto">
              Kreditsu gives your business the digital foundation it needs to
              access credit, win procurement contracts, and grow with
              confidence.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-dividerBorder bg-primaryColor p-5 shadow-sm">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accentColor/10 text-accentColor text-sm font-semibold">
                1
              </div>
              <h3 className="mb-2 text-sm font-semibold text-primaryText">
                Create your business profile
              </h3>
              <p className="text-sm text-secondaryText">
                Build a verified, branded business profile with your details,
                services, and story — the digital identity lenders and
                corporates actually trust.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-dividerBorder bg-primaryColor p-5 shadow-sm">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accentColor/10 text-accentColor text-sm font-semibold">
                2
              </div>
              <h3 className="mb-2 text-sm font-semibold text-primaryText">
                Track sales and expenses
              </h3>
              <p className="text-sm text-secondaryText">
                Log your daily transactions and build a financial track record
                over time. Your history becomes your most powerful asset when
                applying for credit.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-dividerBorder bg-primaryColor p-5 shadow-sm">
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accentColor/10 text-accentColor text-sm font-semibold">
                3
              </div>
              <h3 className="mb-2 text-sm font-semibold text-primaryText">
                Get discovered by lenders
              </h3>
              <p className="text-sm text-secondaryText">
                Lenders, fintechs, and corporates use Kreditsu to find
                creditworthy SMEs. A complete profile puts you in front of the
                right people at the right time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
