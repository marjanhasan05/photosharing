// import img1 from "@/assets/everything-1.png";
// import img2 from "@/assets/everything-2.png";
// import img3 from "@/assets/everything-3.png";

// export default function EverythingYouNeed() {
//   const features = [
//     {
//       title: "Easy Upload",
//       description:
//         "Guests can upload photos instantly from any device without downloading an app",
//       icon: img1,
//     },
//     {
//       title: "Simple Sharing",
//       description:
//         "Share your event via link or QR code. No registration required for guests",
//       icon: img2,
//     },
//     {
//       title: "Quick Download",
//       description:
//         "Download all event photos in high quality with a single click",
//       icon: img3,
//     },
//   ];

//   return (
//     <section className="py-20 mt-10 px-4 text-center bg-white">
//       <h2
//         style={{
//           color: "#121417",
//           fontFamily: "Lora, serif",
//           fontSize: "46px",
//           fontStyle: "normal",
//           fontWeight: 500,
//           lineHeight: "120%",
//         }}
//         className="mb-3"
//       >
//         Everything You Need
//       </h2>
//       <p className="text-center text-[#2F343A] font-[Manrope] text-[18px] font-medium leading-[140%] tracking-[0.27px] mb-16">
//         Simple, powerful tools to manage your event photos
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1440px] mx-auto">
//         {features.map((feature) => (
//           <div
//             key={feature.title}
//             className="bg-[#FDF6F2] border border-[#E9E2DE] rounded-2xl px-6 py-[40px] flex flex-col items-center gap-6"
//           >
//             <div className="w-20 h-20 flex items-center justify-center  rounded-xl p-3">
//               <img
//                 src={feature.icon}
//                 alt={feature.title}
//                 className="w-full h-full "
//               />
//             </div>
//             <h3 className="text-2xl font-lora font-medium text-gray-900">
//               {feature.title}
//             </h3>
//             <p className="text-base font-manrope text-[#2F343A] leading-relaxed">
//               {feature.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

import img1 from "@/assets/everything-1.png";
import img2 from "@/assets/everything-2.png";
import img3 from "@/assets/everything-3.png";

gsap.registerPlugin(ScrollTrigger);

export default function EverythingYouNeed() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      title: t("easy_upload"),
      description: t("easy_upload_desc"),
      icon: img1,
    },
    {
      title: t("simple_sharing"),
      description: t("simple_sharing_desc"),
      icon: img2,
    },
    {
      title: t("quick_download"),
      description: t("quick_download_desc"),
      icon: img3,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".everything-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 mt-10 px-4 text-center bg-white">
      <h2
        className="everything-title mb-3"
        style={{
          color: "#121417",
          fontFamily: "Lora, serif",
          fontSize: "46px",
          fontWeight: 500,
          lineHeight: "120%",
        }}
      >
        {t("everything_you_need")}
      </h2>

      <p className="text-center text-[#2F343A] font-[Manrope] text-[18px] font-medium leading-[140%] tracking-[0.27px] mb-16">
        {t("tools_subtitle")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1440px] mx-auto">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="bg-[#FDF6F2] border border-[#E9E2DE] rounded-2xl px-6 py-[40px] flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-xl p-3">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-full h-full"
              />
            </div>

            <h3 className="text-2xl font-lora font-medium text-gray-900">
              {feature.title}
            </h3>

            <p className="text-base font-manrope text-[#2F343A] leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
