import { useGetAllEventsByUserQuery } from "@/Redux/features/eventsapi/eventApi";

import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function RecentEventTableDashboard() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllEventsByUserQuery({});
  console.log(data);
  const navigate = useNavigate();

  // ✅ FIXED DATA ACCESS
  const eventData = (data?.data?.data || []).slice(0, 6);
  return (
    <div>
      <div className=" flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-medium font-lora text-[#121417]">
          {t("recent_events")}
        </h2>
        <button
          onClick={() => navigate("/dashboard/event")}
          className="text-sm font-semibold text-[#F97316] hover:underline cursor-pointer"
        >
          {t("view_all")}
        </button>
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-2">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-[#DBE0E5] bg-[#E5E5E5]">
              <tr>
                <th className="px-6 py-4 text-left text-sm text-[#2F343A] whitespace-nowrap">
                  {t("event_name")}
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#2F343A] whitespace-nowrap">
                  {t("plan_subscription")}
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#2F343A] whitespace-nowrap">
                  {t("status")}
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#2F343A] whitespace-nowrap">
                  {t("create_date")}
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#2F343A] whitespace-nowrap">
                  {t("payment_status")}
                </th>
                <th className="px-6 py-4 text-left text-sm text-[#2F343A] whitespace-nowrap">
                  {t("action")}
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
                        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </td>
                    </tr>
                  ))
                : eventData.map((event: any, index: number) => (
                    <tr key={index} className="border-b border-gray-100">
                      {/* EVENT NAME */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {event.eventName}
                      </td>

                      {/* PLAN */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {event.eventPackage}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex w-20 items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium ${
                            event.status === "ACTIVE"
                              ? "bg-[#D1FAE5] text-[#065F46]"
                              : "bg-[#FFE4E6] text-[#9F1239]"
                          }`}
                        >
                          {t(event.status.toLowerCase())}
                        </span>
                      </td>

                      {/* CREATE DATE */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(event.createDate).toLocaleDateString()}
                      </td>

                      {/* PAYMENT STATUS */}
                      <td
                        className={`px-6 py-4 text-sm font-medium ${
                          event.paymentStatus === "PAID"
                            ? "text-green-600"
                            : event.paymentStatus === "PENDING"
                              ? "text-yellow-500"
                              : event.paymentStatus === "FAILED"
                                ? "text-red-500"
                                : "text-gray-500"
                        }`}
                      >
                        {event.paymentStatus ? t(event.paymentStatus.toLowerCase()) : t("not_paid")}
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/event-details/${event.id}`)
                          }
                          className="cursor-pointer font-medium text-[#8B5CF6]"
                        >
                          {t("manage")}
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
