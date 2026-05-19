import { useGetAdminFinancialStatisticsQuery } from "@/Redux/features/adminAllApi/adminTransactions/adminTransactionsApi";

export default function AdminPaymentMeta() {
  const { data  } = useGetAdminFinancialStatisticsQuery({});
  console.log(data)
 const metaData = data?.data?.summary || {}; 
 console.log(metaData)
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  mt-6 mb-6 pb-4">
        {/* Card 1 */}
        <div className="p-[1px] rounded-[16px] ">
          <div className="rounded-[16px] p-4 sm:p-8 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-[#32363F] leading-tight">
                ${metaData?.totalEarning?.toFixed(2) || "0.00"}
              </p>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                Total Earning
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-[1px] rounded-[16px] ">
          <div className="rounded-[16px] p-4 sm:p-8 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            <div>
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-[#32363F] leading-tight">
                0 {metaData?.totalTransactions?.toLocaleString() || "0"}
              </p>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                Total Transactions
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-[1px] rounded-[16px] ">
          <div className="rounded-[16px] p-4 sm:p-8 flex items-center gap-4 bg-white shadow-[0_4px_33.1px_0_rgba(0,0,0,0.04)]">
            {/*  FIX: add w-full here */}
            <div className="w-full">
              <p className="text-2xl sm:text-3xl font-medium font-lora mt-1 sm:mt-2 text-[#32363F] leading-tight">
                ${metaData?.earningThisMonth?.toFixed(2) || "0.00"}
              </p>
              <p className="text-sm sm:text-base font-lora text-[#7E8086] font-medium tracking-wide">
                Earning this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
