import { useGetAllTransactionsByAdminQuery } from "@/Redux/features/adminAllApi/adminTransactions/adminTransactionsApi";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function AdminRecentPayment() {
  const { t } = useTranslation();
  const { data, isLoading } = useGetAllTransactionsByAdminQuery({});

  const transactionData = (data?.data?.data || []).slice(0, 6);
  const navigate = useNavigate();

  return (
    <div>
      <div className=" flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-medium font-lora text-[#121417]">
          {t("transaction_details")}
        </h2>

        <button
          onClick={() =>
            navigate("/dashboard/admin/admin-payment-detailes")
          }
          className="text-sm font-semibold text-[#8B5CF6] hover:underline cursor-pointer"
        >
          {t("view_all")}
        </button>
      </div>

      {/* TABLE */}
      <div className="mt-6 relative">
        <div className="overflow-hidden rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-2">
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
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, index) => (
                    <tr key={index} className="border-b animate-pulse">
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 rounded w-16"></div>
                      </td>
                    </tr>
                  ))
                ) : transactionData.length === 0 ? (
                  /* EMPTY STATE */
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
                ) : (
                  /* DATA */
                  transactionData.map((item: any, index: number) => (
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}