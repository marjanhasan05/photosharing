import Pagination from "@/components/common/paginationComponent/Pagination";
import { useGetUserPaymentsQuery } from "@/Redux/features/userPayment/userPaymentApi";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function UserPaymentTable() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUserPaymentsQuery({
    page,
    limit: 10,
  });
  console.log(data);
  const paymentData = data?.data?.payments?.data;
  console.log(" iam the payment", paymentData);
  const meta = data?.data?.payments?.meta;
  console.log(" iam the meta", meta);

  return (
    <div className="mt-10 relative">
      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-2">
        <div className="w-full overflow-x-auto ">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-[#DBE0E5] bg-[#E5E5E5] rounded-xl ">
              <tr className="rounded-xl">
                <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm rounded-tl-xl ">
                  {t("event_name")}
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                  {t("amount")}
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                  {t("invoice")}
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                  {t("status")}
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                  {t("create_date")}
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm">
                  {t("end_date")}
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-[#2F343A] md:text-sm rounded-tr-xl">
                  {t("action")}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 p-1 animate-pulse"
                    >
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-10"></div>
                      </td>
                    </tr>
                  ))
                : paymentData?.map((booking: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-5 p-1"
                    >
                      <td className="px-6 py-4 text-xs font-medium whitespace-nowrap text-gray-900 md:text-sm">
                        {booking.eventName}
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-600 md:text-sm">
                        {booking.amount} {t("currency_sign")}
                      </td>

                      <td className="px-6 py-4 text-xs text-gray-600 md:text-sm">
                        {booking.invoice}
                      </td>

                      <td className="px-6 py-4 text-xs md:text-sm">
                        <span className="inline-flex w-16 items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium bg-[#D1FAE5] text-[#065F46]">
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs whitespace-nowrap text-gray-600 md:text-sm">
                        {new Date(booking.createDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-xs whitespace-nowrap font-medium text-[#E05A5A] md:text-sm">
                        {new Date(booking.endDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-xs md:text-sm">
                        <button className="cursor-pointer font-medium text-red-500 ">
                          <CircleX />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={meta?.page || 1}
          totalPages={meta?.lastPage || 1}
          totalItems={meta?.total || 0}
          itemsPerPage={10}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </div>
      {/* {openModal && (
        <InvoiceModal data={selectedInvoice} onClose={handleCloseModal} />
      )} */}
    </div>
  );
}
