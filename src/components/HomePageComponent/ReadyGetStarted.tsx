// import bgBanner from "@/assets/CTA.png";

// export default function ReadyGetStarted() {
//   return (
//     <section className="w-full bg-[#E8EDF5] px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-20">
//       <div
//         className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[24px] px-6 py-20 md:py-28 lg:py-36"
//         style={{
//           backgroundImage: `url(${bgBanner})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* Dark overlay for better text readability */}
//         <div className="absolute inset-0 rounded-[24px] bg-black/20" />

//         {/* Content */}
//         <div className="relative z-10 flex flex-col items-center text-center">
//           <h2 className="mb-3 text-center font-[Lora] text-[48px] font-medium leading-[120%] text-white">
//             Ready to Get started ?
//           </h2>
//           <p className="mb-8 max-w-[480px] text-center font-manrope text-[18px] font-medium leading-[140%] tracking-[0.27px] text-[#FEFEFE]">
//             See how Synapses can transform your planning and analytics.
//           </p>

//           <button className="rounded-xl cursor-pointer bg-[#F97316] px-10 py-3 font-[Manrope] text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#F97316]/30 active:scale-[0.98] md:text-[16px]">
//             Create your first event
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

import bgBanner from "@/assets/CTA.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";

gsap.registerPlugin(ScrollTrigger);

export default function ReadyGetStarted() {
  const { t } = useTranslation();
    const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-text",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".cta-box",
            start: "top 80%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-[#E8EDF5] px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-20">
      <div
        className="cta-box relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[24px] px-6 py-20 md:py-28 lg:py-36"
        style={{
          backgroundImage: `url(${bgBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 rounded-[24px] bg-black/20" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="cta-text mb-3 text-center font-[Lora] text-[48px] font-medium leading-[120%] text-white">
            {t("ready_to_get_started")}
          </h2>

          <p className="cta-text mb-8 max-w-[480px] text-center font-manrope text-[18px] font-medium leading-[140%] tracking-[0.27px] text-[#FEFEFE]">
            {t("transform_planning")}
          </p>

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
                navigate("/dashboard/create-event");
              } else {
                navigate("/dashboard"); // fallback
              }
            }}
           className="rounded-xl cursor-pointer bg-[#F97316] px-10 py-3 font-[Manrope] text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#F97316]/30 active:scale-[0.98] md:text-[16px]">
            {t("create_first_event")}
          </button>
        </div>
      </div>
    </section>
  );
}
