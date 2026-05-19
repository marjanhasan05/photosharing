import AdminAllEventPhotos from "@/components/AdminDashComponent/AdminEventDetailesComponent/AdminAllEventPhotos";
import { useGetAllEventImagesByAdminQuery } from "@/Redux/features/adminAllApi/adminEventManagement/adminEventmanagementApi";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";

export default function AdminAllEventPhotosPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { eventId } = useParams();
  console.log(eventId);
  const { data, isLoading } = useGetAllEventImagesByAdminQuery({
    id: eventId,
    page,
    limit,
  });

  // console.log(data);
  const eventPhotos = data?.data;
  const meta = data?.data?.meta;
  // console.log(meta);
  return (
    <div>
      <div className="mb-6">
        <button 
         onClick={() => window.history.back()}
        className="group flex cursor-pointer items-center gap-2 text-lg text-gray-600 hover:text-gray-900 transition-all duration-200">
          <ArrowLeft
            size={18}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          <span className="relative">
            Back to Event
            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-gray-900 transition-all duration-200 group-hover:w-full"></span>
          </span>
        </button>
      </div>
      <AdminAllEventPhotos
        eventPhotos={eventPhotos}
        isLoading={isLoading}
        meta={meta}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
