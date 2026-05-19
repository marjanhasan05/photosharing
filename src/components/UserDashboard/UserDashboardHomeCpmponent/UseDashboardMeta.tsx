import { Plus } from "lucide-react";
import metaIcon1 from "@/assets/userMeta1.png";
import metaIcon2 from "@/assets/userMeta2.png";
import metaIcon3 from "@/assets/userMeta3.png";
import { useNavigate } from "react-router";
import { useGetUserDashboardQuery } from "@/Redux/features/userDashboard/userDashboardApi";
import { useTranslation } from "react-i18next";

export default function UseDashboardMeta() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useGetUserDashboardQuery();
  console.log(data);
  const detailesData = data?.data;
  console.log(detailesData);
  return (
    <div className="">
      {/* Header Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-7">
        <div>
          <h1 className="text-2xl lg:text-3xl font-lora font-semibold text-gray-900">
            {t("dashboard_user")}
          </h1>
          <p className="text-sm lg:text-base font-manrope text-[#6D7379] mt-1 ">
            {t("manage_view_event")}
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/create-event")}
          className="flex items-center justify-center gap-2 w-full lg:w-auto bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] text-white text-base lg:text-lg cursor-pointer font-medium px-5 py-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#EC4899]/30 active:scale-[0.98]"
        >
          <Plus size={18} color="white" />
          {t("create_new_event")}
        </button>
      </div>

      {/* 3 Static Cards — 1 Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Card 1 - Total Event */}
        <div className="bg-gradient-to-b from-[#F97316] to-[#E55F02]  rounded-2xl px-8 py-5 flex flex-col justify-between shadow-[0_4px_33.1px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mt-2">
            <img src={metaIcon1} alt="Total events" />
          </div>

          <div className="mt-6">
            <p className="text-base font-manrope text-[#F8F9FA] mb-5 font-normal">
              {t("total_event")}
            </p>
            <p className="text-4xl font-lora font-semibold text-white">
              {detailesData?.stats?.totalEvent}
            </p>
          </div>
        </div>

        {/* Card 2 - Total Uploads */}
        <div className="bg-gradient-to-b from-[#8B5CF6] to-[#6D3ED8] rounded-2xl px-8 py-5 flex flex-col justify-between shadow-[0_4px_33.1px_rgba(0,0,0,0.04)]">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mt-2">
            <img src={metaIcon2} alt="Total uploads" />
          </div>

          <div className="mt-6">
            <p className="text-base font-manrope text-[#F8F9FA] mb-5 font-normal">
              {t("total_uploads")}
            </p>
            <p className="text-4xl font-lora font-semibold text-white">
              {detailesData?.stats?.totalUpload}
            </p>
          </div>
        </div>

        {/* Card 3 - Storage Used */}
        <div className="bg-gradient-to-b from-[#EC4899] to-[#D83485] rounded-2xl px-8 py-6 shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)] flex flex-col justify-between ">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mt-2">
            <img src={metaIcon3} alt="Storage used" />
          </div>

          <div className="mt-6 ">
            <p className="text-base font-manrope text-white/85 mb-5 font-normal">
              {t("storage_used")}
            </p>
            <p className="text-4xl font-lora font-semibold text-white">
              {detailesData?.stats?.storageUsed != null
                ? Number(detailesData.stats.storageUsed).toFixed(2)
                : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
