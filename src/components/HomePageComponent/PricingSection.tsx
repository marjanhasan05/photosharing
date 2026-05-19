// import blackImg from "@/assets/black.png";
// import redImg from "@/assets/red.png";
// import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
// import { useAppSelector } from "@/Redux/hooks";
// import { useNavigate } from "react-router";
// import { useTranslation } from "react-i18next";

// const starterFeatures = [
//   "feature_storage",
//   "feature_photos",
//   "feature_access_30",
//   "feature_sharing_basic",
//   "feature_support_std",
// ];

// const plusFeatures = [
//   "feature_storage_25",
//   "feature_access_90",
//   "feature_sharing_adv",
//   "feature_support_prio",
//   "feature_branding",
// ];

// const enterpriseFeatures = [
//   "feature_storage_100",
//   "feature_photos_unlimited",
//   "feature_access_365",
//   "feature_sharing_prem",
//   "feature_customization",
// ];

// function FeatureItem({
//   text,
//   gradient = false,
// }: {
//   text: string;
//   gradient?: boolean;
// }) {
//   return (
//     <li className="flex items-center gap-2">
//       <img
//         src={gradient ? redImg : blackImg}
//         alt="icon"
//         className="w-[18px] h-[18px] shrink-0"
//       />

//       <span className="font-manrope text-base font-medium leading-[150%] text-[#181A18]">
//         {text}
//       </span>
//     </li>
//   );
// }
// export default function PricingSection() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const user =useAppSelector(selectCurrentUser);
//   const handleCreateEvent = () => {
//   if (!user) {
//     navigate("/login"); // 👉 login na thakle ekhane jabe
//     return;
//   }

//   if (user?.role === "ADMIN") {
//     navigate("/dashboard/admin/admin-payment");
//   } else {
//     navigate("/dashboard/create-event");
//   }
// };
//   return (
//     <section
//       id="pricing"
//       className="w-full bg-white py-10 md:py-[80px] px-4 lg:px-0"
//     >
//       {/* max-width 1440px container */}
//       <div className="mx-auto w-full max-w-[1440px] ">
//         {/* Header */}
//         <div className="mb-8 text-center md:mb-18">
//           <h2 className="mb-3 font-[Lora] text-[32px] font-medium leading-[120%] text-[#121417] sm:text-[40px] md:text-[48px]">
//             {t("pricing_title")}
//           </h2>
//           <p className="font-[Manrope] text-[15px] font-medium leading-[140%] tracking-[0.27px] text-[#2F343A] sm:text-[16px] md:text-[18px]">
//             {t("pricing_subtitle")}
//           </p>
//         </div>

//         {/* Cards — stacked on mobile, 1 col on sm, 3 col on lg */}
//         <div className="flex flex-col items-center gap-5 md:flex-row md:items-start md:justify-between lg:gap-8  ">
//           {/* ── Starter ── */}
//           <div
//             className="flex w-full max-w-[450px] flex-col items-start gap-6 rounded-[20px] border border-[#EDEDED] px-[10px] pb-[30px] pt-[10px]"
//             style={{
//               background: "linear-gradient(180deg, #F5F7F9 0%, #FCFCFD 100%)",
//             }}
//           >
//             <div className=" w-full space-y-6 bg-[#FFF] border border-[#EDEDED] p-4 rounded-2xl">
//               {/* Name + tagline */}
//               <div className="flex w-full flex-col gap-2 px-[10px] pt-[4px] ">
//                 <h3 className="font-[Manrope] text-[20px] font-bold leading-[140%] text-[#121417]">
//                   {t("Basic")}
//                 </h3>
//                 <p className="font-[Manrope] text-[14px] font-normal leading-[150%] text-[#6B7280]">
//                   {t("perfect_small")}
//                 </p>
//               </div>

//               {/* Price */}
//               <div className="flex items-baseline gap-1 px-[10px]">
//                 <span className="font-[Lora] text-[40px] font-bold leading-none text-[#121417]">
//                   49 {t("currency_sign")}
//                 </span>
//                 <span className="font-[Manrope] text-[14px] font-medium text-[#6B7280]">
//                   / {t("event")}
//                 </span>
//               </div>

//               {/* Button */}
//               <div className="w-full px-[10px]">
//                 <button
//                   onClick={handleCreateEvent}
//                  className="w-full cursor-pointer rounded-xl border-none bg-[#8B5CF6] py-3 font-[Manrope] text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#7c3aed] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#8B5CF6]/30 active:scale-[0.98]">
//                   {t("create_event")}
//                 </button>
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="h-px w-full bg-[#F3F4F6]" />

//             {/* Features */}
//             <ul className="m-0 flex w-full list-none flex-col gap-3 pl-[10px] pr-[10px]">
//               {starterFeatures.map((f, i) => (
//                 <FeatureItem key={i} text={t(f)} />
//               ))}
//             </ul>
//           </div>

