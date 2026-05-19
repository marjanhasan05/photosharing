// import { useState } from "react";
// import { skipToken } from "@reduxjs/toolkit/query";
// import { Lock, Eye, EyeOff } from "lucide-react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useGetGuestEventQuery } from "@/Redux/features/eventsapi/eventApi";
// import useGuestId from "@/hooks/useGuestId";

// export default function GustInputPassWord() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const eventId = searchParams.get("event_id");
//   const token = searchParams.get("token");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [password, setPassword] = useState("");

//   const guestId = useGuestId();

//   const { data } = useGetGuestEventQuery(
//     eventId && token && guestId
//       ? {
//           id: Number(eventId),
//           uploadToken: token,
//           guestId,
//         }
//       : skipToken,
//   );

//   const eventData = data?.data;

//   // ✅ main flag
//   const isPasswordRequired = eventData?.isUploadPasswordSet;

//   const handleProceed = () => {
//     // if password required but not entered
//     if (isPasswordRequired && !password) return;

//     setShowModal(true);
//   };

//   // const handleAgree = () => {
//   //   navigate(
//   //     `/gust-view-photo?event_id=${eventId}&token=${token}${
//   //       isPasswordRequired ? `&password=${password}` : ""
//   //     }`,
//   //   );
//   // };

//   const handleAgree = () => {
//     navigate(
//       `/gust-view-photo?event_id=${eventId}&token=${token}&guestId=${guestId}${
//         isPasswordRequired ? `&password=${password}` : ""
//       }`,
//     );
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm">
//         {/* LOGO */}
//         <div className="flex justify-center">
//           <div
//             className="flex items-center justify-center mb-6 h-12 w-12 rounded-full
//                 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316]"
//           >
//             <Lock size={20} className="text-white" />
//           </div>
//         </div>

//         <div className="space-y-4 mb-3">
//           <h2 className="text-[#121417] text-center font-lora text-[24px] font-medium leading-[124%]">
//            Share our moment with family and friends
//           </h2>
//           {/* <p className="text-[#6D7379] text-center font-manrope text-[16px] font-normal leading-[140%]">
//             End date: April 10, 2026
//           </p> */}
//         </div>

//         {/* PASSWORD (ONLY IF REQUIRED) */}
//         {isPasswordRequired && (
//           <div className="mb-6 mt-6">
//             <label className="block font-manrope text-center text-sm font-medium text-gray-700 mb-2">
//               Enter event password to continue
//             </label>

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Type password"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none focus:border-purple-300"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* BUTTON */}
//         <button
//           onClick={handleProceed}
//           className="w-full py-3  cursor-pointer rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
//           style={{
//             background: "linear-gradient(90deg, #a855f7, #f97316)",
//           }}
//         >
//           Confirm
//         </button>
//       </div>

//       {/* ================= MODAL ================= */}
//       {showModal && (
//         // -----------------------
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white max-w-xl w-full rounded-xl p-6 shadow-lg overflow-y-auto max-h-[80vh]">
//             <h2 className="text-lg font-medium font-lora mb-4">
//               User Consent & Content Usage Policy
//             </h2>

//             <div className="text-sm font-manrope text-gray-600 space-y-3">
//               <p>
//                 By using the Moment Share platform and uploading photos or other
//                 content, you agree to the processing and sharing of your content
//                 within the event.
//               </p>

//               <p>You confirm that:</p>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>you have the right to upload the content,</li>
//                 <li>
//                   any individuals visible have given consent (if required),
//                 </li>
//                 <li>uploaded content may be visible to other participants.</li>
//               </ul>

//               <p>Uploaded content may be:</p>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>stored for the duration of the event,</li>
//                 <li>displayed in the event gallery,</li>
//                 <li>downloaded by other participants (if enabled).</li>
//               </ul>

//               <p>
//                 Moment Share is not responsible for content uploaded by users.
//               </p>

//               <p>
//                 If you do not agree with these terms, please do not upload
//                 content.
//               </p>

//               <h3 className="text-lg font-medium font-lora text-gray-950 mt-4">
//                 Privacy Policy (summary)
//               </h3>

//               <ul className="list-disc pl-5 space-y-1">
//                 <li>
//                   User data is processed solely for platform functionality.
//                 </li>
//                 <li>We do not sell personal data to third parties.</li>
//                 <li>Users can request deletion or withdraw consent.</li>
//               </ul>

//               <p className="mt-3 font-medium">
//                 By using the platform, you accept these terms
//               </p>

//               <div className="flex gap-3 mt-5">
//                 <button
//                   onClick={handleAgree}
//                   className="w-1/2 py-2 rounded-full text-white cursor-pointer"
//                   style={{
//                     background: "linear-gradient(90deg, #8B5CF6, #F97316)",
//                   }}
//                 >
//                   I have read & agreed
//                 </button>

