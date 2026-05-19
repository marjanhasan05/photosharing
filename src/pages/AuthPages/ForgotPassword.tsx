import { useState } from "react";
import logo from "@/assets/logo (2).png";
import loginImg from "@/assets/forget.png";
import { useForgotPasswordMutation } from "@/Redux/features/auth/authApi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();
  const [form, setForm] = useState({ email: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email) {
      console.log(t("email_required"));
      return;
    }

    try {
      const res = await forgotPassword({ email: form.email }).unwrap();
      console.log("Forgot Password Response:", res);
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
            alt="Forgot Password"
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
                <span>{t("remember_password")}</span>
                <button
                  onClick={() => navigate("/login")}
                  className="text-orange-500 font-medium hover:underline cursor-pointer"
                >
                  {t("sign_in")}
                </button>
              </div>

              <h1 className="text-2xl font-lora font-medium text-gray-900 mt-6">
                {t("forgot_password_title")}
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                {t("forgot_password_desc")}
              </p>
            </div>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="block font-manrope text-sm font-medium text-gray-700 mb-1">
                {t("email")}
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("enter_email")}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-purple-300"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
              style={{
                background: "linear-gradient(90deg, #a855f7, #f97316)",
              }}
            >
              {t("submit")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
