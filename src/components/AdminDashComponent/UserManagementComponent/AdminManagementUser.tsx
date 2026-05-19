import Pagination from "@/components/common/paginationComponent/Pagination";
import { ChevronDown, HardDrive, Image } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import UserMetaData from "./UserMetaData";
import {
  useAdminSuspendUserMutation,
  useGetAllUsersByAdminQuery,
} from "@/Redux/features/adminAllApi/adminUserManagement/adminUserManagementApi";
import { toast } from "sonner";

export default function AdminManagementUser() {
  const { t } = useTranslation();
  const [adminSuspendUser] = useAdminSuspendUserMutation();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all"); // ✅ backend friendly

  const { data, isLoading, refetch } = useGetAllUsersByAdminQuery({
    page,
    limit: 10,
    search: searchQuery,
    filter: filterValue,
  });

  const usersData = data?.data?.data || [];
  const meta = data?.data?.meta;

  const handleToggleSuspend = async (user: any) => {
    try {
      const res = await adminSuspendUser(user.id).unwrap();
      toast.success(res?.message || t("user_status_updated"));
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || t("something_went_wrong"));
    }
  };

  return (
    <div>
      <div className="w-full">
        {/* Search and Filter Section */}
        <div className="flex gap-4 mb-6 items-center justify-between">
          <div className="flex-1 max-w-xs p-[2px] rounded-lg bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
            <input
              type="text"
              placeholder={t("search_users_placeholder")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // ✅ reset page
              }}
              className="w-full px-4 py-2 rounded-lg text-sm bg-white text-gray-900 focus:outline-none"
            />
          </div>

          <div className="relative">
            <select
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                setPage(1); // ✅ reset page
              }}
              className="w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="all">{t("all_users")}</option>
              <option value="active">{t("active")}</option>
              <option value="suspended">{t("suspended")}</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* card area */}
        <UserMetaData data={data} />

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-2 min-h-screen">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-[#DBE0E5] bg-[#E5E5E5]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("user_name")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("email")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("event_count")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("uploads")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("storage")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("status")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("action")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <tr key={index} className="border-b animate-pulse">
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-10"></div>
                      </td>
                    </tr>
                  ))
                ) : usersData.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-500">
                      {t("no_users_found")} 😔
                    </td>
                  </tr>
                ) : (
                  usersData.map((user: any, index: any) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {user.userName}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-[#8B5CF6]">
                        {user.eventCount}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="flex items-center gap-2">
                          <Image size={14} />
                          {user.imageCount}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="flex items-center gap-2">
                          <HardDrive size={14} />
                          {user.totalStorageUsed?.toFixed(2)} MB
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex w-24 items-center justify-center rounded-full px-3 py-2 text-xs font-medium ${
                            user.status === "ACTIVE"
                              ? "bg-[#D1FAE5] text-[#065F46]" // green
                              : user.status === "SUSPENDED"
                                ? "bg-[#FEE2E2] text-[#991B1B]" // red
                                : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {t(user.status.toLowerCase())}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          {/* <button
                            onClick={() =>
                              navigate(
                                `/dashboard/admin/users-detailes/${user.id}`,
                              )
                            }
                            className="cursor-pointer"
                          >
                            <Eye size={18} color="#8B5CF6" />
                          </button> */}

                          {/* <button className="cursor-pointer">
                            <Trash2 size={18} color="#E33A4B" />
                          </button> */}
                          <div
                            onClick={() => handleToggleSuspend(user)}
                            className={`w-11 h-6 rounded-full relative cursor-pointer flex-shrink-0 transition-colors duration-200 ${
                              user.status === "SUSPENDED"
                                ? "bg-gray-300"
                                : "bg-purple-600"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-all duration-200 ${
                                user.status === "SUSPENDED"
                                  ? "left-0.5"
                                  : "right-0.5"
                              }`}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={meta?.page || page}
            totalPages={meta?.lastPage || 1}
            totalItems={meta?.total || 0}
            itemsPerPage={10}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
