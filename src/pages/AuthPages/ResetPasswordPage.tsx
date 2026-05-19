import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo (2).png";
import loginImg from "@/assets/resetPass.png";
import { useResetPasswordMutation } from "@/Redux/features/auth/authApi";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [resetPassword] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  //  GET TOKEN FROM URL
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ HANDLER ADDED
  const handleSubmit = async () => {
    if (!token) {
      console.log(t("token_missing"));
      return;
    }

    if (form.password !== form.confirmPassword) {
      console.log(t("password_not_matched"));
      return;
    }

    try {
      const res = await resetPassword({
        token,
        password: form.password,
      }).unwrap();

      console.log("Reset Password Response:", res);


      navigate("/login");
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div
        className="
        bg-white rounded-2xl overflow-hidden shadow-lg
        grid grid-cols-1 md:grid-cols-2
        max-w-4xl w-full min-h-[600px]
      "
      >
        {/* LEFT IMAGE */}
        <div className="relative hidden md:block h-full">
          <img
            src={loginImg}
            alt="Reset Password"
            className="absolute inset-0 w-full h-full object-fill"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            {/* HEADER */}
            <div className="mb-8">
              <div className="flex justify-end mb-2">
                <img src={logo} alt="logo" className="h-8" />
              </div>

              <div className="text-sm text-gray-500 mt-2 flex justify-end gap-1">
                <span>{t("back_to")}</span>
                <button
                  onClick={() => navigate("/login")}
                  className="text-orange-500 font-medium hover:underline cursor-pointer"
                >
                  {t("sign_in")}
                </button>
              </div>

              <h1 className="text-2xl font-lora font-medium text-gray-900 mt-6">
                {t("reset_password_title")}
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                {t("reset_password_desc")}
              </p>
            </div>

            {/* NEW PASSWORD */}
            <div className="mb-4">
              <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
                {t("new_password_label")}
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t("enter_new_password")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none focus:border-purple-300"
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

            {/* CONFIRM PASSWORD */}
            <div className="mb-6">
              <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
                {t("confirm_password_label")}
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder={t("confirm_new_password")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none focus:border-purple-300"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <Eye size={16} />
                  ) : (
                    <EyeOff size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 cursor-pointer rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(90deg, #a855f7, #f97316)",
              }}
            >
              {t("reset_password_title")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 