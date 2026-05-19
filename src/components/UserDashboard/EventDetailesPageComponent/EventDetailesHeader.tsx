// import { ArrowLeft, Calendar, Copy, Share2 } from "lucide-react";

// import ditiles1 from "@/assets/ditiles1.png";
// import ditiles2 from "@/assets/ditiles2.png";
// import ditiles3 from "@/assets/ditiles3.png";
// import { toast } from "sonner";
// import { useEffect, useState } from "react";
// import { useToggleDeactivateEventMutation } from "@/Redux/features/eventsapi/eventApi";
// import { useTranslation } from "react-i18next";

// export default function EventDetailesHeader({ detailesData, refetch }: any) {
//   const { t } = useTranslation();
//   const [isActive, setIsActive] = useState(true);
//   console.log(detailesData);
//   const [toggleDeactivate, { isLoading }] = useToggleDeactivateEventMutation();
//   // Sync local state with actual event status from backend
//  useEffect(() => {
//   if (detailesData) {
//     setIsActive(detailesData.status === "ACTIVE");
//   }
// }, [detailesData]);
//   // =========================
//   // COPY LINK
//   // =========================
//   const handleCopyLink = async () => {
//     const link = detailesData?.uploadLink;

//     if (!link) {
//       toast.error("No link found!");
//       return;
//     }

//     try {
//       await navigator.clipboard.writeText(link);
//       toast.success("Link copied!");
//     } catch (err: any) {
//       toast.error("Failed to copy link");
//       console.log(err);
//     }
//   };

//   // =========================
//   // SHARE QR / LINK
//   // =========================
//   const handleShare = async () => {
//     const link = detailesData?.uploadLink;

//     if (!link) {
//       toast.error("No link found!");
//       return;
//     }

//     // Native share (mobile)
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: detailesData?.eventName || "Event",
//           text: "Join this event",
//           url: link,
//         });
//       } catch (err: any) {
//         toast.error("Share cancelled");
//         console.log(err);
//       }
//     } else {
//       // fallback
//       await navigator.clipboard.writeText(link);
//       toast.success("Link copied (share not supported)");
//     }
//   };

//   // handel trogol
//   // Handle toggle click
// const handleToggle = async () => {
//   const eventId = detailesData?.id;

//   if (!eventId) {
//     toast.error("Event ID missing");
//     return;
//   }

//   const previousState = isActive;

//   // optimistic update
//   setIsActive((prev) => !prev);

//   try {
//     const res = await toggleDeactivate(eventId).unwrap();

//     console.log("TOGGLE RES:", res);

//     // ✅ backend message show
//     toast.success(res?.message || "Status updated");

//     // ✅ if backend returns updated status
//     const newStatus = res?.data?.status;

//     if (newStatus) {
//       setIsActive(newStatus === "ACTIVE");
//     } else {
//       // fallback → refetch
//       refetch?.();
//     }
//   } catch (error: any) {
//     setIsActive(previousState);

//     toast.error(error?.data?.message || "Failed to update status");
//   }
// };
//   return (
//     <div>
//       <div className="">
//         {/* Top Nav */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 pt-5 pb-2 mb-4">
//           <button
//             onClick={() => window.history.back()}
//             className="flex items-center gap-1 cursor-pointer text-gray-600 text-sm font-medium hover:text-gray-900 transition"
//           >
//             <ArrowLeft size={16} />
//             <span>{t("go_back")}</span>
//           </button>

//           <div className="flex items-center justify-between sm:justify-end gap-2 text-sm text-gray-700 font-medium">
//             <span className="whitespace-nowrap">{t("deactive_end_event")}</span>

//             <div
//               onClick={!isLoading ? handleToggle : undefined}
//               className={`w-11 h-6 rounded-full relative cursor-pointer flex-shrink-0 transition-colors duration-200 ${
//                 isActive ? "bg-purple-600" : "bg-gray-300"
//               } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//             >
//               <div
//                 className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-200 ${
//                   isActive ? "right-0.5" : "left-0.5"
//                 }`}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Title + Action Buttons */}
//         <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between px-4 sm:px-6 pt-3 pb-2 gap-4">
//           <div className="flex-1 min-w-0">
//             <h1 className="text-2xl sm:text-3xl font-medium font-lora text-gray-900 leading-[140%] break-words">
//               {detailesData?.eventName || "--"}
//             </h1>

//             <div className="flex items-center gap-1 mt-1.5 text-sm text-gray-500">
//               <Calendar size={16} className="flex-shrink-0" />
//               <span className="font-manrope text-sm sm:text-base">
//                 {t("end_date")}:{" "}
//                 <span className="text-[#E33A4B] font-medium">
//                   {detailesData?.createdAt ||
//                   detailesData?.currentPackage?.createdAt
//                     ? new Date(
//                         detailesData?.createdAt ||
//                           detailesData?.currentPackage?.createdAt,
//                       ).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })
//                     : "--"}
//                 </span>
//               </span>
//             </div>
//           </div>

