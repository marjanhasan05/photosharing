import UserPaymentHeader from "@/components/UserDashboard/UserPaymentPageComponent/UserPaymentHeader";
import UserPaymentTable from "@/components/UserDashboard/UserPaymentPageComponent/UserPaymentTable";
import { useGetUserPaymentsQuery } from "@/Redux/features/userPayment/userPaymentApi";

export default function UserPaymentPage() {
  const { data,  } = useGetUserPaymentsQuery({});
  const summary= data?.data?.summary;
  console.log(" i am the payment data",data)
  console.log(" summary", summary)
  return (
    <div className="bg-[#F5F9FA]">
      <UserPaymentHeader summary={summary}/>
      <UserPaymentTable />
    </div>
  );
}
