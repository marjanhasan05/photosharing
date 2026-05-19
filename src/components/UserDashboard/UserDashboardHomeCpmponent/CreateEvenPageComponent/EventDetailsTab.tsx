// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

// export default function EventDetailsTab({ onNext }: any) {
//   const [accessPasswordEnabled, setAccessPasswordEnabled] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     eventName: "",
//     eventDate: "",
//     password: "",
//   });

//   return (
//     <div className="min-h-screen  mt-10">
//       {/* Go Back */}

//       {/* Card */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-center px-4 mt-6">
//           <div className="rounded-2xl   w-full p-8">
//             <h2 className="text-2xl font-medium font-lora text-[#2F343A] mb-1">
//               Create Event
//             </h2>
//             <p className="text-base font-manrope text-[#2F343A]  mb-6">
//               Enter your event details to get started
//             </p>

//             {/* Event Name */}
//             <div className="mb-6">
//               <label className="block text-base font-manrope font-medium text-gray-700 mb-1">
//                 Event Name <span className="text-red-400">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter event name"
//                 value={form.eventName}
//                 onChange={(e) =>
//                   setForm({ ...form, eventName: e.target.value })
//                 }
//                 className="w-full border border-[#B3B3B3] bg-[#FFF] rounded-xl px-4 py-3 text-sm focbase:outline-none focus:ring-2 focus:ring-purple-300"
//               />
//             </div>

//             {/* Event Date */}
//             <div className="mb-6">
//               <label className="block text-base font-manrope font-medium text-gray-700 mb-1">
//                 Event Date
//               </label>
//               <input
//                 type="date"
//                 value={form.eventDate}
//                 onChange={(e) =>
//                   setForm({ ...form, eventDate: e.target.value })
//                 }
//                 className="w-full border border-[#B3B3B3] bg-[#FFF] rounded-xl px-4 py-3 text-sm focbase:outline-none focus:ring-2 focus:ring-purple-300"
//               />
//             </div>

//             {/* Toggle */}
//             <div className="mb-2 flex items-center justify-between">
//               <label className="text-base font-manrope font-medium text-gray-700">
//                 Access Password{" "}
//                 <span className="text-gray-400 font-normal">(optional)</span>
//               </label>

//               <button
//                 onClick={() => setAccessPasswordEnabled((v) => !v)}
//                 className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
//                   accessPasswordEnabled ? "bg-purple-500" : "bg-gray-300"
//                 }`}
//               >
//                 <span
//                   className={`inline-block h-4 w-4 bg-white rounded-full transition-transform ${
//                     accessPasswordEnabled ? "translate-x-6" : "translate-x-1"
//                   }`}
//                 />
//               </button>
//             </div>

//             {/* Password */}
//             {accessPasswordEnabled && (
//               <div className="relative mb-1">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Set password"
//                   value={form.password}
//                   onChange={(e) =>
//                     setForm({ ...form, password: e.target.value })
//                   }
//                   className="w-full border border-[#B3B3B3] bg-[#FFF] rounded-xl px-4 py-3 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((v) => !v)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                 >
//                   {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
//                 </button>
//               </div>
//             )}

//             <p className="text-xs text-gray-400 mb-6 mt-3">
//               Set a password to restrict access to your event photos
//             </p>

//             {/* CTA */}
//             <button
//               onClick={onNext}
//               className="w-full py-3 cursor-pointer rounded-full text-white text-sm font-medium bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 hover:opacity-90"
//             >
//               Continue to package selection
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useRef, useState } from "react";
import { Calendar, Eye, EyeOff } from "lucide-react";

import { useTranslation } from "react-i18next";

export default function EventDetailsTab({ onNext, form, setForm }: any) {
  const { t } = useTranslation();
  const [accessPasswordEnabled, setAccessPasswordEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const isDisabled = !form.eventName || !form.eventDate;
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center px-4 mt-6">
          <div className="rounded-2xl w-full p-8">
            <h2 className="text-2xl font-medium font-lora text-[#2F343A] mb-1">
              {t("create_event")}
            </h2>

            <p className="text-base font-manrope text-[#2F343A] mb-6">
              {t("enter_details_start")}
            </p>

            {/* Event Name */}
            <div className="mb-6">
              <label className="block text-base font-manrope font-medium text-gray-700 mb-1">
                {t("event_name")} <span className="text-red-400">*</span>
              </label>

              <input
                type="text"
                value={form.eventName}
                onChange={(e) =>
                  setForm({ ...form, eventName: e.target.value })
                }
                placeholder={t("enter_event_name")}
                className="w-full border border-[#B3B3B3] bg-[#FFF] rounded-xl px-4 py-3 text-sm"
              />
            </div>

            {/* Event Date */}
            <div
              className="mb-6 relative"
              onClick={() => dateRef.current?.showPicker?.()}
            >
              <label className="block text-base font-manrope font-medium text-gray-700 mb-1">
                {t("event_date")}
              </label>

              <input
                ref={dateRef}
                type="date"
                min={
                  new Date(
                    new Date().getTime() -
                      new Date().getTimezoneOffset() * 60000,
                  )
                    .toISOString()
                    .split("T")[0]
                }
                value={form.eventDate}
                onChange={(e) =>
                  setForm({ ...form, eventDate: e.target.value })
                }
                className="w-full border border-[#B3B3B3] bg-[#FFF] rounded-xl px-4 py-3 pr-10 text-sm cursor-pointer appearance-none"
              />

              {/* Lucide Icon */}
              <Calendar
                size={18}
                className="absolute right-3 top-[42px] text-gray-400 pointer-events-none"
              />
            </div>

            {/* PASSWORD (UNCHANGED FULL LOGIC) */}
            <div className="mb-2 flex items-center justify-between">
              <label className="text-base font-manrope font-medium text-gray-700">
                {t("access_password")}{" "}
                <span className="text-gray-400 font-normal">({t("optional")})</span>
              </label>

              <button
                onClick={() => setAccessPasswordEnabled((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  accessPasswordEnabled ? "bg-purple-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 bg-white rounded-full transition-transform ${
                    accessPasswordEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {accessPasswordEnabled && (
              <div className="relative mb-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder={t("set_password")}
                  className="w-full border border-[#B3B3B3] bg-[#FFF] rounded-xl px-4 py-3 pr-10 text-base"
                />

                <button
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            )}

            <p className="text-xs text-gray-400 mb-6 mt-3">
              {t("password_desc")}
            </p>

            <button
              onClick={onNext}
              disabled={isDisabled}
              className={`w-full py-3 rounded-full cursor-pointer text-white text-sm font-medium bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-90"
              }`}
            >
              {t("continue_package")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
