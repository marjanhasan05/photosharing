
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router";

// // Assume these icons are imported from an icon library

// import { useSidebar } from "../hooks/useSidebar";

// import logo from "../assets/logoN.svg";
// import { CircleUser, Ellipsis, Grid2x2, House, Rows4 } from "lucide-react";

// let role = "admin";
// const navItems =
//   role === "admin"
//     ? [
//         {
//           icon: <Grid2x2 />,
//           name: "Dashboard",
//           path: "/dashboard/admin",
//         },
//         {
//           icon: <House />,
//           name: "Event Management",
//           path: "/dashboard/admin/events-management",
//         },
//         {
//           icon: <CircleUser />,
//           name: "Users",
//           path: "/dashboard/admin/admin-users",
//         },
//         {
//           icon: <Rows4 />,
//           name: "Settings",
//           path: "/dashboard/admin/admin-payment",
//         },
//       ]
//     : [
//         {
//           icon: <Grid2x2 />,
//           name: "Dashboard",
//           path: "/dashboard",
//         },
//         {
//           icon: <House />,
//           name: "Event",
//           path: "/dashboard/event",
//         },
//         {
//           icon: <CircleUser />,
//           name: "Payment",
//           path: "/dashboard/user-payment",
//         },
//         {
//           icon: <Rows4 />,
//           name: "Settings",
//           path: "/dashboard/settings",
//         },
//       ];
// const AppSidebar: React.FC = () => {
//   const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
//   const location = useLocation();

//   const [openSubmenu] = useState<{
//     type: "main" | "others";
//     index: number;
//   } | null>(null);
//   const [, setSubMenuHeight] = useState<Record<string, number>>({});
//   const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   // const isActive = (path: string) => location.pathname === path;
//   const isActive = useCallback(
//     (path: string) => location.pathname === path,
//     [location.pathname],
//   );

//   useEffect(() => {
//     if (openSubmenu !== null) {
//       const key = `${openSubmenu.type}-${openSubmenu.index}`;
//       if (subMenuRefs.current[key]) {
//         setSubMenuHeight((prevHeights) => ({
//           ...prevHeights,
//           [key]: subMenuRefs.current[key]?.scrollHeight || 0,
//         }));
//       }
//     }
//   }, [openSubmenu]);

//   const renderMenuItems = (items: any) => (
//     <ul className="flex flex-col gap-4">
//       {items.map((nav: any) => (
//         <li key={nav.name}>
//           {nav.path && (
//             <Link
//               to={nav.path}
//               className={`menu-item group ${
//                 isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
//               }`}
//             >
//               <span
//                 className={`menu-item-icon-size ${
//                   isActive(nav.path)
//                     ? "menu-item-icon-active"
//                     : "menu-item-icon-inactive"
//                 }`}
//               >
//                 {nav.icon}
//               </span>

//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <span className="menu-item-text">{nav.name}</span>
//               )}
//             </Link>
//           )}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <aside
//       className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#FEFEFE] border-[#E9ECEF] rounded-2xl dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r 
//         ${
//           isExpanded || isMobileOpen
//             ? "w-[290px]"
//             : isHovered
//               ? "w-[290px]"
//               : "w-[90px]"
//         }
//         ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0`}
//       onMouseEnter={() => !isExpanded && setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="py-2 pt-6  w-full flex items-center justify-center">
//         <Link to="/" className="flex items-center justify-center">
//           {isExpanded || isHovered || isMobileOpen ? (
//             <>
//               <img
//                 className="dark:hidden"
//                 src={logo}
//                 alt="rLogott"
//                 width={60}
//                 height={60}
//               />
//               <img
//                 className="hidden dark:block"
//                 src={logo}
//                 alt="Logo"
//                 width={60}
//                 height={60}
//               />
//             </>
//           ) : (
//             <img src={logo} alt="Logo" width={32} height={32} />
//           )}
//         </Link>
//       </div>
//       <div className="flex flex-col h-full overflow-y-auto duration-300 ease-linear no-scrollbar">
//         <nav className="mb-4">
//           <div className="flex flex-col gap-4">
//             <div>
//               <h2
//                 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
//                   !isExpanded && !isHovered
//                     ? "lg:justify-center"
//                     : "justify-start"
//                 }`}
//               >
//                 {isExpanded || isHovered || isMobileOpen ? (
//                   "Menu"
//                 ) : (
//                   <Ellipsis className="size-6" />
//                 )}
//               </h2>
//               {renderMenuItems(navItems)}
//             </div>
//           </div>
//         </nav>
//         {isExpanded || isHovered || isMobileOpen ? "" : null}
//         <div className="mt-auto mb-8">
//           <button className="text-[#E33A4B]">Log out</button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AppSidebar;




import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library

import { useSidebar } from "../hooks/useSidebar";

import logo from "../assets/logoN.svg";
import { CircleUser, Ellipsis, Grid2x2, House, Rows4 } from "lucide-react";
import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";

const AppSidebar: React.FC = () => {
  const { t } = useTranslation();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const user = useAppSelector(selectCurrentUser);
  const role = user?.role || "USER";

  const navItems =
    role === "ADMIN"
      ? [
          {
            icon: <Grid2x2 />,
            name: t("dashboard"),
            path: "/dashboard/admin",
          },
          {
            icon: <House />,
            name: t("event_management"),
            path: "/dashboard/admin/events-management",
          },
          {
            icon: <CircleUser />,
            name: t("users"),
            path: "/dashboard/admin/admin-users",
          },
          {
            icon: <Rows4 />,
            name: t("payment"),
            path: "/dashboard/admin/admin-payment",
          },
        ]
      : [
          {
            icon: <Grid2x2 />,
            name: t("dashboard"),
            path: "/dashboard",
          },
          {
            icon: <House />,
            name: t("event"),
            path: "/dashboard/event",
          },
          {
            icon: <CircleUser />,
            name: t("payment"),
            path: "/dashboard/user-payment",
          },
          {
            icon: <Rows4 />,
            name: t("settings"),
            path: "/dashboard/settings",
          },
        ];

  const [openSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);

  const [, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const renderMenuItems = (items: any) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav: any) => (
        <li key={nav.name}>
          {nav.path && (
            <Link
              to={nav.path}
              className={`menu-item group ${
                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#FEFEFE] border-[#E9ECEF] rounded-2xl dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-2 pt-6  w-full flex items-center justify-center">
        <Link to="/" className="flex items-center justify-center">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src={logo}
                alt="rLogott"
                width={60}
                height={60}
              />
              <img
                className="hidden dark:block"
                src={logo}
                alt="Logo"
                width={60}
                height={60}
              />
            </>
          ) : (
            <img src={logo} alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      <div className="flex flex-col h-full overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-4">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  t("menu")
                ) : (
                  <Ellipsis className="size-6" />
                )}
              </h2>

              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>

        <div className="mt-auto mb-8">
          <button className="text-[#E33A4B]">{t("log_out")}</button>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;