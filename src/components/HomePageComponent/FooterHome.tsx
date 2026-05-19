// import React from "react";

// export default function FooterHome() {
//   return (
//     <div className="bg-black text-center py-6">
//       <hr className="border-white/10 mb-4 mt-6" />

//       <p className="text-center font-manrope text-[18px] font-medium leading-[140%] tracking-[0.27px] text-[#B6BDC4]">
//         Copyright © 2025 by{" "}
//         <span className="bg-[linear-gradient(0deg,#E44D26_0%,#F16529_100%)] bg-clip-text text-transparent font-semibold">
//           Event Creator
//         </span>
//       </p>
//     </div>
//   );
// }

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function FooterHome() {
  const { t } = useTranslation();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // footer fade-up
      gsap.fromTo(
        ".footer-animate",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-section",
            start: "top 90%",
          },
        },
      );

      // subtle divider animation
      gsap.fromTo(
        ".footer-line",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          transformOrigin: "center",
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".footer-section",
            start: "top 92%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="footer-section bg-black text-center py-6">
      <hr className="footer-line border-white/10 mb-4 mt-6" />

      <p className="footer-animate text-center font-manrope text-[18px] font-medium leading-[140%] tracking-[0.27px] text-[#B6BDC4]">
        {t("copyright_text")}{" "}
        <span className="relative inline-block font-semibold text-transparent bg-[linear-gradient(0deg,#E44D26_0%,#F16529_100%)] bg-clip-text cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,100,50,0.6)]">
          {t("event_creator")}
        </span>
      </p>
    </div>
  );
}