//           {/* ── Plus (gradient border) ── */}
//           <div className="w-full max-w-[450px] shrink-0 rounded-[22px] p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
//             <div
//               className="flex h-full w-full flex-col items-start gap-6 rounded-[20px] px-[10px] pb-[30px] pt-[10px]"
//               style={{
//                 background: "linear-gradient(180deg, #F5F7F9 0%, #FCFCFD 100%)",
//               }}
//             >
//               {/* Name + badge + tagline */}
//               <div className="w-full rounded-2xl p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
//                 <div className="w-full space-y-6 p-4 rounded-2xl bg-white">
//                   <div className="w-full px-[10px] pt-[14px]">
//                     <div className="mb-2 flex items-center justify-between">
//                       <h3 className="font-[Manrope] text-[20px] font-bold leading-[140%] text-[#121417]">
//                         {t("plus")}
//                       </h3>

//                       <span className="inline-block rounded-full p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
//                         <span className="block rounded-full bg-white px-3 py-1 font-[Manrope] text-[12px] font-semibold">
//                           <span className="bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)] bg-clip-text text-transparent">
//                             {t("most_popular")}
//                           </span>
//                         </span>
//                       </span>
//                     </div>

//                     <p className="font-[Manrope] text-[14px] font-normal leading-[150%] text-[#6B7280]">
//                       {t("best_weddings")}
//                     </p>
//                   </div>

//                   {/* Price */}
//                   <div className="flex items-baseline gap-1 px-[10px]">
//                     <span className="font-[Lora] text-[40px] font-bold leading-none text-[#121417]">
//                       79 {t("currency_sign")}
//                     </span>
//                     <span className="font-[Manrope] text-[14px] font-medium text-[#6B7280]">
//                       / {t("event")}
//                     </span>
//                   </div>

//                   {/* Button */}
//                   <div className="w-full px-[10px]">
//                     <button 
//                       onClick={handleCreateEvent}
//                     className="w-full cursor-pointer rounded-xl py-3 font-[Manrope] text-[15px] font-semibold text-white bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#EC4899]/30 active:scale-[0.98]">
//                       {t("create_event")}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Divider */}
//               <div className="h-px w-full bg-[#F3F4F6]" />

//               {/* Features */}
//               <ul className="m-0 flex w-full list-none flex-col gap-3 pl-[10px] pr-[10px]">
//                 {plusFeatures.map((f, i) => (
//                   <FeatureItem key={i} text={t(f)} gradient />
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* ── Enterprise ── */}
//           <div
//             className="flex w-full max-w-[450px] flex-col items-start gap-6 rounded-[20px] border border-[#EDEDED] px-[10px] pb-[30px] pt-[10px]"
//             style={{
//               background: "linear-gradient(180deg, #F5F7F9 0%, #FCFCFD 100%)",
//             }}
//           >
//             {/* Name + tagline */}
//             <div className="w-full space-y-6 bg-[#FFF] border border-[#EDEDED] p-4 rounded-2xl">
//               <div className="flex w-full flex-col gap-2 px-[10px] pt-[14px]">
//                 <h3 className="font-[Manrope] text-[20px] font-bold leading-[140%] text-[#121417]">
//                   {t("enterprise")}
//                 </h3>
//                 <p className="font-[Manrope] text-[14px] font-normal leading-[150%] text-[#6B7280]">
//                   {t("perfect_large")}
//                 </p>
//               </div>

//               {/* Price */}
//               <div className="flex items-baseline gap-1 px-[10px]">
//                 <span className="font-[Lora] text-[40px] font-bold leading-none text-[#121417]">
//                   100 {t("currency_sign")}
//                 </span>
//                 <span className="font-[Manrope] text-[14px] font-medium text-[#6B7280]">
//                   / {t("event")}
//                 </span>
//               </div>

//               {/* Button */}
//               <div className="w-full px-[10px]">
//                 <button 
//                   onClick={handleCreateEvent}
//                   className="w-full cursor-pointer rounded-xl border-none bg-[#F97316] py-3 font-[Manrope] text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#ea580c] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#F97316]/30 active:scale-[0.98]">
//                   {t("create_event")}
//                 </button>
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="h-px w-full bg-[#F3F4F6]" />

//             {/* Features */}
//             <ul className="m-0 flex w-full list-none flex-col gap-3 pl-[10px] pr-[10px]">
//               {enterpriseFeatures.map((f, i) => (
//                 <FeatureItem key={i} text={t(f)} />
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




import blackImg from "@/assets/black.png";
import redImg from "@/assets/red.png";
import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
import { useAppSelector } from "@/Redux/hooks";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const basicFeatures = [
  "Up to 200 photos",
  "20 days access",
  "Sharing via link and QR",
  "Download all photos",
  "Basic support",
];

