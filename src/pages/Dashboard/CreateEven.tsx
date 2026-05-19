// import { useState } from "react";
// import EventDetailsTab from "@/components/UserDashboard/UserDashboardHomeCpmponent/CreateEvenPageComponent/EventDetailsTab";
// import SelectPackageTab from "@/components/UserDashboard/UserDashboardHomeCpmponent/CreateEvenPageComponent/SelectPackageTab";
// import { ArrowLeft, Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function CreateEven() {
//   const [tab, setTab] = useState(1);
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="px-8 pt-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-1 text-lg text-[#121417] hover:text-gray-700 transition-colors"
//         >
//           <ArrowLeft size={16} />
//           Go back
//         </button>
//       </div>
//       <div className="flex flex-col items-center pt-6">
//         <div className="flex items-center gap-6">
//           {/* STEP 1 */}
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
//         ${
//           tab >= 2
//             ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//         }`}
//             >
//               {tab >= 2 ? <Check size={14} /> : <span>1</span>}
//             </div>

//             <p
//               className={`text-xs mt-2 transition ${
//                 tab >= 2 ? "text-purple-600 font-medium" : "text-gray-700"
//               }`}
//             >
//               Event Details
//             </p>
//           </div>

//           {/* LINE */}
//           <div className="w-24 h-[2px] bg-gray-200 relative overflow-hidden">
//             <div
//               className="h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
//               style={{
//                 width: tab >= 2 ? "100%" : "0%",
//               }}
//             />
//           </div>

//           {/* STEP 2 */}
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
//         ${
//           tab === 2
//             ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
//             : "bg-gray-300 text-white"
//         }`}
//             >
//               {tab === 2 ? <Check size={14} /> : "2"}
//             </div>

//             <p
//               className={`text-xs mt-2 transition ${
//                 tab === 2 ? "text-purple-600 font-medium" : "text-gray-700"
//               }`}
//             >
//               Select Package
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       {tab === 1 ? (
//         <EventDetailsTab onNext={() => setTab(2)} />
//       ) : (
//         <SelectPackageTab />
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import EventDetailsTab from "@/components/UserDashboard/UserDashboardHomeCpmponent/CreateEvenPageComponent/EventDetailsTab";
import SelectPackageTab from "@/components/UserDashboard/UserDashboardHomeCpmponent/CreateEvenPageComponent/SelectPackageTab";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateEventMutation } from "@/Redux/features/eventsapi/eventApi";
import { useTranslation } from "react-i18next";

export default function CreateEven() {
  const { t } = useTranslation();
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();

  const [createEvent, { isLoading }] = useCreateEventMutation();

  // shared state (ONLY LOGIC)
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    password: "",
  });

  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // 🔥 API CALL IN PARENT
  const handleSubmit = async () => {
    try {
      const payload = {
        name: eventData.eventName,
        startsAt: new Date(eventData.eventDate).toISOString(),
        password: eventData.password || null,
        packageId: selectedPlan.id,
      };

      console.log("PAYLOAD:", payload);

      const response = await createEvent(payload).unwrap();

      console.log("API RESPONSE:", response);

      // ✅ SAFE ACCESS
      const checkoutUrl = response?.data?.payment?.checkoutUrl;

      if (checkoutUrl) {
        window.location.href = checkoutUrl; // 🔥 redirect to Stripe
        return;
      }

      // fallback if no url
      navigate("/dashboard/create-event");
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer gap-1 text-lg text-[#121417] hover:text-gray-700 transition-colors"
        >
          <ArrowLeft size={16} />
          {t("go_back")}
        </button>
      </div>

   

      <div className="flex flex-col items-center pt-6">
        <div className="flex items-center gap-6">
          {/* STEP 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
        ${
          tab >= 2
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        }`}
            >
              {tab >= 2 ? <Check size={14} /> : <span>1</span>}
            </div>

            <p
              className={`text-sm mt-2 transition ${
                tab >= 2 ? "text-purple-600 font-medium" : "text-gray-700"
              }`}
            >
              {t("event_details")}
            </p>
          </div>

          {/* LINE */}
          <div className="w-24 h-[2px] bg-gray-200 relative overflow-hidden">
            <div
              className="h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{
                width: tab >= 2 ? "100%" : "0%",
              }}
            />
          </div>

          {/* STEP 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
        ${
          tab === 2
            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            : "bg-gray-300 text-white"
        }`}
            >
              {tab === 2 ? <Check size={14} /> : <span>2</span>}
            </div>

            <p
              className={`text-sm mt-2 transition ${
                tab === 2 ? "text-purple-600 font-medium" : "text-gray-700"
              }`}
            >
              {t("select_package")}
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      {tab === 1 ? (
        <EventDetailsTab
          onNext={() => setTab(2)}
          form={eventData}
          setForm={setEventData}
        />
      ) : (
        <SelectPackageTab
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
