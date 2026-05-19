import { useTranslation } from "react-i18next";

export default function UserMetaData({ data }: any) {
  const { t } = useTranslation();
  const usersData = data?.data?.stats;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mt-6 mb-6 pb-4">
        {/* Card 1 */}
        <div className="p-[1px] rounded-[16px] ">
          <div className="rounded-[16px] p-4 sm:p-8 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-[#8B5CF6] leading-tight">
                0{usersData?.totalUsers || 0}
              </p>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                {t("total_users")}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-[1px] rounded-[16px] ">
          <div className="rounded-[16px] p-4 sm:p-8 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-[#EC4899] leading-tight">
                0 {usersData?.totalActiveUsers || 0}
              </p>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                {t("active_users")}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-[1px] rounded-[16px] ">
          <div className="rounded-[16px] p-4 sm:p-8 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div className="w-full">
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-[#F97316] leading-tight">
                0{usersData?.newUsers || 0}
              </p>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                {t("new_users_month")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]
