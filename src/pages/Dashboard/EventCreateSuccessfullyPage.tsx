// import { Copy, Download, Share2 } from "lucide-react";
// import successImg from "@/assets/successFull.png";
// import {  useNavigate, useSearchParams } from "react-router";
// import { useGetEventByIdQuery } from "@/Redux/features/eventsapi/eventApi";


// export default function EventCreateSuccessfullyPage() {

//   const [searchParams] = useSearchParams();

//   const eventId = searchParams.get("event_id");


//   console.log("Event ID:", eventId);
// const { data } = useGetEventByIdQuery(eventId, { skip: !eventId });

// console.log(" iam the veevt detailes data", data)
  
//   const handleCopy = () => {
    
//   };
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-[#F5F9FA] ">
//       <div className="max-w-6xl mx-auto py-8 ">
//         <div className="w-full max-w-4xl mx-auto  ">
//           {/* Header */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="w-20 h-20   flex items-center justify-center mb-3">
//               <img src={successImg} alt="success" />
//             </div>
//             <h2 className="text-2xl font-medium text-[#121417] font-lora">
//               Event Create Successfully!
//             </h2>
//             <p className="text-base text-[#2F343A] font-manrope text-center mt-1">
//               Your event is now live and ready to receive photos. Share the link
//               below with your guests.
//             </p>
//           </div>

//           {/* Event Link */}
//           <div className="border bg-white border-gray-200 rounded-xl p-6 mb-4">
//             <p className="text-xs font-semibold text-gray-500 mb-2">
//               Event Link
//             </p>
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 readOnly
//                 // value={eventLink}
//                 className="flex-1 bg-gray-100 rounded-lg px-3 py-3 text-sm text-gray-700 outline-none border border-gray-200"
//               />
//               <button
//                 onClick={handleCopy}
//                 className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white text-sm font-medium px-4 py-3 cursor-pointer rounded-lg whitespace-nowrap"
//               >
//                 <Copy className="w-4 h-4" />
//                 Copy
//               </button>
//             </div>
//           </div>

//           {/* QR Code */}
//           <div className="border bg-white border-gray-200 rounded-xl p-6 mb-6">
//             <p className="text-sm font-semibold text-gray-700 text-center mb-3">
//               QR Code
//             </p>
//             <div className="flex flex-col items-center">
//               <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F3F4F6] mb-2">
//                 <img
//                   src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=`}
//                   alt="QR Code"
//                   className="w-36 h-40 object-contain"
//                 />
//                 <p className="text-base font-manrope text-center text-gray-900">
//                   QR Code for Event
//                 </p>
//               </div>
//             </div>
//             <p className="text-base text-gray-500font-manrope  text-center mt-3">
//               Let your guests scan this QR code to access the event
//             </p>
//             <div className="flex gap-3 mt-4">
//               <button className="flex-1 cursor-pointer py-3 flex items-center bg-[#EEEFF0] justify-center gap-2 border border-gray-200 rounded-lg text-base text-gray-900 hover:bg-gray-50">
//                 <Download className="w-4 h-4" />
//                 Download QR
//               </button>
//               <button className="flex-1 cursor-pointer py-3 flex items-center bg-[#EEEFF0] justify-center gap-2 border border-gray-200 rounded-lg text-base text-gray-900 hover:bg-gray-50">
//                 <Share2 className="w-4 h-4" />
//                 Share Link
//               </button>
//             </div>
//           </div>

//           {/* Next Steps */}
//           <div className="border bg-white border-gray-200 rounded-xl p-6 mb-5">
//             <p className="text-lg font-semibold text-gray-700 mb-2">
//               Next Steps
//             </p>
//             <ul className="space-y-1">
//               <li className="text-base font-manrope text-purple-500">
//                 • Share the event link or QR code with your guests
//               </li>
//               <li className="text-base font-manrope text-purple-500">
//                 • Guests can upload photos directly from their phones
//               </li>
//               <li className="text-base font-manrope text-purple-500">
//                 • Monitor uploads and manage photos from your dashboard
//               </li>
//             </ul>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate("/dashboard/event")}
//               className="flex-1 py-3 cursor-pointer rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white font-semibold text-sm"
//             >
//               Manage Event
//             </button>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="flex-1 py-3 cursor-pointer rounded-full border border-purple-500 text-gray-700 font-semibold text-sm"
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { Copy, Download, Share2 } from "lucide-react";
// import successImg from "@/assets/successFull.png";
// import { useNavigate, useSearchParams } from "react-router";
// import { useGetEventByIdQuery } from "@/Redux/features/eventsapi/eventApi";

// import { useState } from "react";
// import { toast } from "sonner";

// export default function EventCreateSuccessfullyPage() {
//   const [searchParams] = useSearchParams();
//   const eventId = searchParams.get("event_id");

//   const { data } = useGetEventByIdQuery(eventId, { skip: !eventId });

//   const eventData = data?.data;
//   console.log(" iam the event data", eventData)
//   const eventLink = eventData?.uploadLink || "";
//   const qrLink = eventData?.shareLink || eventLink;

//   const navigate = useNavigate();

//   // ✅ loading states
//   const [copyLoading, setCopyLoading] = useState(false);
//   const [downloadLoading, setDownloadLoading] = useState(false);
//   const [shareLoading, setShareLoading] = useState(false);

//   // ✅ copy link
//   const handleCopy = async () => {
//     if (!eventLink) return toast.error("No link found");

//     try {
//       setCopyLoading(true);
//       await navigator.clipboard.writeText(eventLink);
//       toast.success("Link copied!");
//     } catch {
//       toast.error("Copy failed");
//     } finally {
//       setCopyLoading(false);
//     }
//   };

//   // ✅ download QR
//   const handleDownloadQR = async () => {
//     if (!eventLink) return toast.error("No link found");

//     try {
//       setDownloadLoading(true);

//       // const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${eventLink}`;
//       const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${qrLink}`;
//       const response = await fetch(qrUrl);
//       const blob = await response.blob();

//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "event-qr.png";
//       a.click();

//       toast.success("QR downloaded!");
//     } catch {
//       toast.error("Download failed");
//     } finally {
//       setDownloadLoading(false);
//     }
//   };

//   // ✅ share link
//   const handleShare = async () => {
//     if (!eventLink) return toast.error("No link found");

//     try {
//       setShareLoading(true);

//       if (navigator.share) {
//         await navigator.share({
//           title: "Event Link",
//           url: eventLink,
//         });
//         toast.success("Shared successfully!");
//       } else {
//         toast.error("Sharing not supported");
//       }
//     } catch {
//       toast.error("Share failed");
//     } finally {
//       setShareLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#F5F9FA] ">
//       <div className="max-w-6xl mx-auto py-8 ">
//         <div className="w-full max-w-4xl mx-auto  ">
//           {/* Header */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="w-20 h-20   flex items-center justify-center mb-3">
//               <img src={successImg} alt="success" />
//             </div>
//             <h2 className="text-2xl font-medium text-[#121417] font-lora">
//               Event Create Successfully!
//             </h2>
//             <p className="text-base text-[#2F343A] font-manrope text-center mt-1">
//               Your event is now live and ready to receive photos. Share the link
//               below with your guests.
//             </p>
//           </div>

//           {/* Event Link */}
//           <div className="border bg-white border-gray-200 rounded-xl p-6 mb-4">
//             <p className="text-xs font-semibold text-gray-500 mb-2">
//               Event Link
//             </p>
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 readOnly
//                 value={eventLink}
//                 className="flex-1 bg-gray-100 rounded-lg px-3 py-3 text-sm text-gray-700 outline-none border border-gray-200"
//               />
//               <button
//                 onClick={handleCopy}
//                 disabled={!eventLink}
//                 className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white text-sm font-medium px-4 py-3 cursor-pointer rounded-lg whitespace-nowrap"
//               >
//                 <Copy className="w-4 h-4" />
//                 {copyLoading ? "Copying..." : "Copy"}
//               </button>
//             </div>
//           </div>

//           {/* QR Code */}
//           <div className="border bg-white border-gray-200 rounded-xl p-6 mb-6">
//             <p className="text-sm font-semibold text-gray-700 text-center mb-3">
//               QR Code
//             </p>
//             <div className="flex flex-col items-center">
//               <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F3F4F6] mb-2">
//                 <img
//                   src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrLink}`}
//                   alt="QR Code"
//                   className="w-36 h-40 object-contain"
//                 />
//                 <p className="text-base font-manrope text-center text-gray-900">
//                   QR Code for Event
//                 </p>
//               </div>
//             </div>
//             <p className="text-base text-gray-500font-manrope  text-center mt-3">
//               Let your guests scan this QR code to access the event
//             </p>
//             <div className="flex gap-3 mt-4">
//               <button
//                 onClick={handleDownloadQR}
//                 className="flex-1 cursor-pointer py-3 flex items-center bg-[#EEEFF0] justify-center gap-2 border border-gray-200 rounded-lg text-base text-gray-900 hover:bg-gray-50"
//               >
//                 <Download className="w-4 h-4" />
//                 {downloadLoading ? "Downloading..." : "Download QR"}
//               </button>
//               <button
//                 onClick={handleShare}
//                 className="flex-1 cursor-pointer py-3 flex items-center bg-[#EEEFF0] justify-center gap-2 border border-gray-200 rounded-lg text-base text-gray-900 hover:bg-gray-50"
//               >
//                 <Share2 className="w-4 h-4" />
//                 {shareLoading ? "Sharing..." : "Share Link"}
//               </button>
//             </div>
//           </div>

//           {/* Next Steps */}
//           <div className="border bg-white border-gray-200 rounded-xl p-6 mb-5">
//             <p className="text-lg font-semibold text-gray-700 mb-2">
//               Next Steps
//             </p>
//             <ul className="space-y-1">
//               <li className="text-base font-manrope text-purple-500">
//                 • Share the event link or QR code with your guests
//               </li>
//               <li className="text-base font-manrope text-purple-500">
//                 • Guests can upload photos directly from their phones
//               </li>
//               <li className="text-base font-manrope text-purple-500">
//                 • Monitor uploads and manage photos from your dashboard
//               </li>
//             </ul>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               onClick={() => navigate("/dashboard/event")}
//               className="flex-1 py-3 cursor-pointer rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white font-semibold text-sm"
//             >
//               Manage Event
//             </button>
//             <button
//               onClick={() => navigate("/dashboard")}
//               className="flex-1 py-3 cursor-pointer rounded-full border border-purple-500 text-gray-700 font-semibold text-sm"
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// new code 2


import { Copy, Download, Share2, MessageCircle, Facebook, Twitter, Send } from "lucide-react";
import successImg from "@/assets/successFull.png";
import { useNavigate, useSearchParams } from "react-router";
import { useGetEventByIdQuery } from "@/Redux/features/eventsapi/eventApi";

import { useState } from "react";
import { toast } from "sonner";

export default function EventCreateSuccessfullyPage() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("event_id");

  const { data } = useGetEventByIdQuery(eventId, { skip: !eventId });

  const eventData = data?.data;
  console.log(" iam the event data", eventData)
  const eventLink = eventData?.uploadLink || "";

  const navigate = useNavigate();

  // ✅ loading states
  const [copyLoading, setCopyLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // ✅ copy link
  const handleCopy = async () => {
    if (!eventLink) return toast.error("No link found");

    try {
      setCopyLoading(true);
      await navigator.clipboard.writeText(eventLink);
      toast.success("Link copied!");
    } catch {
      toast.error("Copy failed");
    } finally {
      setCopyLoading(false);
    }
  };

  // ✅ download QR
  const handleDownloadQR = async () => {
    if (!eventLink) return toast.error("No link found");

    try {
      setDownloadLoading(true);

      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(eventLink)}`;
      const response = await fetch(qrUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "event-qr.png";
      a.click();

      toast.success("QR downloaded!");
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloadLoading(false);
    }
  };

  // ✅ share link
  const handleShare = async () => {
    if (!eventLink) return toast.error("No link found");

    // Try native share first (mobile)
    if (navigator.share) {
      try {
        setShareLoading(true);
        await navigator.share({
          title: "Event Link",
          url: eventLink,
        });
        toast.success("Shared successfully!");
        return;
      } catch {
        // fall through to social options
      } finally {
        setShareLoading(false);
      }
    }

    // Desktop fallback — show social options
    setShowShareOptions((prev) => !prev);
  };

  const shareUrl = encodeURIComponent(eventLink);
  const shareText = encodeURIComponent("Join my event and upload your photos!");

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

  return (
    <div>
      <div className="min-h-screen bg-[#F5F9FA] ">
        <div className="max-w-6xl mx-auto py-8 ">
          <div className="w-full max-w-4xl mx-auto  ">
            {/* Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20   flex items-center justify-center mb-3">
                <img src={successImg} alt="success" />
              </div>
              <h2 className="text-2xl font-medium text-[#121417] font-lora">
                Event Create Successfully!
              </h2>
              <p className="text-base text-[#2F343A] font-manrope text-center mt-1">
                Your event is now live and ready to receive photos. Share the link
                below with your guests.
              </p>
            </div>

            {/* Event Link */}
            <div className="border bg-white border-gray-200 rounded-xl p-6 mb-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Event Link
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={eventLink}
                  className="flex-1 bg-gray-100 rounded-lg px-3 py-3 text-sm text-gray-700 outline-none border border-gray-200"
                />
                <button
                  onClick={handleCopy}
                  disabled={!eventLink}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white text-sm font-medium px-4 py-3 cursor-pointer rounded-lg whitespace-nowrap"
                >
                  <Copy className="w-4 h-4" />
                  {copyLoading ? "Copying..." : "Copy"}
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="border bg-white border-gray-200 rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold text-gray-700 text-center mb-3">
                QR Code
              </p>
              <div className="flex flex-col items-center">
                <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F3F4F6] mb-2">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(eventLink)}`}
                    alt="QR Code"
                    className="w-36 h-40 object-contain"
                  />
                  <p className="text-base font-manrope text-center text-gray-900">
                    QR Code for Event
                  </p>
                </div>
              </div>
              <p className="text-base text-gray-500font-manrope  text-center mt-3">
                Let your guests scan this QR code to access the event
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleDownloadQR}
                  className="flex-1 cursor-pointer py-3 flex items-center bg-[#EEEFF0] justify-center gap-2 border border-gray-200 rounded-lg text-base text-gray-900 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4" />
                  {downloadLoading ? "Downloading..." : "Download QR"}
                </button>
                <div className="flex-1 relative">
                  <button
                    onClick={handleShare}
                    className="w-full cursor-pointer py-3 flex items-center bg-[#EEEFF0] justify-center gap-2 border border-gray-200 rounded-lg text-base text-gray-900 hover:bg-gray-50"
                  >
                    <Share2 className="w-4 h-4" />
                    {shareLoading ? "Sharing..." : "Share Link"}
                  </button>

                  {/* Social share dropdown */}
                  {showShareOptions && (
                    <div className="absolute bottom-14 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50 w-48">
                      <p className="text-xs font-semibold text-gray-500 mb-2 px-1">Share via</p>
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
              </div>
            </div>

            {/* Next Steps */}
            <div className="border bg-white border-gray-200 rounded-xl p-6 mb-5">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Next Steps
              </p>
              <ul className="space-y-1">
                <li className="text-base font-manrope text-purple-500">
                  • Share the event link or QR code with your guests
                </li>
                <li className="text-base font-manrope text-purple-500">
                  • Guests can upload photos directly from their phones
                </li>
                <li className="text-base font-manrope text-purple-500">
                  • Monitor uploads and manage photos from your dashboard
                </li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/dashboard/event")}
                className="flex-1 py-3 cursor-pointer rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white font-semibold text-sm"
              >
                Manage Event
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 py-3 cursor-pointer rounded-full border border-purple-500 text-gray-700 font-semibold text-sm"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}