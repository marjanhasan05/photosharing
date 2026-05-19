import Pagination from "@/components/common/paginationComponent/Pagination";
import { useGetAllEventsByUserQuery } from "@/Redux/features/eventsapi/eventApi";

import { useState } from "react";

import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function EventUser() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllEventsByUserQuery({
    page,
    limit: 10,
  });

  const navigate = useNavigate();
  const meta = data?.data?.meta;


  // ✅ FIXED DATA ACCESS
  const eventData = data?.data?.data || [];

  return (
    <div className="mt-10">
      <div>
        <div className="flex items-center justify-between mb-13 px-2 ">
          <div>
            <h2 className="text-3xl font-medium font-lora text-[#121417]">
              {t("recent_events")}
            </h2>
            <p className="text-[#6D7379] font-manrope text-base font-normal leading-[140%]">
              {t("recent_events_desc")}
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/create-event")}
            className="flex items-center justify-center gap-2 w-full lg:w-auto bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] text-white text-base lg:text-lg cursor-pointer font-medium px-5 py-3 rounded-lg"
          >
            {t("create_new_event")}
          </button>
        </div>

        {/* TABLE */}
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
                  ? Array.from({ length: 10 }).map((_, index) => (
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
                          className={`inline-flex w-20 items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium ${event.status === "ACTIVE"
                              ? "bg-[#D1FAE5] text-[#065F46]"
                              : "bg-[#FFE4E6] text-[#9F1239]"
                            }`}
                        >
                          {event.status}
                        </span>
                      </td>

                      {/* CREATE DATE */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(event.createDate).toLocaleDateString()}
                      </td>

                      {/* PAYMENT STATUS */}
                      <td
                        className={`px-6 py-4 text-sm font-medium ${event.paymentStatus === "PAID"
                            ? "text-green-600"
                            : event.paymentStatus === "PENDING"
                              ? "text-yellow-500"
                              : event.paymentStatus === "FAILED"
                                ? "text-red-500"
                                : "text-gray-500"
                          }`}
                      >
                        {event.paymentStatus || "Not Paid"}
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
        <Pagination
          currentPage={meta?.page || 1}
          totalPages={meta?.lastPage || 1}
          totalItems={meta?.total || 0}
          itemsPerPage={10}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
