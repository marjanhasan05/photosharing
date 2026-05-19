import Pagination from "@/components/common/paginationComponent/Pagination";
import {
  useDeleteEventByAdminMutation,
  useGetAllEventsByAdminQuery,
} from "@/Redux/features/adminAllApi/adminEventManagement/adminEventmanagementApi";
import { ChevronDown, Eye, HardDrive, Image, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
export default function AdminEventsManagement() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  // STATE VARIABLES
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const navigate = useNavigate();

  // API (now dynamic search + filter)
  const { data, isLoading, refetch } = useGetAllEventsByAdminQuery({
    page,
    limit: 10,
    search: searchQuery,
    filter: filterValue, // ✅ direct pass
  });

  const eventsData = data?.data?.events?.data || [];
  const meta = data?.data?.events?.meta;

  // ✅ FRONTEND FILTER (status filter)

  const [deleteEvent] = useDeleteEventByAdminMutation();
  // const navigate = useNavigate();

  // const handleDelete = async (id: any) => {
  //   try {
  //     const res = await deleteEvent(id).unwrap();

  //     console.log("Delete response:", res);

  //     //  success toast (backend message)
  //     toast.success(res?.message || "Event deleted successfully");

  //     // refatch
  //     refetch();
  //   } catch (error: any) {
  //     console.log("Delete error:", error);

  //     //  error toast (backend error message)
  //     toast.error(
  //       error?.data?.message || "Something went wrong!"
  //     );
  //   }
  // };

  const handleDelete = async (id: any) => {
    const result = await Swal.fire({
      target: containerRef.current,
      title: t("are_you_sure"),
      text: t("revert_action"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: t("yes_delete"),
    });

    // ❌ user cancel করলে
    if (!result.isConfirmed) return;

    try {
      const res = await deleteEvent(id).unwrap();

      console.log("Delete response:", res);

      // ✅ success alert (SweetAlert)
      await Swal.fire({
        title: t("deleted"),
        text: res?.message || t("event_deleted"),
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ toast (optional, keep or remove)
      toast.success(res?.message || "Event deleted successfully");

      refetch();
    } catch (error: any) {
      console.log("Delete error:", error);

      // ❌ error alert
      Swal.fire({
        title: t("error"),
        text: error?.data?.message || t("something_went_wrong"),
        icon: "error",
      });

      // optional toast
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="w-full min-h-screen">
        {/* Search and Filter Section */}
        <div className="flex gap-4 mb-6 items-center justify-between">
          <div className="flex-1 max-w-xs p-[2px] rounded-lg bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)]">
            <input
              type="text"
              placeholder={t("search_events")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // reset page on search
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
              className="w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="all">{t("all")}</option>
              <option value="active">{t("active")}</option>
              <option value="ended">{t("ended")}</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* TABLE */}
        <div
          ref={containerRef}
          className=" relative overflow-hidden rounded-xl border border-[#DBE0E5] bg-white shadow-sm p-2 min-h-screen"
        >
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="border-b border-[#DBE0E5] bg-[#E5E5E5] rounded-xl ">
                <tr>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("event_name")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("organizer")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("plan_subscription")}
                  </th>
                  <th className="px-6 py-4 text-left text-xs md:text-sm">
                    {t("total_uploads")}
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
                ) : eventsData.length === 0 ? (
                  // ✅ EMPTY STATE
                  <tr>
                    <td colSpan={7} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                        <Image size={40} className="opacity-40" />
                        <p className="text-sm font-medium">{t("no_events_found")}</p>
                        <p className="text-xs text-gray-400">
                          {t("try_changing_filters")}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  eventsData.map((event: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 last:border-b-0"
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {event.eventName}
                      </td>

                      <td className="px-6 py-4 text-sm">{event.organizer}</td>

                      <td className="px-6 py-4 text-sm font-manrope">
                        <span
                          className={`font-medium ${
                            event.plan === "PREMIUM"
                              ? "text-[#8B5CF6]"
                              : event.plan === "BASIC"
                                ? "text-[#40B3EA]"
                                : event.plan === "ADVANCE"
                                  ? "text-[#F97316]"
                                  : "text-gray-600"
                          }`}
                        >
                          {event.plan}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span className="flex items-center gap-2">
                          <Image size={14} />
                          {event.upload}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span className="flex items-center gap-2">
                          <HardDrive size={14} />
                          {event.storage}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex w-20 items-center justify-center rounded-full px-3 py-2 text-xs font-medium ${
                            event.status === "ACTIVE"
                              ? "bg-[#D1FAE5] text-[#065F46]"
                              : "bg-[#FEE2E2] text-[#991B1B]"
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/dashboard/admin/events-detailes/${event.id}`,
                              )
                            }
                          >
                            <Eye size={18} color="#8B5CF6" />
                          </button>

                          <button
                            className="cursor-pointer"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash2 size={18} color="#E33A4B" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION (dynamic fix) */}
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
