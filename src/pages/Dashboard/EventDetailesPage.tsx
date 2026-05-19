import EventDetailesHeader from "@/components/UserDashboard/EventDetailesPageComponent/EventDetailesHeader";
import EventDetailesPhotoGallary from "@/components/UserDashboard/EventDetailesPageComponent/EventDetailesPhotoGallary";
import { useGetEventByIdQuery } from "@/Redux/features/eventsapi/eventApi";
import { useParams } from "react-router";

export default function EventDetailesPage() {
  const { eventId } = useParams();
  const { data , isLoading:imageLoading, refetch} = useGetEventByIdQuery(eventId!);
  console.log(data)
  const detailesData = data?.data; 
  console.log(" details data", detailesData);
  console.log("Event ID:", eventId);
  console.log("iam the detailes data",data)
  const  token=data?.data?.uploadToken
  console.log(token)  
  return (
    <div className="bg-[#F5F9FA]">
      <EventDetailesHeader detailesData={detailesData} imageLoading={imageLoading} refetch={refetch} eventId={eventId} />
      <div className="border-t border-gray-100 mx-6" />
      <EventDetailesPhotoGallary  detailesData={detailesData} imageLoading={imageLoading}  token={token} />
    </div>
  );
}
 