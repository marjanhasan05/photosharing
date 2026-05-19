import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo (2).png";

import loginImg from "@/assets/login.png";
import { useLoginMutation } from "@/Redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function LoginPage() {
  const { t } = useTranslation();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // here log in handler
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(form).unwrap();

      console.log("LOGIN RESPONSE 👉", res);

      if (res?.statusCode === 201 || res?.code === 201) {
        toast.success(res?.message || t("login_success"));

        const user = res?.data?.user;
        const token = res?.data?.accessToken;

        console.log("USER 👉", user);
        console.log("ACCESS TOKEN 👉", token);

        // ✅ ROLE BASED REDIRECT (IMPORTANT)
        if (user.role?.toUpperCase() === "ADMIN") {
          navigate("/dashboard/admin");
        } else if (user.role?.toUpperCase() === "USER") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.message(res?.message || t("registration_completed"));
      }
    } catch (err: any) {
      console.log("LOGIN ERROR 👉", err);

      toast.error(
        err?.data?.message || err?.message || t("login_failed"),
      );
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
            alt="Login"
            className="absolute inset-0 w-full h-full object-fill"
          />
        </div>

        {/* RIGHT FORM (CENTERED UX) */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-sm">
            {/* HEADER */}
            <div className="mb-8 ">
              <div className="mb-8">
                <div className="flex justify-end mb-2">
                  <img src={logo} alt="logo" className="h-8" />
                </div>
                <div className="text-sm text-gray-500 mt-2 flex justify-end gap-1">
                  <span>{t("dont_have_account")}</span>
                  <Link to="/register"
                    className="text-orange-500 font-medium hover:underline"
                  >
                    {t("sign_up")}
                  </Link>
                </div>
              </div>

              <h1 className="text-2xl font-lora font-medium text-gray-900">
                {t("welcome_back")}
              </h1>
            </div>

            {/* EMAIL */}
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
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-purple-300"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-2.5">
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
            <div className="mb-6 flex justify-end">
              <p
                onClick={() => {
                  
                  navigate("/forgotPassword");
                }}
                className="text-purple-500 cursor-pointer text-sm font-medium hover:underline"
              >
                {t("forgot_password_q")}
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full py-3 rounded-full text-white text-sm font-medium flex items-center justify-center"
              style={{
                background: "linear-gradient(90deg, #a855f7, #f97316)",
              }}
            >
              {isLoading ? <BeatLoader color="#ffffff" size={8} /> : t("sign_in")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
