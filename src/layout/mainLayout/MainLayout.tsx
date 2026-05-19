import NavBar from "@/components/ShearComponent/NavBar";
import { Outlet, useLocation } from "react-router";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function MainLayout() {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/login",
    "/register",
    "/forgotPassword",
    "/auth/verify",
    "/resetPassword",
    "/gust-Landing",
    "/gust-input-pass",
    "/gust-view-photo",
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      {/* navbar here */}
      {!shouldHideNavbar && <NavBar />}

      {/* Persistent mini language switcher for pages without NavBar */}
      {shouldHideNavbar && (
        <div className="fixed top-4 right-4 z-[9999]">
          <LanguageSwitcher variant="mini" />
        </div>
      )}

      <main>
        <Outlet />
      </main>

      {/* footer here */}
    </div>
  );
}