//           {/* Buttons */}
//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 lg:flex-shrink-0">
//             <button
//               onClick={handleCopyLink}
//               className="flex items-center justify-center gap-1.5 bg-[#EEEFF0] rounded-xl px-4 sm:px-6 py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-500 cursor-pointer hover:text-white transition whitespace-nowrap"
//             >
//               <Copy size={16} />
//               {t("copy_link")}
//             </button>

//             <button
//               onClick={handleShare}
//               className="flex items-center justify-center gap-1.5 bg-[#EEEFF0] rounded-xl px-4 sm:px-6 py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-500 cursor-pointer hover:text-white transition whitespace-nowrap"
//             >
//               <Share2 size={16} />
//               {t("share_qr_code")}
//             </button>

//             <button className="flex items-center justify-center gap-1.5 text-white rounded-[10px] px-4 sm:px-6 py-3 text-sm sm:text-base font-medium font-manrope transition whitespace-nowrap bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)] hover:opacity-90">
//               {t("wedding_mode_btn")}
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 mt-6 mb-6 pb-4">
//           {/* Card 1 */}
//           <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
//             <div className="rounded-[16px] p-4 sm:p-6 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
//               <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center flex-shrink-0">
//                 <img src={ditiles1} alt="" />
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
//                   {t("total_uploads")}
//                 </p>
//                 <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
//                   {detailesData?.totalUpload || "--"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
//             <div className="rounded-[16px] p-4 sm:p-6 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
//               <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center flex-shrink-0">
//                 <img src={ditiles2} alt="" />
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
//                   {t("storage_used")}
//                 </p>
//                 <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
//                   {detailesData?.storageUsed != null
//                     ? detailesData.storageUsed.toFixed(2)
//                     : "--"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
//             <div className="rounded-[16px] p-4 sm:p-6 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
//               <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center flex-shrink-0">
//                 <img src={ditiles3} alt="" />
//               </div>
//               <div>
//                 <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
//                   {t("current_package")}
//                 </p>
//                 <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
//                   {detailesData?.currentPackage?.sharingScope || "--"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { ArrowLeft, Calendar, Copy, Share2, MessageCircle, Facebook, Twitter, Send } from "lucide-react";

