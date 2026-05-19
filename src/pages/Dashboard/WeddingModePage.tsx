// import { useTranslation } from "react-i18next";
// import logo from "@/assets/logo (2).png";
// import { ArrowLeft } from "lucide-react";

// export default function WeddingModePage() {
//   const { t } = useTranslation();
//   const eventLink = "https://photoshare.app/e/8vpke";
//   return (
//     <div>
//       <div className="mb-4">
//         <button
//           onClick={() => window.history.back()}
//           className="flex items-center gap-1 cursor-pointer text-gray-600 text-sm font-medium hover:text-gray-900 transition"
//         >
//           <ArrowLeft size={16} />
//           <span>{t("go_back")}</span>
//         </button>
//       </div>
//       <div className="mb-8">
//         <h2 className="text-[#121417] font-lora text-[32px] font-medium leading-[140%]">
//           {t("wedding_mode")}
//         </h2>
//         <p className="text-[#6D7379] font-manrope text-base font-normal leading-[140%]">
//           {t("print_qr_card")}
//         </p>
//       </div>
//       <div className="border bg-white border-gray-200 rounded-xl p-6 mb-6 max-w-md">
//         <div className="mb-8 flex flex-col items-center">
//           <img src={logo} alt="" />

//           <h2 className="text-[#121417] text-center font-lora text-xl font-medium mt-6">
//             {t("scan_to_upload")}
//           </h2>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F3F4F6] mb-2">
//             <div className=" p-3 border-2 border-black">
//               <img
//                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${eventLink}`}
//                 alt="QR Code"
//                 className="w-36 h-40 object-contain"
//               />
//             </div>
//             <p className="text-base font-manrope text-center text-gray-900">
//               QR Code for Event
//             </p>
//           </div>
//         </div>
//         <p className="text-[#8B5CF6] text-center font-lora text-[20px] italic font-normal leading-[140%] tracking-[0.2px] mt-3">
//           {t("share_moments")}
//         </p>
//         <div className="flex gap-3 mt-4"></div>
//       </div>
//     </div>
//   );
// }


// import { useTranslation } from "react-i18next";
// import logo from "@/assets/logo (2).png";
// import { ArrowLeft } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useGetEventByIdQuery } from "@/Redux/features/eventsapi/eventApi";
// import { useParams } from "react-router-dom";

// export default function WeddingModePage() {
//   const { t } = useTranslation();
//   const eventLink = "https://photoshare.app/e/8vpke";

//   const { eventId } = useParams();
//   console.log(eventId)
//   const { data , isLoading:imageLoading, refetch} = useGetEventByIdQuery(eventId!);
//   console.log(data)
//   const detailesData = data?.data; 
//   console.log(" details data", detailesData);
//   console.log("Event ID:", eventId);
//   console.log("iam the detailes data",data)
//   const  token=data?.data?.uploadToken
//   console.log(token)  

//   return (
//     <div className="relative min-h-screen">
//       {/* Under Construction Modal */}


//       <div className="mb-4">
//         <button
//           onClick={() => window.history.back()}
//           className="flex items-center gap-1 cursor-pointer text-gray-600 text-sm font-medium hover:text-gray-900 transition"
//         >
//           <ArrowLeft size={16} />
//           <span>{t("go_back")}</span>
//         </button>
//       </div>
//       <div className="mb-8">
//         <h2 className="text-[#121417] font-lora text-[32px] font-medium leading-[140%]">
//           {t("wedding_mode")}
//         </h2>
//         <p className="text-[#6D7379] font-manrope text-base font-normal leading-[140%]">
//           {t("print_qr_card")}
//         </p>
//       </div>
//       <div className="border bg-white border-gray-200 rounded-xl p-6 mb-6 max-w-md">
//         <div className="mb-8 flex flex-col items-center">
//           <img src={logo} alt="" />
//           <h2 className="text-[#121417] text-center font-lora text-xl font-medium mt-6">
//             {t("scan_to_upload")}
//           </h2>
//         </div>
//         <div className="flex flex-col items-center">
//           <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F3F4F6] mb-2">
//             <div className="p-3 border-2 border-black">
//               <img
//                 src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${eventLink}`}
//                 alt="QR Code"
//                 className="w-36 h-40 object-contain"
//               />
//             </div>
//             <p className="text-base font-manrope text-center text-gray-900">
//               QR Code for Event
//             </p>
//           </div>
//         </div>
//         <p className="text-[#8B5CF6] text-center font-lora text-[20px] italic font-normal leading-[140%] tracking-[0.2px] mt-3">
//           {t("share_moments")}
//         </p>
//         <div className="flex gap-3 mt-4"></div>
//       </div>
//     </div>
//   );
// }

// implement dynamic qr code generation based on eventId and token


import { useTranslation } from "react-i18next";
import logo from "@/assets/logo (2).png";
import { ArrowLeft } from "lucide-react";
import { useGetEventByIdQuery } from "@/Redux/features/eventsapi/eventApi";
import { useParams } from "react-router-dom";

export default function WeddingModePage() {
  const { t } = useTranslation();

  const { eventId } = useParams();
  const { data, } = useGetEventByIdQuery(eventId!);

  const detailesData = data?.data;
  // const token = data?.data?.uploadToken;

  // 👇 dynamic — same pattern as EventCreateSuccessfullyPage
  const eventLink = detailesData?.uploadLink || "";

  return (
    <div className="relative min-h-screen">
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1 cursor-pointer text-gray-600 text-sm font-medium hover:text-gray-900 transition"
        >
          <ArrowLeft size={16} />
          <span>{t("go_back")}</span>
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-[#121417] font-lora text-[32px] font-medium leading-[140%]">
          {t("Event_Qr_code")}
        </h2>
        <p className="text-[#6D7379] font-manrope text-base font-normal leading-[140%]">
          {t("print_qr_card")}
        </p>
      </div>

      <div className="border bg-white border-gray-200 rounded-xl p-6 mb-6 max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo} alt="" />
          <h2 className="text-[#121417] text-center font-lora text-xl font-medium mt-6">
            {t("scan_to_upload")}
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F3F4F6] mb-2">
            <div className="p-3 border-2 border-black">
              {/* 👇 dynamic QR — encodeURIComponent so special chars don't break the URL */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(eventLink)}`}
                alt="QR Code"
                className="w-36 h-40 object-contain"
              />
            </div>
            <p className="text-base font-manrope text-center text-gray-900">
              QR Code for Event
            </p>
          </div>
        </div>

        <p className="text-[#8B5CF6] text-center font-lora text-[20px] italic font-normal leading-[140%] tracking-[0.2px] mt-3">
          {t("share_moments")}
        </p>
        <div className="flex gap-3 mt-4"></div>
      </div>
    </div>
  );
}