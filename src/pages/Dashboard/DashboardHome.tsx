import RecentEventTableDashboard from "@/components/UserDashboard/UserDashboardHomeCpmponent/RecentEventTableDashboard";
import UseDashboardMeta from "@/components/UserDashboard/UserDashboardHomeCpmponent/UseDashboardMeta";

export default function DashboardHome() {
  return (
    <div className="">
      <UseDashboardMeta />
      <div className="mt-20">
        <RecentEventTableDashboard />
      </div>
    </div>
  );
}
