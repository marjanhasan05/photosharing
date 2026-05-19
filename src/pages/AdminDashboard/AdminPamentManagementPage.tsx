import AdminPaymentMeta from "@/components/AdminDashComponent/AdminPayment/AdminPaymentMeta";
import AdminPricing from "@/components/AdminDashComponent/AdminPayment/AdminPricing";
import AdminRecentPayment from "@/components/AdminDashComponent/AdminPayment/AdminRecentPayment";

export default function AdminPamentManagementPage() {
  return (
    <div>
      <AdminPaymentMeta />
      <AdminRecentPayment />
      <AdminPricing />
    </div>
  );
}
