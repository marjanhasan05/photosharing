import { createBrowserRouter } from "react-router";
import DashboardLayout from "../../layout/DashboardLayout";
import MainLayout from "../../layout/mainLayout/MainLayout";
import DashboardHome from "../Dashboard/DashboardHome";
import Home from "../Home/Home";
import EventUser from "../Dashboard/EventUser";
import CreateEven from "../Dashboard/CreateEven";
import EventCreateSuccessfullyPage from "../Dashboard/EventCreateSuccessfullyPage";
import EventDetailesPage from "../Dashboard/EventDetailesPage";
import WeddingModePage from "../Dashboard/WeddingModePage";
import UserPaymentPage from "../Dashboard/UserPaymentPage";
import UserProfileSetting from "../Dashboard/UserProfileSetting";

import AdminDashHome from "../AdminDashboard/AdminDashHome";
import LoginPage from "../AuthPages/LoginPage";
import AdminEventsManagement from "../AdminDashboard/AdminEventsManagement";
import AdminEventDetailesPage from "../AdminDashboard/AdminEventDetailesPage";
import AdminAllEventPhotosPage from "../AdminDashboard/AdminAllEventPhotosPage";
import UserManagementPage from "../AdminDashboard/UserManagementPage";
import AdminPamentManagementPage from "../AdminDashboard/AdminPamentManagementPage";
import AdminPaymentDetailesPage from "../AdminDashboard/AdminPaymentDetailesPage";
import RegisterPage from "../AuthPages/RegisterPage";
import ForgotPassword from "../AuthPages/ForgotPassword";
import ResetPasswordPage from "../AuthPages/ResetPasswordPage";
import GustLandingPage from "../GustPages/GustLandingPage";
import GustInputPassWord from "../GustPages/GustInputPassWord";
import GustViewPhoto from "../GustPages/GustViewPhoto";
import ProtectedRoute from "./ProtectedRoute";
import AuthVerifyPage from "../AuthPages/AuthVerifyPage";
import CreateCustomPlan from "../AdminDashboard/CreateCustomPlan";
import Tutorial from "../GustPages/Tutorial";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: <LoginPage />,
//       },
//       {
//         path: "/register",
//         element: <RegisterPage />,
//       },
//       {
//         path: "forgotPassword",
//         element: <ForgotPassword />,
//       },
//       {
//         path: "resetPassword",
//         element: <ResetPasswordPage />,
//       },
//       {
//         path: "gust-Landing",
//         element: <GustLandingPage />,
//       },
//       {
//         path: "gust-input-pass",
//         element: <GustInputPassWord />,
//       },
//       {
//         path: "gust-view-photo",
//         element: <GustViewPhoto />,
//       },
//     ],
//   },

//   // USER DASHBOARD ROUTES
//   {
//     path: "/dashboard",
//     element: <DashboardLayout />,
//     children: [
//       {
//         path: "",
//         element: <DashboardHome />,
//       },
//       {
//         path: "event",
//         element: <EventUser />,
//       },
//       {
//         path: "create-event",
//         element: <CreateEven />,
//       },
//       {
//         path: "create-event-successfully",
//         element: <EventCreateSuccessfullyPage />,
//       },
//       {
//         path: "event-details/:eventId",
//         element: <EventDetailesPage />,
//       },
//       {
//         path: "wedding-mode",
//         element: <WeddingModePage />,
//       },
//       {
//         path: "user-payment",
//         element: <UserPaymentPage />,
//       },
//       {
//         path: "settings",
//         element: <UserProfileSetting />,
//       },
//       // here route for admin
//       {
//         path: "admin",
//         children: [
//           {
//             path: "",
//             element: <AdminDashHome />,
//           },
//           {
//             path: "events-management",
//             element: <AdminEventsManagement />,
//           },
//           {
//             path: "events-detailes/:eventId",
//             element: <AdminEventDetailesPage />,
//           },
//           {
//             path: "all-event-photo/:eventId",
//             element: <AdminAllEventPhotosPage />,
//           },
//           {
//             path: "users-management",
//             element: <AdminAllEventPhotosPage />,
//           },
//           {
//             path: "admin-users",
//             element: <UserManagementPage />,
//           },
//           {
//             path: "admin-payment",
//             element: <AdminPamentManagementPage />,
//           },
//           {
//             path: "admin-payment-detailes",
//             element: <AdminPaymentDetailesPage />,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// export default routes;



const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
        {
        path: "auth/verify",
        element: <AuthVerifyPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "gust-Landing",
        element: <GustLandingPage />,
      },
      {
        path: "gust-input-pass",
        element: <GustInputPassWord />,
      },
      {
        path: "gust-view-photo",
        element: <GustViewPhoto />,
      },
      {
        path:"tutorial",
        element:<Tutorial/>
      }
    ],
  },

  // =========================
  // USER DASHBOARD (ONLY USER)
  // =========================
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRole="USER" />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "event",
            element: <EventUser />,
          },
          {
            path: "create-event",
            element: <CreateEven />,
          },
          {
            path: "create-event-successfully",
            element: <EventCreateSuccessfullyPage />,
          },
          {
            path: "event-details/:eventId",
            element: <EventDetailesPage />,
          },
          {
            path: "wedding-mode/:eventId",
            element: <WeddingModePage />,
          },
          {
            path: "user-payment",
            element: <UserPaymentPage />,
          },
          {
            path: "settings",
            element: <UserProfileSetting />,
          },
        ],
      },
    ],
  },

  // =========================
  // ADMIN DASHBOARD (ONLY ADMIN)
  // =========================
  {
    path: "/dashboard/admin",
    element: <ProtectedRoute allowedRole="ADMIN" />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AdminDashHome />,
          },
          {
            path: "events-management",
            element: <AdminEventsManagement />,
          },
          {
            path: "events-detailes/:eventId",
            element: <AdminEventDetailesPage />,
          },
          {
            path: "all-event-photo/:eventId",
            element: <AdminAllEventPhotosPage />,
          },
          // {
          //   path: "users-management",
          //   element: <UserManagementPage />,
          // },
          {
            path: "admin-users",
            element: <UserManagementPage />,
          },
          {
            path: "admin-payment",
            element: <AdminPamentManagementPage />,
          },
          {
            path: "admin-payment-detailes",
            element: <AdminPaymentDetailesPage />,
          },
          {
            path: "create-custom-plan",
            element: <CreateCustomPlan />,
          }
        ],
      },
    ],
  },
]);

export default routes;