




// import { useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import logo from "@/assets/logo (2).png";
// import loginImg from "@/assets/forget.png";
// import { useVerifyEmailMutation } from "@/Redux/features/auth/authApi";

// export default function AuthVerifyPage() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const [verifyEmail, { isLoading, isSuccess, isError, error }] =
//     useVerifyEmailMutation();

//   useEffect(() => {
//     const token = searchParams.get("token");
//     if (token) {
//       verifyEmail(token);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full min-h-[600px]">

//         {/* LEFT IMAGE */}
//         <div className="relative hidden md:block h-full">
//           <img
//             src={loginImg}
//             alt="Verify Email"
//             className="absolute inset-0 w-full h-full object-fill"
//           />
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="flex items-center justify-center p-6 sm:p-10">
//           <div className="w-full max-w-sm">

//             {/* LOGO */}
//             <div className="flex justify-end mb-8">
//               <img src={logo} alt="logo" className="h-8" />
//             </div>

//             {/* VERIFYING */}
//             {isLoading && (
//               <div className="text-center">
//                 <div className="flex justify-center mb-6">
//                   <div className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin" />
//                 </div>
//                 <h1 className="text-2xl font-medium text-gray-900 mb-2">
//                   Verifying your email
//                 </h1>
//                 <p className="text-sm text-gray-500">Please wait a moment...</p>
//               </div>
//             )}

//             {/* SUCCESS */}
//             {isSuccess && (
//               <div className="text-center">
//                 <div className="flex justify-center mb-6">
//                   <div
//                     className="h-16 w-16 rounded-full flex items-center justify-center"
//                     style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
//                   >
//                     <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                 </div>
//                 <h1 className="text-2xl font-medium text-gray-900 mb-2">
//                   Email Verified!
//                 </h1>
//                 <p className="text-sm text-gray-500 mb-8">
//                   Your account has been verified successfully.
//                 </p>
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
//                   style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
//                 >
//                   Go to Sign In
//                 </button>
//               </div>
//             )}

//             {/* ERROR */}
//             {isError && (
//               <div className="text-center">
//                 <div className="flex justify-center mb-6">
//                   <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
//                     <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </div>
//                 </div>
//                 <h1 className="text-2xl font-medium text-gray-900 mb-2">
//                   Verification Failed
//                 </h1>
//                 <p className="text-sm text-gray-500 mb-8">
//                   {(error as any)?.data?.message || "Link may be expired or invalid."}
//                 </p>
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
//                   style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
//                 >
//                   Back to Sign In
//                 </button>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import logo from "@/assets/logo (2).png";
import loginImg from "@/assets/forget.png";
import { useVerifyEmailMutation } from "@/Redux/features/auth/authApi";

export default function AuthVerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [count, setCount] = useState<number | null>(null);

  const [verifyEmail, { isLoading, isSuccess, isError, error }] =
    useVerifyEmailMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      verifyEmail(token);
    }
  }, [searchParams, verifyEmail]);

  // countdown after success
  useEffect(() => {
    if (!isSuccess) return;

    setCount(5);
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full min-h-[600px] ">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src={loginImg}
            alt="Verify Email"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-orange-500/10" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-sm">

            {/* LOGO */}
            <div className="flex justify-end mb-10">
              <img src={logo} alt="logo" className="h-8" />
            </div>

            {/* LOADING */}
            {isLoading && (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin" />
                </div>

                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Verifying your email
                </h1>
                <p className="text-sm text-gray-500">
                  Please wait while we confirm your account...
                </p>
              </div>
            )}

            {/* SUCCESS */}
            {isSuccess && (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-orange-500">
                    <svg
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Email Verified!
                </h1>

                <p className="text-sm text-gray-500 mb-6">
                  Your account is now active and ready to use.
                </p>

                <p className="text-xs text-gray-400 mb-6">
                  Redirecting to login in{" "}
                  <span className="font-semibold text-gray-700">
                    {count}
                  </span>{" "}
                  seconds...
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-full text-white text-sm font-medium transition hover:opacity-90"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #f97316)",
                  }}
                >
                  Go to Sign In
                </button>
              </div>
            )}

            {/* ERROR */}
            {isError && (
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>

                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Verification Failed
                </h1>

                <p className="text-sm text-gray-500 mb-8">
                  {(error as any)?.data?.message ||
                    "This link is invalid or has expired."}
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-full text-white text-sm font-medium transition hover:opacity-90"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #f97316)",
                  }}
                >
                  Back to Sign In
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}