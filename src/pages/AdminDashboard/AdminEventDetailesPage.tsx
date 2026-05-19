import {
  ArrowLeft,
  Trash2,
 
} from "lucide-react";
import AdminEventDetailesHeader from "@/components/AdminDashComponent/AdminEventDetailesComponent/AdminEventDetailesHeader";
import AdminEventDetailesStatus from "@/components/AdminDashComponent/AdminEventDetailesComponent/AdminEventDetailesStatus";
import AdminEventDetailesRecentPhotos from "@/components/AdminDashComponent/AdminEventDetailesComponent/AdminEventDetailesRecentPhotos";

import {
  useDeleteEventByAdminMutation,
  useGetEventDetailsByAdminQuery,
} from "@/Redux/features/adminAllApi/adminEventManagement/adminEventmanagementApi";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function AdminEventDetailesPage() {
  const { eventId } = useParams();
  const { data, isLoading } = useGetEventDetailsByAdminQuery(eventId);
  console.log(" iam the detailes for admin", data);
  const eventDetails = data?.data;
  const eventPhotos = eventDetails?.photos;
  console.log(" df", eventPhotos);

  const [deleteEvent] = useDeleteEventByAdminMutation();
  const navigate = useNavigate();

const handleDelete = async (id: any) => {
  try {
    const res = await deleteEvent(id).unwrap();

    console.log("Delete response:", res);

    //  success toast (backend message)
    toast.success(res?.message || "Event deleted successfully");

    // redirect
    navigate("/dashboard/admin/events-management");
  } catch (error: any) {
    console.log("Delete error:", error);

    //  error toast (backend error message)
    toast.error(
      error?.data?.message || "Something went wrong!"
    );
  }
};

  return (
    <div className="">
      <div className="">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => window.history.back()}
            className="group flex cursor-pointer items-center gap-2 text-lg text-gray-600 hover:text-gray-900 transition-all duration-200"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span className="relative">
              Back to Event
              <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-gray-900 transition-all duration-200 group-hover:w-full"></span>
            </span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              if (!eventId) return;
              handleDelete(eventId);
            }}
            className="flex items-center gap-2 cursor-pointer  bg-[#E33A4B] hover:bg-red-600 text-white text-sm font-medium px-4 py-3 rounded-lg transition-colors"
          >
            <Trash2 size={15} />
            <span>Delete Event</span>
          </button>
        </div>
        {/* Event info card */}
        <AdminEventDetailesHeader eventDetails={eventDetails} />
        {/* Stats */}
        {/*  // if needed data propse
        dreling */}
        <AdminEventDetailesStatus eventDetails={eventDetails} />
        {/* Recent Photos */}
        {/*  // if needed data propse
        dreling */}
        <AdminEventDetailesRecentPhotos
          eventDetails={eventDetails}
          eventId={eventId}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