//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="w-1/2 py-2 border rounded-full text-gray-700 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import { skipToken } from "@reduxjs/toolkit/query";
// import { Lock, Eye, EyeOff } from "lucide-react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useGetGuestEventQuery } from "@/Redux/features/eventsapi/eventApi";
// import useGuestId from "@/hooks/useGuestId";

// const CONSENT_KEY = "moment_share_consent_accepted";

// export default function GustInputPassWord() {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const eventId = searchParams.get("event_id");
//   const token = searchParams.get("token");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [password, setPassword] = useState("");

//   const guestId = useGuestId();

//   const { data } = useGetGuestEventQuery(
//     eventId && token && guestId
//       ? { id: Number(eventId), uploadToken: token, guestId }
//       : skipToken,
//   );

//   const eventData = data?.data;
//   const isPasswordRequired = eventData?.isUploadPasswordSet;

//   const handleProceed = () => {
//     if (isPasswordRequired && !password) return;

//     // ✅ already accepted before — skip modal, go directly
//     const alreadyAccepted = localStorage.getItem(CONSENT_KEY);
//     if (alreadyAccepted) {
//       navigateToGallery();
//       return;
//     }

//     setShowModal(true);
//   };

//   const navigateToGallery = () => {
//     navigate(
//       `/gust-view-photo?event_id=${eventId}&token=${token}&guestId=${guestId}${
//         isPasswordRequired ? `&password=${password}` : ""
//       }`,
//     );
//   };

//   const handleAgree = () => {
//     // ✅ save consent so modal never shows again for this user
//     localStorage.setItem(CONSENT_KEY, "true");
//     navigateToGallery();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm">
//         {/* LOGO */}
//         <div className="flex justify-center">
//           <div
//             className="flex items-center justify-center mb-6 h-12 w-12 rounded-full
//                 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316]"
//           >
//             <Lock size={20} className="text-white" />
//           </div>
//         </div>

//         <div className="space-y-4 mb-3">
//           <h2 className="text-[#121417] text-center font-lora text-[24px] font-medium leading-[124%]">
//             Share our moment with family and friends
//           </h2>
//         </div>

//         {/* PASSWORD (ONLY IF REQUIRED) */}
//         {isPasswordRequired && (
//           <div className="mb-6 mt-6">
//             <label className="block font-manrope text-center text-sm font-medium text-gray-700 mb-2">
//               Enter event password to continue
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Type password"
//                 className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none focus:border-purple-300"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* BUTTON */}
//         <button
//           onClick={handleProceed}
//           className="w-full py-3 cursor-pointer rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
//           style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
//         >
//           Confirm
//         </button>
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white max-w-xl w-full rounded-xl p-6 shadow-lg overflow-y-auto max-h-[80vh]">
//             <h2 className="text-lg font-medium font-lora mb-4">
//               User Consent & Content Usage Policy
//             </h2>

//             <div className="text-sm font-manrope text-gray-600 space-y-3">
//               <p>
//                 By using the Moment Share platform and uploading photos or other
//                 content, you agree to the processing and sharing of your content
//                 within the event.
//               </p>
//               <p>You confirm that:</p>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>you have the right to upload the content,</li>
//                 <li>any individuals visible have given consent (if required),</li>
//                 <li>uploaded content may be visible to other participants.</li>
//               </ul>
//               <p>Uploaded content may be:</p>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>stored for the duration of the event,</li>
//                 <li>displayed in the event gallery,</li>
//                 <li>downloaded by other participants (if enabled).</li>
//               </ul>
//               <p>Moment Share is not responsible for content uploaded by users.</p>
//               <p>If you do not agree with these terms, please do not upload content.</p>

//               <h3 className="text-lg font-medium font-lora text-gray-950 mt-4">
//                 Privacy Policy (summary)
//               </h3>
//               <ul className="list-disc pl-5 space-y-1">
//                 <li>User data is processed solely for platform functionality.</li>
//                 <li>We do not sell personal data to third parties.</li>
//                 <li>Users can request deletion or withdraw consent.</li>
//               </ul>
//               <p className="mt-3 font-medium">
//                 By using the platform, you accept these terms
//               </p>

//               <div className="flex gap-3 mt-5">
//                 <button
//                   onClick={handleAgree}
//                   className="w-1/2 py-2 rounded-full text-white cursor-pointer"
//                   style={{ background: "linear-gradient(90deg, #8B5CF6, #F97316)" }}
//                 >
//                   I have read & agreed
//                 </button>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="w-1/2 py-2 border rounded-full text-gray-700 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetGuestEventQuery } from "@/Redux/features/eventsapi/eventApi";
import useGuestId from "@/hooks/useGuestId";

const CONSENT_KEY = "moment_share_consent_accepted";

