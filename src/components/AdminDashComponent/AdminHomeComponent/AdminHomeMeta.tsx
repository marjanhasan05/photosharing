import { useTranslation } from "react-i18next";
import adminMeta1 from "@/assets/adminmeta1.png";
import adminMeta2 from "@/assets/adminmeta2.png";
import adminMeta3 from "@/assets/adminmeta3.png";
import adminMeta4 from "@/assets/adminmeta4.png";

export default function AdminHomeMeta({
  adminMeta,
}: {
  adminMeta: any;
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 mb-6 pb-4">
        {/* Card 1 */}
        <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
          <div className="rounded-[16px] p-4 sm:p-8 gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div className="mb-3">
              <img src={adminMeta1} alt="" />
            </div>

            <div>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                {t("total_event")}
              </p>
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
                {adminMeta?.totalEvents || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
          <div className="rounded-[16px] p-4 sm:p-8 gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div className="mb-3">
              <img src={adminMeta2} alt="" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                {t("total_uploads")}
              </p>
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
                {adminMeta?.totalUploads || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
          <div className="rounded-[16px] p-4 sm:p-8 gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div className="mb-3">
              <img src={adminMeta3} alt="" />
            </div>
            <div className="w-full">
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                {t("earning")}
              </p>

              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
                {adminMeta?.earning != null
                  ? Number(adminMeta.earning).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-[1px] rounded-[16px] bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
          <div className="rounded-[16px] p-4 sm:p-8 gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div className="mb-3">
              <img src={adminMeta4} alt="" />
            </div>
            <div className="w-full">
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                {t("storage_used")}
              </p>

              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-gray-900 leading-tight">
                {adminMeta?.storageUsed != null
                  ? Number(adminMeta.storageUsed).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