import ditiles1 from "@/assets/ditiles1.png";
import ditiles2 from "@/assets/ditiles2.png";
import ditiles3 from "@/assets/ditiles3.png";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { useToggleDeactivateEventMutation } from "@/Redux/features/eventsapi/eventApi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function EventDetailesHeader({ detailesData, refetch, eventId }: any) {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(true);
  console.log(detailesData);
  const [toggleDeactivate, { isLoading }] = useToggleDeactivateEventMutation();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Sync local state with actual event status from backend
  useEffect(() => {
    if (detailesData) {
      setIsActive(detailesData.status === "ACTIVE");
    }
  }, [detailesData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShowShareOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================
  // COPY LINK
  // =========================
  const handleCopyLink = async () => {
    const link = detailesData?.uploadLink;

    if (!link) {
      toast.error("No link found!");
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied!");
    } catch (err: any) {
      toast.error("Failed to copy link");
      console.log(err);
    }
  };

  // =========================
  // SHARE QR / LINK
  // =========================
  const handleShare = async () => {
    const link = detailesData?.uploadLink;

    if (!link) {
      toast.error("No link found!");
      return;
    }

    // Native share (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: detailesData?.eventName || "Event",
          text: "Join this event",
          url: link,
        });
      } catch (err: any) {
        toast.error("Share cancelled");
        console.log(err);
      }
      return;
    }

    // Desktop fallback — show dropdown
    setShowShareOptions((prev) => !prev);
  };

  // Social share options with QR image URL
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(detailesData?.uploadLink || "")}`;
  const shareText = encodeURIComponent(`Join this event: ${detailesData?.eventName || "Event"}`);
  const shareUrl = encodeURIComponent(detailesData?.uploadLink || "");

  const socialOptions = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      color: "#25D366",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      color: "#1877F2",
      icon: <Facebook className="w-4 h-4" />,
    },
    {
      name: "Twitter/X",
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      color: "#000000",
      icon: <Twitter className="w-4 h-4" />,
    },
    {
      name: "Telegram",
      url: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
      color: "#229ED9",
      icon: <Send className="w-4 h-4" />,
    },
  ];

  // handel trogol
  // Handle toggle click
  const handleToggle = async () => {
    const eventId = detailesData?.id;

    if (!eventId) {
      toast.error("Event ID missing");
      return;
    }

    const previousState = isActive;

    // optimistic update
    setIsActive((prev) => !prev);

    try {
      const res = await toggleDeactivate(eventId).unwrap();

      console.log("TOGGLE RES:", res);

      // ✅ backend message show
      toast.success(res?.message || "Status updated");

      // ✅ if backend returns updated status
      const newStatus = res?.data?.status;

      if (newStatus) {
        setIsActive(newStatus === "ACTIVE");
      } else {
        // fallback → refetch
        refetch?.();
      }
    } catch (error: any) {
      setIsActive(previousState);
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <div>
      <div className="">
        {/* Top Nav */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 pt-5 pb-2 mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 cursor-pointer text-gray-600 text-sm font-medium hover:text-gray-900 transition"
          >
            <ArrowLeft size={16} />
            <span>{t("go_back")}</span>
          </button>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-sm text-gray-700 font-medium">
            <span className="whitespace-nowrap">{t("deactive_end_event")}</span>

            <div
              onClick={!isLoading ? handleToggle : undefined}
              className={`w-11 h-6 rounded-full relative cursor-pointer flex-shrink-0 transition-colors duration-200 ${
                isActive ? "bg-purple-600" : "bg-gray-300"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-200 ${
                  isActive ? "right-0.5" : "left-0.5"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Title + Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between px-4 sm:px-6 pt-3 pb-2 gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-medium font-lora text-gray-900 leading-[140%] break-words">
              {detailesData?.eventName || "--"}
            </h1>

            <div className="flex items-center gap-1 mt-1.5 text-sm text-gray-500">
              <Calendar size={16} className="flex-shrink-0" />
              <span className="font-manrope text-sm sm:text-base">
                {t("end_date")}:{" "}
                <span className="text-[#E33A4B] font-medium">
                  {detailesData?.createdAt ||
                  detailesData?.currentPackage?.createdAt
                    ? new Date(
                        detailesData?.createdAt ||
                          detailesData?.currentPackage?.createdAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "--"}
                </span>
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 lg:flex-shrink-0">
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 bg-[#EEEFF0] rounded-xl px-4 sm:px-6 py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-500 cursor-pointer hover:text-white transition whitespace-nowrap"
            >
              <Copy size={16} />
              {t("copy_link")}
            </button>

            {/* Share button with dropdown */}
            <div className="relative" ref={shareRef}>
              <button
                onClick={handleShare}
                className="flex items-center  justify-center gap-1.5 bg-[#EEEFF0] rounded-xl px-4 sm:px-6 py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-600 cursor-pointer hover:text-white transition whitespace-nowrap w-full"
              >
                <Share2 size={16} />
                {t("share_qr_code")}
              </button>

              {/* Social share dropdown */}
              {showShareOptions && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50 w-52">
                  <p className="text-xs font-semibold text-gray-500 mb-2 px-1">Share via</p>
                  {/* QR preview */}
                  <div className="flex justify-center mb-3">
                    <img
                      src={qrImageUrl}
                      alt="QR Code"
                      className="w-24 h-24 rounded-lg border border-gray-100"
                    />
                  </div>
                  {socialOptions.map((opt) => (
                    <a
                      key={opt.name}
                      href={opt.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowShareOptions(false)}
                      className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-800 font-medium"
                    >
                      <span style={{ color: opt.color }}>
                        {opt.icon}
                      </span>
                      {opt.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              // onClick={() => navigate(`/dashboard/wedding-mode`)}
               onClick={() => navigate(`/dashboard/wedding-mode/${ eventId}`)}
             className="flex items-center cursor-pointer justify-center gap-1.5 text-white rounded-[10px] px-4 sm:px-6 py-3 text-sm sm:text-base font-medium font-manrope transition whitespace-nowrap bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)] hover:opacity-90">
              {t("wedding_mode_btn")}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6 mt-6 mb-6 pb-4">
          {/* Card 1 */}
          <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
            <div className="rounded-[16px] p-4 sm:p-6 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
              <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center flex-shrink-0">
                <img src={ditiles1} alt="" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                  {t("total_uploads")}
                </p>
                <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
                  {detailesData?.totalUpload || "0"}
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
            <div className="rounded-[16px] p-4 sm:p-6 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
              <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center flex-shrink-0">
                <img src={ditiles2} alt="" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                  {t("storage_used")}
                </p>
                <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
                  {detailesData?.storageUsed != null
                    ? detailesData.storageUsed.toFixed(2)
                    : "--"}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
            <div className="rounded-[16px] p-4 sm:p-6 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
              <div className="w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center flex-shrink-0">
                <img src={ditiles3} alt="" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                  {t("current_package")}
                </p>
                <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
                  {detailesData?.currentPackage?.sharingScope || "--"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}