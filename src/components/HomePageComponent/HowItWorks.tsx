// import work1 from "@/assets/work1.png";
// import work2 from "@/assets/work2.png";
// import work3 from "@/assets/work3.png";

// export default function HowItWorks() {
//   const steps = [
//     {
//       icon: work1, // Replace with your actual icon path
//       number: "1",
//       title: "Create Your Event",
//       description:
//         "Set up your event in seconds with a name, date, and optional password protection",
//     },
//     {
//       icon: work2, // Replace with your actual icon path
//       number: "2",
//       title: "Share with Guests",
//       description:
//         "Share your unique event link or QR code with guests via email, text, or social media",
//     },
//     {
//       icon: work3, // Replace with your actual icon path
//       number: "3",
//       title: "Collect & Download",
//       description:
//         "Guests upload photos instantly. Download everything in one click when ready",
//     },
//   ];
//   return (
//     <section className="py-24 mt-10 px-4 md:px-0  text-center bg-[#F5F5F5]">
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
//         How It Works
//       </h2>
//       <p className="text-center text-[#2F343A] font-[Manrope] text-[18px] font-medium leading-[140%] tracking-[0.27px] mb-16">
//         Get started in three simple steps
//       </p>

//       {/* Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1440px] mx-auto">
//         {steps.map((step) => (
//           <div
//             key={step.number}
//             className="bg-[#FEFEFE] rounded-2xl p-10 border border-[#EEEFFD] "
//           >
//             {/* Top row: icon left, number right */}
//             <div className="flex items-start justify-between mb-14">
//               <img
//                 src={step.icon}
//                 alt={step.title}
//                 className="w-16 h-16 object-contain"
//               />
//               <span
//                 style={{
//                   color: "#D1D5DB",
//                   fontFamily: "Lora, serif",
//                   fontSize: "48px",
//                   fontWeight: 500,
//                   lineHeight: "1",
//                 }}
//               >
//                 {step.number}
//               </span>
//             </div>

//             {/* Bottom: title + description */}
//             <div>
//               <h3 className="text-2xl text-left font-lora font-medium text-gray-900">
//                 {step.title}
//               </h3>
//               <p className="text-base text-left font-manrope text-[#2F343A] leading-relaxed mt-3">
//                 {step.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import work1 from "@/assets/work1.png";
import work2 from "@/assets/work2.png";
import work3 from "@/assets/work3.png";

gsap.registerPlugin(ScrollTrigger);

import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const steps = [
    {
      icon: work1,
      number: "1",
      title: t("step1_title"),
      description: t("step1_desc"),
    },
    {
      icon: work2,
      number: "2",
      title: t("step2_title"),
      description: t("step2_desc"),
    },
    {
      icon: work3,
      number: "3",
      title: t("step3_title"),
      description: t("step3_desc"),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".how-title",
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
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.18,
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
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 mt-10 px-4 md:px-0 text-center bg-[#F5F5F5]"
    >
      <h2
        className="how-title mb-3"
        style={{
          color: "#121417",
          fontFamily: "Lora, serif",
          fontSize: "46px",
          fontWeight: 500,
          lineHeight: "120%",
        }}
      >
        {t("how_it_works")}
      </h2>

      <p className="text-center text-[#2F343A] font-[Manrope] text-[18px] font-medium leading-[140%] tracking-[0.27px] mb-16">
        {t("get_started_steps")}
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1440px] mx-auto">
        {steps.map((step, i) => (
          <div
            key={step.number}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="bg-[#FEFEFE] rounded-2xl p-10 border border-[#EEEFFD]"
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-14">
              <img
                src={step.icon}
                alt={step.title}
                className="w-16 h-16 object-contain"
              />

              <span
                style={{
                  color: "#D1D5DB",
                  fontFamily: "Lora, serif",
                  fontSize: "48px",
                  fontWeight: 500,
                  lineHeight: "1",
                }}
              >
                {step.number}
              </span>
            </div>

            {/* Bottom */}
            <div>
              <h3 className="text-2xl text-left font-lora font-medium text-gray-900">
                {step.title}
              </h3>

              <p className="text-base text-left font-manrope text-[#2F343A] leading-relaxed mt-3">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