const standardFeatures = [
  "Up to 500 photos",
  "20 days access",
  "Sharing via link and QR",
  "Download all photos",
  "Faster support",
];

const premiumFeatures = [
  "Up to 1000 photos",
  "20 days access",
  "Sharing via link and QR",
  "Download all photos",
  "Priority support",
];

const unlimitedFeatures = [
  "Unlimited photos",
  "20 days access",
  "Sharing via link and QR",
  "Download all photos",
  "Highest priority support",
];

function FeatureItem({
  text,
  gradient = false,
}: {
  text: string;
  gradient?: boolean;
}) {
  return (
    <li className="flex items-center gap-2">
      <img
        src={gradient ? redImg : blackImg}
        alt="icon"
        className="w-[18px] h-[18px] shrink-0"
      />
      <span className="font-manrope text-base font-medium leading-[150%] text-[#181A18]">
        {text}
      </span>
    </li>
  );
}

export default function PricingSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const handleCreateEvent = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user?.role === "ADMIN") {
      navigate("/dashboard/admin/admin-payment");
    } else {
      navigate("/dashboard/create-event");
    }
  };

  return (
    <section
      id="pricing"
      className="w-full bg-white py-10 md:py-[80px] px-4 lg:px-0"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Header */}
        <div className="mb-8 text-center md:mb-18">
          <h2 className="mb-3 font-[Lora] text-[32px] font-medium leading-[120%] text-[#121417] sm:text-[40px] md:text-[48px]">
            {t("pricing_title")}
          </h2>
          <p className="font-[Manrope] text-[15px] font-medium leading-[140%] tracking-[0.27px] text-[#2F343A] sm:text-[16px] md:text-[18px]">
            {t("pricing_subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col items-center gap-5 md:grid md:grid-cols-2 md:items-stretch xl:grid xl:grid-cols-4 lg:gap-8">

          {/* ── MomentShare Basic ── */}
          <div
            className="flex w-full flex-col items-start gap-6 rounded-[20px] border border-[#EDEDED] px-[10px] pb-[30px] pt-[10px]"
            style={{
              background: "linear-gradient(180deg, #F5F7F9 0%, #FCFCFD 100%)",
            }}
          >
            <div className="w-full space-y-6 bg-[#FFF] border border-[#EDEDED] p-4 rounded-2xl">
              <div className="flex w-full flex-col gap-2 px-[10px] pt-[4px]">
                <h3 className="font-[Manrope] text-[20px] font-bold leading-[140%] text-[#121417]">
                  MomentShare Basic
                </h3>
                <p className="font-[Manrope] text-[14px] font-normal leading-[150%] text-[#6B7280]">
                  {t("perfect_small")}
                </p>
              </div>

              <div className="flex items-baseline gap-1 px-[10px]">
                <span className="font-[Lora] text-[40px] font-bold leading-none text-[#121417]">
                  49 {t("currency_sign")}
                </span>
                <span className="font-[Manrope] text-[14px] font-medium text-[#6B7280]">
                  / {t("event")}
                </span>
              </div>

              <div className="w-full px-[10px]">
                <button
                  onClick={handleCreateEvent}
                  className="w-full cursor-pointer rounded-xl border-none bg-[#8B5CF6] py-3 font-[Manrope] text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#7c3aed] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#8B5CF6]/30 active:scale-[0.98]"
                >
                  {t("create_event")}
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-[#F3F4F6]" />

            <ul className="m-0 flex w-full list-none flex-col gap-3 pl-[10px] pr-[10px]">
              {basicFeatures.map((f, i) => (
                <FeatureItem key={i} text={t(f)} />
              ))}
            </ul>
          </div>

          {/* ── MomentShare Standard (gradient border / most popular) ── */}
          <div className="w-full shrink-0 rounded-[22px] p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
            <div
              className="flex h-full w-full flex-col items-start gap-6 rounded-[20px] px-[10px] pb-[30px] pt-[10px]"
              style={{
                background: "linear-gradient(180deg, #F5F7F9 0%, #FCFCFD 100%)",
              }}
            >
              <div className="w-full rounded-2xl p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
                <div className="w-full space-y-6 p-4 rounded-2xl bg-white">
                  <div className="w-full px-[10px] pt-[14px]">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-[Manrope] text-[20px] font-bold leading-[140%] text-[#121417]">
                        MomentShare Standard
                      </h3>
                      <span className="inline-block rounded-full p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
                        <span className="block rounded-full bg-white px-3 py-1 font-[Manrope] text-[12px] font-semibold">
                          <span className="bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)] bg-clip-text text-transparent">
                            {t("most_popular")}
                          </span>
                        </span>
                      </span>
                    </div>
                    <p className="font-[Manrope] text-[14px] font-normal leading-[150%] text-[#6B7280]">
                      {t("best_weddings")}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 px-[10px]">
                    <span className="font-[Lora] text-[40px] font-bold leading-none text-[#121417]">
                      79 {t("currency_sign")}
                    </span>
                    <span className="font-[Manrope] text-[14px] font-medium text-[#6B7280]">
                      / {t("event")}
                    </span>
                  </div>

                  <div className="w-full px-[10px]">
                    <button
                      onClick={handleCreateEvent}
                      className="w-full cursor-pointer rounded-xl py-3 font-[Manrope] text-[15px] font-semibold text-white bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#EC4899]/30 active:scale-[0.98]"
                    >
                      {t("create_event")}
                    </button>
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-[#F3F4F6]" />

              <ul className="m-0 flex w-full list-none flex-col gap-3 pl-[10px] pr-[10px]">
                {standardFeatures.map((f, i) => (
                  <FeatureItem key={i} text={t(f)} gradient />
                ))}
              </ul>
            </div>
          </div>

          {/* ── MomentShare Premium ── */}
          <div
            className="flex w-full flex-col items-start gap-6 rounded-[20px] border border-[#EDEDED] px-[10px] pb-[30px] pt-[10px]"
            style={{
              background: "linear-gradient(180deg, #F5F7F9 0%, #FCFCFD 100%)",
            }}
          >
            <div className="w-full space-y-6 bg-[#FFF] border border-[#EDEDED] p-4 rounded-2xl">
              <div className="flex w-full flex-col gap-2 px-[10px] pt-[14px]">
                <h3 className="font-[Manrope] text-[20px] font-bold leading-[140%] text-[#121417]">
                  MomentShare Premium
                </h3>
                <p className="font-[Manrope] text-[14px] font-normal leading-[150%] text-[#6B7280]">
                  {t("perfect_large")}
                </p>
              </div>

              <div className="flex items-baseline gap-1 px-[10px]">
                <span className="font-[Lora] text-[40px] font-bold leading-none text-[#121417]">
                  119 {t("currency_sign")}
                </span>
                <span className="font-[Manrope] text-[14px] font-medium text-[#6B7280]">
                  / {t("event")}
                </span>
              </div>

              <div className="w-full px-[10px]">
                <button
                  onClick={handleCreateEvent}
                  className="w-full cursor-pointer rounded-xl border-none bg-[#F97316] py-3 font-[Manrope] text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#ea580c] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#F97316]/30 active:scale-[0.98]"
                >
                  {t("create_event")}
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-[#F3F4F6]" />

            <ul className="m-0 flex w-full list-none flex-col gap-3 pl-[10px] pr-[10px]">
              {premiumFeatures.map((f, i) => (
                <FeatureItem key={i} text={t(f)} />
              ))}
            </ul>
          </div>

          {/* ── MomentShare Unlimited ── */}
          <div
            className="flex w-full flex-col items-start gap-6 rounded-[20px] border border-[#EDEDED] px-[10px] pb-[30px] pt-[10px]"
            style={{
              background: "linear-gradient(180deg, #F5F7F9 0%, #FCFCFD 100%)",
            }}
          >
            <div className="w-full space-y-6 bg-[#FFF] border border-[#EDEDED] p-4 rounded-2xl">
              <div className="flex w-full flex-col gap-2 px-[10px] pt-[14px]">
                <h3 className="font-[Manrope] text-[20px] font-bold leading-[140%] text-[#121417]">
                  MomentShare Unlimited
                </h3>
                <p className="font-[Manrope] text-[14px] font-normal leading-[150%] text-[#6B7280]">
                  {t("Best Value")}
                </p>
              </div>

              <div className="flex items-baseline gap-1 px-[10px]">
                <span className="font-[Lora] text-[40px] font-bold leading-none text-[#121417]">
                  199 {t("currency_sign")}
                </span>
                <span className="font-[Manrope] text-[14px] font-medium text-[#6B7280]">
                  / {t("event")}
                </span>
              </div>

              <div className="w-full px-[10px]">
                <button
                  onClick={handleCreateEvent}
                  className="w-full cursor-pointer rounded-xl border-none bg-[#EC4899] py-3 font-[Manrope] text-[15px] font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#2F343A] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#121417]/30 active:scale-[0.98]"
                >
                  {t("create_event")}
                </button>
              </div>
            </div>

            <div className="h-px w-full bg-[#F3F4F6]" />

            <ul className="m-0 flex w-full list-none flex-col gap-3 pl-[10px] pr-[10px]">
              {unlimitedFeatures.map((f, i) => (
                <FeatureItem key={i} text={t(f)} />
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}