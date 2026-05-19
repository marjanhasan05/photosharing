import AdminHomeMeta from "@/components/AdminDashComponent/AdminHomeComponent/AdminHomeMeta";
import AdminResentTable from "@/components/AdminDashComponent/AdminHomeComponent/AdminResentTable";
import RecentActivity from "@/components/AdminDashComponent/AdminHomeComponent/RecentActivity";
import { useGetAdminDashboardQuery } from "@/Redux/features/adminAllApi/adminDashboardApi";

export default function AdminDashHome() {
  const { data, isLoading } =  useGetAdminDashboardQuery({});

  const adminMeta =data?.data
  const adminRecentTable = data?.data?.recentEvents?.slice(0, 6);
  const adminRecentActivity = data?.data?.recentActivity
  const topOrganizers = data?.data?.topOrganizer
  console.log(" hey bro iam the admin dash", data)
   console.log(" hey bro meta", adminMeta)
   console.log(" hey bro recent table", adminRecentTable)
   console.log("admin recentActivity", adminRecentActivity)
  return (
    <div>
      <AdminHomeMeta  adminMeta={adminMeta} isLoading={isLoading}/>
      <AdminResentTable  adminRecentTable={adminRecentTable} isLoading={isLoading}/>
      <RecentActivity adminRecentActivity={adminRecentActivity} topOrganizers={topOrganizers} isLoading={isLoading}/>
    </div>
  );
}
