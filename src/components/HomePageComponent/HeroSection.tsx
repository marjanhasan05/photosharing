// import React from "react";
// import heroImg from "@/assets/heroImg.png";
// export default function HeroSection() {
//   return (
//     <div>
//       <div className="relative h-screen w-full">
//         <img
//           src={heroImg}
//           alt="hero Image"
//           className="absolute inset-0 w-full h-full  "
//         />
//         <div className="absolute inset-0 bg-black/10 bg-opacity-50"></div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <h1 className="text-4xl text-white font-bold">Hello, World!</h1>
//           <p className="text-xl text-white mt-4">This is a sample text</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import heroImg from "@/assets/heroImg.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  console.log("CURRENT USER 👉", user);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden -mt-26 flex items-center justify-center"
      style={{
        height: "890px",
        background: `linear-gradient(
  0deg,
  rgba(0, 0, 0, 0.1),
  rgba(0, 0, 0, 0.1)
), url(${heroImg}) lightgray 50% / cover no-repeat`,
      }}
    >
      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center  px-4 ">
        {/* Heading */}
        {/* <h1
          className={`transition-all duration-700 ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            color: "#FEFEFE",
            textAlign: "center",
            fontFamily: "Lora, serif",
            fontSize: "64px",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "120%",
            letterSpacing: "0.768px",
          }}
        >
          {t("hero_title")}
        </h1> */}
        <h1
          className={`transition-all duration-700 ease-out text-[38px] sm:text-[48px] md:text-[64px] pt-0 md:pt-20 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            color: "#FEFEFE",
            textAlign: "center",
            fontFamily: "Lora, serif",
            fontStyle: "normal",
            fontWeight: 500,
            lineHeight: "120%",
            letterSpacing: "0.768px",
          }}
        >
          {t("hero_title")}
        </h1>

        {/* Subheading */}
        <p
          className={`text-white/90 text-base max-w-xl first-letter font-manrope leading-relaxed mb-10 transition-all duration-700 ease-out delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {t("hero_subtitle")}
        </p>

        {/* Buttons */}
        <div
          className={`flex items-center justify-center gap-4 transition-all duration-700 ease-out delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Primary Button */}
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
            className="bg-white text-gray-900 font-medium text-base px-8 py-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 hover:scale-[1.03] hover:shadow-lg active:scale-95"
          >
            {t("get_started")}
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => {
              const el = document.getElementById("how-it-works");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-transparent text-white font-medium text-base px-8 py-3 rounded-full border border-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/10 hover:scale-[1.03] hover:shadow-lg active:scale-95"
          >
            {t("see_how_it_works")}
          </button>
        </div>
      </div>
    </section>
  );
}
