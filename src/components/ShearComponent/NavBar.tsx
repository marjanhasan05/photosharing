import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { logout, selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logoN.svg";
import LanguageSwitcher from "../common/LanguageSwitcher";
// Menu items array
// const menuItems = [
//   { path: "/", label: "Home" },
//   { path: "/about", label: "How it works" },
//   {
//     path: "/pricing",
//     label: "Pricing",
//   },
// ];

const NavBar = () => {
  const { t } = useTranslation();
  const menuItems = [
    { path: "/", label: t("home"), section: "home" },
    {
      path: "#how-it-works",
      label: t("how_it_works"),
      section: "how-it-works",
    },
    { path: "#pricing", label: t("pricing"), section: "pricing" },
  ];
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // logout handler
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  console.log("iam the user from redux", user);

  const handleLogout = () => {
    dispatch(logout()); // Clear user and token from Redux
    localStorage.removeItem("accessToken"); // optional if you store token locally
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md backdrop-saturate-150 border-b border-white/20 shadow-sm">
      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto ">
        <div className="flex items-center justify-between h-24 ml-2 md:ml-0">
          {/* Logo */}
          <div className="flex-shrink-0 h-16 w-16  overflow-hidden  p-1">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="h-20 w-20 mr-2 object-cover  "
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 font-manrope text-[18px] font-normal leading-[140%] tracking-[0.09px] transition-colors ${
                    isActive
                      ? "text-[#8B5CF6] border-b-2 border-[#8B5CF6]"
                      : "text-black hover:text-[#8B5CF6]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))} */}

            {/* -------  */}
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveSection(item.section);

                  if (item.section === "home") {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate("/");

                    setTimeout(() => {
                      document
                        .getElementById(item.section)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                className={`px-3 py-2 font-manrope text-[18px] transition-colors cursor-pointer ${
                  activeSection === item.section
                    ? "text-[#8B5CF6] border-b-2 border-[#8B5CF6]"
                    : "text-[#ED4E91] hover:text-[#8B5CF6]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* <button className="text-white hover:text-teal-400 p-2 transition-colors">
              <Search className="w-5 h-5" />
            </button> */}
            {user ? (
              <button
                onClick={handleLogout}
                className=" cursor-pointer  hover:border-2 hover:border-[#8B5CF6] text-[#8B5CF6]    px-6 py-2 rounded-full font-medium transition-all"
              >
                {t("log_out")}
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className=" cursor-pointer  hover:border-2 hover:border-[#8B5CF6] text-[#8B5CF6]    px-6 py-2 rounded-full  font-medium transition-all"
              >
                {t("log_in")}
              </button>
            )}
            <button
              onClick={() => {
                if (!user) {
                  console.log(user);
                  navigate("/register");
                  return;
                }

                if (user?.role === "ADMIN") {
                  console.log(user);
                  navigate("/dashboard/admin"); // FIXED ONLY THIS LINE
                } else if (user?.role === "USER") {
                  navigate("/dashboard");
                } else {
                  navigate("/dashboard"); // fallback
                }
              }}
              className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] cursor-pointer text-white px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#EC4899]/30 active:scale-[0.98]"
            >
              {user ? t("dashboard") : t("get_started")}
            </button>
            <div className="hidden md:block">
              <LanguageSwitcher variant="mini" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center mr-2">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-teal-400 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-black" />
                ) : (
                  <path
                    className="stroke-pink-500"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden ">
          <div className="px-4 pt-2 pb-4 space-y-2 bg-gray-200">
            {/* {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#363636] text-white "
                      : "text-white hover:bg-[#0a1f44] hover:text-[#2b7fff]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))} */}
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveSection(item.section);
                  setIsOpen(false);

                  if (item.section === "home") {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate("/");
                    setTimeout(() => {
                      document
                        .getElementById(item.section)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeSection === item.section
                    ? "bg-[#363636] text-pink-500"
                    : "text-balack border  hover:bg-[#0a1f44] hover:text-[#2b7fff]"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              <div className="flex flex-col space-y-2 mt-4 ">
                {user ? (
                  <>
                    <button
                      onClick={handleLogout}
                      className="border-2 border-black text-black hover:bg-white hover:text-[#0a1f44] w-full px-4 py-2 rounded-full font-medium  hover:scale-[1.02] transition-all duration-500 ease-out transform"
                    >
                      {t("log_out")}
                    </button>
                    <button
                      onClick={() => {
                        if (!user) {
                          console.log(user);
                          navigate("/register");
                          return;
                        }

                        if (user?.role === "ADMIN") {
                          console.log(user);
                          navigate("/dashboard/admin"); // FIXED ONLY THIS LINE
                        } else if (user?.role === "USER") {
                          navigate("/dashboard");
                        } else {
                          navigate("/dashboard"); // fallback
                        }
                      }}
                      className="border-2 border-black text-black hover:bg-white hover:text-[#0a1f44] w-full px-4 py-2 rounded-full font-medium  hover:scale-[1.02] transition-all duration-500 ease-out transform"
                    >
                      {user ? t("dashboard") : t("get_started")}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="border-2 border-black text-black hover:bg-white hover:text-[#0a1f44] w-full px-4 py-2 rounded-full font-medium  hover:scale-[1.02] transition-all duration-500 ease-out transform"
                  >
                    {t("log_in")}
                  </button>
                )}
              </div>
              {/* Mobile Language Switcher */}
              <div className="px-3 py-4 border-t border-gray-100 mt-2 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">
                  {t("language")}
                </span>
                <LanguageSwitcher variant="mini" />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
