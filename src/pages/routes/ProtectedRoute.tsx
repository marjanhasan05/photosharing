import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/Redux/hooks";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

const ProtectedRoute = ({ allowedRole }: { allowedRole: string }) => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role?.toUpperCase() !== allowedRole.toUpperCase()) {
    return <Navigate to="/login" replace />; // FIXED (not /dashboard)
  }

  return <Outlet />;
};

export default ProtectedRoute;



// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "@/Redux/hooks";
// import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

// const ProtectedRoute = ({ allowedRole }: { allowedRole: string }) => {
//   const user = useAppSelector(selectCurrentUser);
//   const token = localStorage.getItem("accessToken");

//   // ✅ FIX 1: check token also
//   if (!token) return <Navigate to="/login" replace />;

//   // optional safety
//   if (!user) return <Navigate to="/login" replace />;

//   // role check
//   if (user.role?.toUpperCase() !== allowedRole.toUpperCase()) {
//     // ❌ DON'T send to login
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;