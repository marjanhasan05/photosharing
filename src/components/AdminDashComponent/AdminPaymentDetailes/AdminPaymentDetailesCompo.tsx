import Pagination from "@/components/common/paginationComponent/Pagination";
import { useGetAllTransactionsByAdminQuery } from "@/Redux/features/adminAllApi/adminTransactions/adminTransactionsApi";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AdminPaymentDetailesCompo() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const { data, isLoading } = useGetAllTransactionsByAdminQuery({
    page,
    limit: 10,
    search: searchQuery || undefined,
    plan: filterValue,
  });

  const transactionData = data?.data?.data || [];
  const meta = data?.data?.meta;

  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 w-16 bg-gray-200 animate-pulse rounded" />
      </td>
    </tr>
  );

  return (
    <div>
      <div className=" flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-medium font-lora text-[#121417]">
          {t("transaction_details")}
        </h2>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-6 items-center justify-between">
        <div className="flex-1 max-w-xs p-[2px] rounded-lg bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
          <input
            type="text"
            placeholder={t("search_events_placeholder")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 py-2 rounded-lg text-sm bg-white text-gray-900 focus:outline-none"
          />
        </div>

        <div className="relative ">
          <select
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              setPage(1);
            }}
            className="w-full appearance-none px-4 py-2 cursor-pointer pr-10 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="all">{t("all_plan")}</option>
            <option value="BASIC">{t("basic")}</option>
            <option value="ADVANCE">{t("advance")}</option>
            <option value="PREMIUM">{t("premium")}</option>
          </select>

          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6 relative">
        <div className="overflow-hidden rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-2 min-h-screen">
          <div className="w-full overflow-x-auto ">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-[#DBE0E5] bg-[#E5E5E5]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("user")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("event_name")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("amount")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("plan")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("date")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                    {t("status")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* LOADING SKELETON */}
                {isLoading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))
                  : transactionData.length === 0
                  ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10">
                          <div className="text-gray-500 font-medium">
                            {t("no_transactions_found")} 😔
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {t("try_changing_filters")}
                          </div>
                        </td>
                      </tr>
                    )
                  : transactionData.map((item: any, index: number) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-5 p-1"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700">
                          {item.eventName}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.amount}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`font-medium ${
                              item.plan === "PREMIUM"
                                ? "text-[#F97316]"
                                : item.plan === "ADVANCE"
                                ? "text-[#40B3EA]"
                                : item.plan === "BASIC"
                                ? "text-[#8B5CF6]"
                                : "text-gray-500"
                            }`}
                          >
                            {item.plan}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(item.date).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex w-16 items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium ${
                              item.status === "PAID"
                                ? "bg-[#D1FAE5] text-[#065F46]"
                                : item.status === "PENDING"
                                ? "bg-[#FEF3C7] text-[#92400E]"
                                : "bg-[#FEE2E2] text-[#991B1B]"
                            }`}
                          >
                            {t(item.status.toLowerCase())}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={meta?.page || page}
        totalPages={meta?.lastPage || 1}
        totalItems={meta?.total || 0}
        itemsPerPage={10}
        onPageChange={setPage}
      />
    </div>
  );
}