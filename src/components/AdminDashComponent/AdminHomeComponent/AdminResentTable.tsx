import { HardDrive, Image } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AdminResentTable({ adminRecentTable, isLoading }: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div className=" flex items-center justify-between mb-10 px-2">
          <h2 className="text-xl font-medium font-lora text-[#121417]">
            {t("recent_events")}
          </h2>
          <button 
          onClick={() => navigate("/dashboard/admin/events-management")}
          className="text-sm font-semibold text-[#F97316] hover:underline cursor-pointer">
            {t("view_all")}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-2">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-[#DBE0E5] bg-[#E5E5E5] rounded-xl ">
                <tr className="rounded-xl">
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm rounded-tl-xl ">
                    {t("event_name")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("organizer")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("plan")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("uploads")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("storage")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm rounded-tr-xl">
                    {t("status")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 animate-pulse"
                      >
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-24"></div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                        </td>
                      </tr>
                    ))
                  : adminRecentTable?.map((booking: any, index: number) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-xs font-medium whitespace-nowrap text-gray-900 md:text-sm">
                          {booking.eventName}
                        </td>

                        <td className="px-6 py-4 text-xs text-gray-[#2F343A] md:text-base font-manrope">
                          {booking.organizer}
                        </td>

                        <td className="px-6 py-4 text-xs md:text-base font-manrope">
                          <span
                            className={`font-medium ${
                              booking.plan === "PREMIUM"
                                ? "text-[#8B5CF6]"
                                : booking.plan === "BASIC"
                                  ? "text-[#40B3EA]"
                                  : booking.plan === "ADVANCE"
                                    ? "text-[#F97316]"
                                    : "text-gray-600"
                            }`}
                          >
                            {booking.plan}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-xs md:text-base text-[#2F343A] font-manrope">
                          <span className="flex items-center gap-2">
                            <Image size={14} />
                            {booking.upload}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-xs text-gray-[#2F343A] md:text-base font-manrope">
                          <span className="flex items-center gap-2">
                            <HardDrive size={14} />
                            {booking.storage}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-xs md:text-sm">
                          <span
                            className={`inline-flex w-20 items-center justify-center rounded-full px-3 py-2 text-xs font-medium ${
                              booking.status === "ACTIVE"
                                ? "bg-[#D1FAE5] text-[#065F46]"
                                : "bg-[#FEE2E2] text-[#991B1B]"
                            }`}
                          >
                            {t(booking.status.toLowerCase())}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
