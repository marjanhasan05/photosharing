// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import logo from "@/assets/logo (2).png";
// import img from "@/assets/createAcount.png";
// import { useRegisterMutation } from "@/Redux/features/auth/authApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { BeatLoader } from "react-spinners";
// import { useTranslation } from "react-i18next";

// export default function CreateAccount() {
//   const { t } = useTranslation();
//   const [showPassword, setShowPassword] = useState(false);
//   const [checked, setChecked] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // handel register
//   const [register, { isLoading }] = useRegisterMutation();
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       const res = await register(form).unwrap();

//       console.log("REGISTER RESPONSE 👉", res);

//       if (res?.statusCode === 201) {
//         toast.success(res?.message || t("registration_success"));

//         navigate("/login"); // after success
//       } else {
//         toast.message(res?.message || t("registration_completed"));
//       }
//     } catch (err: any) {
//       console.log("REGISTER ERROR 👉", err);

//       toast.error(
//         err?.data?.message || err?.message || t("registration_failed"),
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
//       <div
//         className="
//         bg-white rounded-2xl overflow-hidden shadow-lg
//         grid grid-cols-1 md:grid-cols-2
//         max-w-4xl w-full
//       "
//       >
//         {/* Left — Image (hidden on mobile) */}
//         <div className="relative min-h-[360px] hidden md:block">
//           <img
//             src={img}
//             alt="Creator"
//             className="absolute inset-0 w-full h-full object-fill"
//           />
//         </div>

//         {/* Right — Form */}
//         <div className="flex flex-col justify-between p-4 sm:p-8">
//           {/* Top Section */}
//           <div>
//             {/* Header */}
//             <div className="mb-6">
//               {/* Logo */}
//               <div className=" flex  justify-end mb-1">
//                 <img src={logo} alt="logo" className="h-8" />
//               </div>

//               {/* Sign in */}
//               <div className="text-right flex justify-end items-center gap-1">
//                 <span className="text-sm font-lora text-gray-500">
//                   {t("already_have_account")}
//                 </span>
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="text-sm text-orange-500 font-medium hover:underline cursor-pointer"
//                 >
//                   {t("sign_in")}
//                 </button>
//               </div>
//             </div>

//             <h1 className="text-2xl font-lora font-medium text-gray-900 mb-6">
//               {t("create_account")}
//             </h1>

//             {/* Full Name */}
//             <div className="mb-4">
//               <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
//                 {t("full_name")}
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder={t("enter_details_start")}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-purple-300"
//               />
//             </div>

//             {/* Email */}
//             <div className="mb-4">
//               <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
//                 {t("email")}
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder={t("enter_email")}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-purple-300"
//               />
//             </div>

//             {/* Password */}
//             <div className="mb-5">
//               <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
//                 {t("password")}
//               </label>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder={t("enter_password")}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-500 outline-none focus:border-purple-300"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
//                 </button>
//               </div>
//             </div>

//             {/* Checkbox */}
//             <div className="flex items-start gap-2 mb-5">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={checked}
//                 onChange={() => setChecked(!checked)}
//                 className="mt-0.5 w-3.5 h-3.5 accent-purple-500 flex-shrink-0"
//               />

//               <label
//                 htmlFor="terms"
//                 className="text-xs font-manrope text-gray-500 leading-relaxed"
//               >
//                 {t("terms_accept")}
//                 <a href="#" className="text-orange-500 hover:underline">
//                   {t("privacy_policy")}
//                 </a>
//                 {t("terms_data")}
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="button"
//             onClick={handleRegister}
//             disabled={isLoading}
//             className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
//             style={{
//               background: "linear-gradient(90deg, #a855f7, #f97316)",
//             }}
//           >
//             {isLoading ? (
//               <BeatLoader color="#ffffff" size={8} />
//             ) : (
//               t("create_account")
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo (2).png";
import img from "@/assets/createAcount.png";
import { useRegisterMutation } from "@/Redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

export default function CreateAccount() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [successModal, setSuccessModal] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await register(form).unwrap();

      console.log("REGISTER RESPONSE 👉", res);

      if (res?.statusCode === 201) {
        setSuccessModal({ show: true, message: res?.message });
      } else {
        toast.message(res?.message || t("registration_completed"));
      }
    } catch (err: any) {
      console.log("REGISTER ERROR 👉", err);
      toast.error(
        err?.data?.message || err?.message || t("registration_failed"),
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

      {/* Success Modal */}
      {successModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center">
            {/* Checkmark Icon */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #a855f7, #f97316)" }}
            >
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-xl font-lora font-semibold text-gray-900 mb-2">
              Registration Successful!
            </h2>

            <p className="text-sm font-manrope text-gray-500 leading-relaxed mb-6">
              {successModal.message}
            </p>

            <button
              onClick={() => {
                setSuccessModal({ show: false, message: "" });
                navigate("/login");
              }}
              className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full">
        {/* Left — Image (hidden on mobile) */}
        <div className="relative min-h-[360px] hidden md:block">
          <img
            src={img}
            alt="Creator"
            className="absolute inset-0 w-full h-full object-fill"
          />
        </div>

        {/* Right — Form */}
        <div className="flex flex-col justify-between p-4 sm:p-8">
          {/* Top Section */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex justify-end mb-1">
                <img src={logo} alt="logo" className="h-8" />
              </div>
              <div className="text-right flex justify-end items-center gap-1">
                <span className="text-sm font-lora text-gray-500">
                  {t("already_have_account")}
                </span>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm text-orange-500 font-medium hover:underline cursor-pointer"
                >
                  {t("sign_in")}
                </button>
              </div>
            </div>

            <h1 className="text-2xl font-lora font-medium text-gray-900 mb-6">
              {t("create_account")}
            </h1>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
                {t("full_name")}
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("enter_details_start")}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-purple-300"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
                {t("email")}
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("enter_email")}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-purple-300"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
                {t("password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t("enter_password")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-500 outline-none focus:border-purple-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2 mb-5">
              <input
                type="checkbox"
                id="terms"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="mt-0.5 w-3.5 h-3.5 accent-purple-500 flex-shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-xs font-manrope text-gray-500 leading-relaxed"
              >
                {t("terms_accept")}
                <a href="#" className="text-orange-500 hover:underline">
                  {t("privacy_policy")}
                </a>
                {t("terms_data")}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
            style={{
              background: "linear-gradient(90deg, #a855f7, #f97316)",
            }}
          >
            {isLoading ? (
              <BeatLoader color="#ffffff" size={8} />
            ) : (
              t("create_account")
            )}
          </button>
        </div>
      </div>
    </div>
  );
}