export default function GustInputPassWord() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const eventId = searchParams.get("event_id");
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const guestId = useGuestId();

  const { data } = useGetGuestEventQuery(
    eventId && token && guestId
      ? { id: Number(eventId), uploadToken: token, guestId }
      : skipToken,
  );

  const eventData = data?.data;
  const isPasswordRequired = eventData?.isUploadPasswordSet;

  const handleProceed = () => {
    if (isPasswordRequired && !password) return;

    // ✅ already accepted before — skip modal, go directly
    const alreadyAccepted = localStorage.getItem(CONSENT_KEY);
    if (alreadyAccepted) {
      navigateToGallery();
      return;
    }

    setShowModal(true);
  };

  const navigateToGallery = () => {
    navigate(
      `/gust-view-photo?event_id=${eventId}&token=${token}&guestId=${guestId}${
        isPasswordRequired ? `&password=${password}` : ""
      }`,
    );
  };

  const handleAgree = () => {
    // ✅ save consent so modal never shows again for this user
    localStorage.setItem(CONSENT_KEY, "true");
    navigateToGallery();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm">
        {/* LOGO */}
        <div className="flex justify-center">
          <div
            className="flex items-center justify-center mb-6 h-12 w-12 rounded-full 
                bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316]"
          >
            <Lock size={20} className="text-white" />
          </div>
        </div>

        <div className="space-y-4 mb-3">
          <h2 className="text-[#121417] text-center font-lora text-[24px] font-medium leading-[124%]">
            Share our moment with family and friends
          </h2>
        </div>

        {/* PASSWORD (ONLY IF REQUIRED) */}
        {isPasswordRequired && (
          <div className="mb-6 mt-6">
            <label className="block font-manrope text-center text-sm font-medium text-gray-700 mb-2">
              Enter event password to continue
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type password"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none focus:border-purple-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        )}

        {/* BUTTON */}
        <button
          onClick={handleProceed}
          className="w-full py-3 cursor-pointer rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
        >
          Confirm
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-xl p-6 shadow-lg overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-medium font-lora mb-4">
              {/* User Consent & Content Usage Policy */}
              Zgoda użytkownika i zasady korzystania z treści
            </h2>

            <div className="text-sm font-manrope text-gray-600 space-y-3">
              <p>
                {/* By using the Moment Share platform and uploading photos or other
                content, you agree to the processing and sharing of your content
                within the event. */}
                Korzystając z platformy Moment Share i przesyłając zdjęcia lub
                inne treści, wyrażasz zgodę na przetwarzanie i udostępnianie
                Twoich treści w ramach wydarzenia.
              </p>
              <p>
                {/* You confirm that: */}
                Potwierdzasz, że
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Masz prawo do przesłania treści,</li>
                <li>
                  Wszystkie widoczne osoby wyraziły na to zgodę (jeśli jest
                  wymagana),
                </li>
                <li>
                  Przesłane treści mogą być widoczne dla innych uczestników.
                </li>
              </ul>
              <p>
                {/* Uploaded content may be: */}
                Przesłana treść może być:
              </p>
              {/* <ul className="list-disc pl-5 space-y-1">
                <li>stored for the duration of the event,</li>
                <li>displayed in the event gallery,</li>
                <li>downloaded by other participants (if enabled).</li>
              </ul> */}
              <ul className="list-disc pl-5 space-y-1">
                <li>przechowywane przez czas trwania wydarzenia,</li>
                <li>wyświetlane w galerii wydarzeń,</li>
                <li>pobierane przez innych uczestników (jeśli włączone).</li>
              </ul>
              <p>
                Moment Share nie ponosi odpowiedzialności za treści przesyłane
                przez użytkowników.
              </p>
              <p>
                {/* If you do not agree with these terms, please do not upload
                content. */}
                Jeśli nie zgadzasz się z niniejszymi warunkami, nie przesyłaj
                treści.
              </p>

              <h3 className="text-lg font-medium font-lora text-gray-950 mt-4">
                {/* Privacy Policy (summary) */}
                Polityka prywatności (podsumowanie)
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {/* <li>
                  User data is processed solely for platform functionality.
                </li>
                <li>We do not sell personal data to third parties.</li>
                <li>Users can request deletion or withdraw consent.</li> */}
                <li>
                  Dane użytkownika są przetwarzane wyłącznie w celu zapewnienia
                  funkcjonalności platformy.
                </li>
                <li>Nie sprzedajemy danych osobowych osobom trzecim.</li>
                <li>Użytkownicy mogą zażądać usunięcia lub wycofać zgodę.</li>
              </ul>
              <p className="mt-3 font-medium">
               Korzystając z platformy akceptujesz niniejsze warunki
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleAgree}
                  className="w-1/2 py-2 rounded-full text-white cursor-pointer"
                  style={{
                    background: "linear-gradient(90deg, #8B5CF6, #F97316)",
                  }}
                >
                 Akceptuje warunki
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2 border rounded-full text-gray-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
