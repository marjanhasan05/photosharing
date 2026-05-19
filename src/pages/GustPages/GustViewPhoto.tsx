// import { useEventGuestUploadImageMutation } from "@/Redux/features/eventsapi/eventApi";
// import { Upload, MoreVertical, Download } from "lucide-react";
// import { useRef, useState } from "react";
// import { useSearchParams } from "react-router";

// export default function GustViewPhoto() {
//   const [uploadImage] = useEventGuestUploadImageMutation();

//   const [searchParams] = useSearchParams();

//   const eventId = searchParams.get("event_id");
//   const token = searchParams.get("token");
//   const password = searchParams.get("password"); // optional
//   const guestId = searchParams.get("guestId");

//   console.log("Event ID:", eventId);
//   console.log("Token:", token);
//   console.log("Password:", password);
//   console.log("Guest ID:", guestId);
//   // =============
//   // here add handler

//   // =========================
//   // ✅ UPLOAD HANDLER LOGIC
//   // =========================
//     // ✅ ADD HERE (IMPORTANT PLACE)
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   const files = e.target.files;

//   if (!files || !token) return;

//   const uploadPromises = Array.from(files).map(async (file) => {
//     const formData = new FormData();

//     formData.append("image", file);

//     if (guestId) {
//       formData.append("guestId", guestId);
//     }

//     if (password) {
//       formData.append("password", password);
//     }

//     const res = await uploadImage({
//       token,
//       formData,
//     }).unwrap();

//     //  LOG EACH RESPONSE HERE
//     console.log("Uploaded Image Response:", res);

//     return res;
//   });

//   try {
//     const results = await Promise.all(uploadPromises);

//     //  ALL RESPONSES TOGETHER
//     console.log("All Upload Results:", results);
//   } catch (err) {
//     console.log("Upload Error:", err);
//   }

//   e.target.value = "";
// };

//   const [filterValue, setFilterValue] = useState("All Users");
//   // Sample photo data
//   const photos = [
//     {
//       id: 1,
//       src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
//       alt: "Wedding couple",
//     },
//     {
//       id: 2,
//       src: "https://images.unsplash.com/photo-1537633552985-caf9a4f5aca5?w=400&h=300&fit=crop",
//       alt: "Wedding rings",
//     },
//     {
//       id: 3,
//       src: "https://images.unsplash.com/photo-1515934751635-c06ab9d4e37a?w=400&h=300&fit=crop",
//       alt: "White flowers",
//     },
//     {
//       id: 4,
//       src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
//       alt: "Bride portrait",
//     },
//     {
//       id: 5,
//       src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
//       alt: "Couple outdoors",
//     },
//     {
//       id: 6,
//       src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=400&h=300&fit=crop",
//       alt: "Flower arrangement",
//     },
//     {
//       id: 7,
//       src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
//       alt: "Wedding cake",
//     },
//     {
//       id: 8,
//       src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
//       alt: "First dance",
//     },
//     {
//       id: 9,
//       src: "https://images.unsplash.com/photo-1542154049-5166269f9d53?w=400&h=300&fit=crop",
//       alt: "Wedding ring detail",
//     },
//     {
//       id: 10,
//       src: "https://images.unsplash.com/photo-1606216174052-933bead64bda?w=400&h=300&fit=crop",
//       alt: "Reception",
//     },
//     {
//       id: 11,
//       src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
//       alt: "Bride and groom",
//     },
//     {
//       id: 12,
//       src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
//       alt: "Golden hour",
//     },
//   ];

//   return (
//     <div className="bg-[#F5F9FA] ">
//       {/* Header */}
//       <div className="">
//         <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//           <div className="text-center sm:text-left">
//             <h1 className="text-[#121417] font-lora text-2xl sm:text-3xl font-medium leading-[140%]">
//               Sarah & Michael's Wedding
//             </h1>
//             <p className="text-base font-manrope text-[#2F343A] mt-1">
//               End date: <span className="text-[#E33A4B]">April 10, 2026</span>
//             </p>
//           </div>

//           {/* <button className="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-purple-500 to-orange-400 text-white px-6 sm:px-8 py-2 rounded-lg hover:shadow-lg transition-shadow w-full sm:w-auto">
//             <Upload size={18} />
//             Upload Photos
//           </button> */}
//           <div>
//              <button
//             onClick={handleUploadClick}
//             className="flex items-center justify-center cursor-pointer gap-2 bg-gradient-to-r from-purple-500 to-orange-400 text-white px-6 sm:px-8 py-2 rounded-lg hover:shadow-lg transition-shadow w-full sm:w-auto"
//           >
//             <Upload size={18} />
//             Upload Photos
//           </button>

//           {/* hidden file input */}
//           <input
//             type="file"
//             ref={fileInputRef}
//             multiple
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Event Photos Section */}
//         <div className="mb-8 bg-[#FFF] p-6 rounded-2xl">
//           <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
//             <h2 className="text-[#0A0A0A] font-lora text-[20px] sm:text-[24px] font-medium leading-[124%] mb-2 sm:mb-6 text-center sm:text-left">
//               Event Photos (80)
//             </h2>

//             <div className="flex  gap-3 w-full sm:w-auto">
//               {/* Download button */}
//               <button className="w-full sm:w-auto px-6 py-1.5 rounded-lg hover:bg-gray-300 bg-[#E2E5E9] text-black cursor-pointer flex items-center justify-center gap-2">
//                 <Download size={16} />
//                 Download
//               </button>

//               {/* Select */}
//               <div className="relative w-full sm:w-auto">
//                 <select
//                   value={filterValue}
//                   onChange={(e) => setFilterValue(e.target.value)}
//                   className="w-full appearance-none px-4 py-2 pr-10 rounded-lg text-sm text-black opacity-0 absolute inset-0 cursor-pointer"
//                 >
//                   <option value="All Users">All Users</option>
//                   <option value="Active">Active</option>
//                   <option value="Suspended">Suspended</option>
//                 </select>

//                 {/* fake UI */}
//                 <div className="w-full px-4 py-2 rounded-lg text-sm bg-white">
//                   {/* intentionally empty */}
//                 </div>

//                 <MoreVertical
//                   size={16}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Photo Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//             {photos.map((photo) => (
//               <div
//                 key={photo.id}
//                 className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square group cursor-pointer hover:shadow-lg transition-all duration-300"
//               >
//                 <img
//                   src={photo.src}
//                   alt={photo.alt}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 {/* Overlay on hover */}
//                 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// workble code
// import {
//   useEventGuestUploadImageMutation,
//   useGetAllGustIamgePublicQuery,
// } from "@/Redux/features/eventsapi/eventApi";
// import { Upload, MoreVertical, Download, Check } from "lucide-react";
// import { useRef, useState } from "react";
// import { useSearchParams } from "react-router";
// import { toast } from "sonner";

// export default function GustViewPhoto() {
//   const [uploadImage, { isLoading }] = useEventGuestUploadImageMutation();

//   const [searchParams] = useSearchParams();

//   const eventId = searchParams.get("event_id");
//   const token = searchParams.get("token");
//   const password = searchParams.get("password");
//   const guestId = searchParams.get("guestId");
//   console.log("event_id",eventId)
//   console.log(" token", token);
//   console.log("password", password);
//   console.log("guestId", guestId);

//   const { data, isLoading: imageLoading , refetch} = useGetAllGustIamgePublicQuery({
//     id: eventId,
//     uploadToken: token,
//     guestId: guestId,
//   });
//   console.log(data)

//   const photos = data?.data?.images || [];

//   // =========================
//   // SELECT STATE
//   // =========================
//   const [selectedImages, setSelectedImages] = useState<number[]>([]);
//   const [filterValue, setFilterValue] = useState("All Users");

//   const toggleSelect = (id: number) => {
//     setSelectedImages((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
//     );
//   };

//   // =========================
//   // 🔥 FIX: HANDLE SELECT CHANGE
//   // =========================
//   const handleSelectChange = (value: string) => {
//     setFilterValue(value);

//     if (value === "select All") {
//       setSelectedImages(photos.map((p: any) => p.id));
//     }

//     if (value === "deselect") {
//       setSelectedImages([]);
//     }
//   };

//   // =========================
//   // DOWNLOAD
//   // =========================

//   // =========================
//   // UPLOAD
//   // =========================
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || !token) return;

//     const uploadPromises = Array.from(files).map(async (file) => {
//       const formData = new FormData();

//       formData.append("image", file);
//       if (guestId) formData.append("guestId", guestId);
//       if (password) formData.append("password", password);

//       const res = await uploadImage({
//         token,
//         formData,
//       }).unwrap();

//       return res;
//     });

//     try {
//       await Promise.all(uploadPromises);
//       toast.success("Images uploaded successfully!");
//       refetch();
//     } catch {
//       toast.error("Upload failed. Please try again.");
//     }

//     e.target.value = "";
//   };

//   return (
//     <div className="bg-[#F5F9FA] ">
//       {/* LOADING OVERLAY */}
//       {isLoading && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="text-center">
//             <div className="flex justify-center mb-6">
//               <div className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin" />
//             </div>
//             <h1 className="text-2xl font-semibold text-white mb-2">
//               Uploading photos
//             </h1>
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="">
//         <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//           <div className="text-center sm:text-left">
//             <h1 className="text-[#121417] font-lora text-2xl sm:text-3xl font-medium leading-[140%]">
//               Sarah & Michael's Wedding
//             </h1>
//           </div>

//           <button
//             onClick={handleUploadClick}
//             disabled={isLoading}
//             className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-orange-400 text-white px-6 py-2 rounded-lg"
//           >
//             <Upload size={18} />
//             Upload Photos
//           </button>

//           <input
//             type="file"
//             ref={fileInputRef}
//             multiple
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </div>
//       </div>

//       {/* MAIN */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="mb-8 bg-[#FFF] p-6 rounded-2xl">
//           {/* HEADER */}
//           <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
//             <h2 className="text-[#0A0A0A] font-lora text-[20px] sm:text-[24px] font-medium">
//               Event Photos ({photos.length})
//             </h2>

//             <div className="flex gap-3 w-full sm:w-auto">
//               {/* DOWNLOAD */}
//               {selectedImages.length > 0 && (
//                 <button
//                   // onClick={handleDownload}
//                   className="px-6 py-1.5 rounded-lg bg-[#E2E5E9] flex items-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download
//                 </button>
//               )}

//               {/* SELECT */}
//               {photos.length > 0 && (
//                 <div className="relative w-full sm:w-auto">
//                   <select
//                     value={filterValue}
//                     onChange={(e) => handleSelectChange(e.target.value)}
//                     className="w-full appearance-none px-4 py-2 pr-10 rounded-lg text-sm bg-white cursor-pointer"
//                   >
//                     <option value="">Select action</option>
//                     <option value="select All">Select All</option>
//                     <option value="deselect">Deselect</option>
//                   </select>

//                   <MoreVertical
//                     size={16}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* GRID */}
//           {!imageLoading && photos.length > 0 && (
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//               {photos.map((photo: any) => (
//                 <div
//                   key={photo.id}
//                   onClick={() => toggleSelect(photo.id)}
//                   className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square group cursor-pointer"
//                 >
//                   <img
//                     src={photo.link}
//                     className="w-full h-full object-cover"
//                   />

//                   {/* CHECK MARK */}
//                   {selectedImages.includes(photo.id) && (
//                     <div className="absolute top-2 right-2 bg-white rounded-full p-1">
//                       <Check size={12}/>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// working code

import {
  useDownloadDirectImageMutation,
  useDownloadImagesZipMutation,
} from "@/Redux/features/download/downloadApi";
import {
  useEventGuestUploadImageMutation,
  useGetAllGustIamgePublicQuery,
} from "@/Redux/features/eventsapi/eventApi";

import { Upload, MoreVertical, Download, Check } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function GustViewPhoto() {
  const navigate = useNavigate();
  const [uploadImage, { isLoading }] = useEventGuestUploadImageMutation();
  const [downloadZip, { isLoading: isDownloading }] =
    useDownloadImagesZipMutation(); // 👈 add
  const [downloadDirect] = useDownloadDirectImageMutation();
  const [isDirectDownloading, setIsDirectDownloading] = useState(false);

  const [searchParams] = useSearchParams();

  const eventId = searchParams.get("event_id");
  const token = searchParams.get("token");
  const password = searchParams.get("password");
  const guestId = searchParams.get("guestId");
  console.log("event_id", eventId);
  console.log(" token", token);
  console.log("password", password);
  console.log("guestId", guestId);

  const {
    data,
    isLoading: imageLoading,
    refetch,
  } = useGetAllGustIamgePublicQuery({
    id: eventId,
    uploadToken: token,
    guestId: guestId,
  });
  console.log(data);

  const photos = data?.data?.images || [];

  // =========================
  // SELECT STATE
  // =========================
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [filterValue, setFilterValue] = useState("All Users");

  const toggleSelect = (id: number) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectChange = (value: string) => {
    setFilterValue(value);

    if (value === "select All") {
      setSelectedImages(photos.map((p: any) => p.id));
    }

    if (value === "deselect") {
      setSelectedImages([]);
    }
  };

  // =========================
  // DOWNLOAD HANDLER (using RTK Query)
  // =========================
  const handleDownload = async () => {
    if (selectedImages.length === 0) {
      toast.warning("No images selected");
      return;
    }

    if (!token || !guestId) {
      toast.error("Missing token or guest ID");
      return;
    }

    try {
      const blob = await downloadZip({
        token,
        imageIds: selectedImages,
        guestId,
      }).unwrap();

      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // You can set a dynamic filename if your backend sends Content-Disposition
      a.download = "images.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch (error: any) {
      console.error("Download error:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to download images",
      );
    }
  };

  // ================
  // DIRECT DOWNLOAD HANDLER (for single image, optional)
  const handleDirectDownload = async () => {
    if (selectedImages.length === 0) {
      toast.warning("No images selected");
      return;
    }

    try {
      setIsDirectDownloading(true);

      for (const imageId of selectedImages) {
        const blob = await downloadDirect({ imageId, token }).unwrap();

        if (!(blob instanceof Blob)) {
          throw new Error("Invalid response from server");
        }

        const photo = photos.find((p: any) => p.id === imageId);
        const ext = photo?.link?.split(".").pop()?.split("?")[0] || "jpg";

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `image_${imageId}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      toast.success("Download started");
    } catch (error: any) {
      console.error("Direct download error:", error);
      toast.error(error?.message || "Failed to download images");
    } finally {
      setIsDirectDownloading(false);
    }
  };

  // =========================
  // UPLOAD (unchanged)
  // =========================
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !token) return;

    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();

      formData.append("image", file);
      if (guestId) formData.append("guestId", guestId);
      if (password) formData.append("password", password);

      const res = await uploadImage({
        token,
        formData,
      }).unwrap();

      // console.log(object)

      return res;
    });

    try {
      await Promise.all(uploadPromises);
      toast.success("Images uploaded successfully!");
      refetch();
    } catch {
      toast.error("Upload failed. Please try again.");
    }

    e.target.value = "";
  };

  return (
    <div className="bg-[#F5F9FA] ">
      {/* LOADING OVERLAY */}
      {(isLoading || isDownloading || isDirectDownloading) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full border-4 border-purple-200 border-t-purple-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Please Wait Downloading photos {selectedImages.length}
            </h1>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-[#121417] font-lora text-2xl sm:text-3xl font-medium leading-[140%]">
              {data?.data?.eventName || "Event Photos"}
            </h1>
          </div>

          <button
            onClick={handleUploadClick}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-orange-400 text-white px-6 py-2 rounded-lg"
          >
            <Upload size={18} />
            Upload Photos
          </button>

          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 bg-[#FFF] p-6 rounded-2xl">
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <h2 className="text-[#0A0A0A] font-lora text-[20px] sm:text-[24px] font-medium">
              Event Photos ({photos.length})
            </h2>

            <div className="flex flex-col lg:flex-row gap-3 w-full sm:w-auto ">
              {/* DOWNLOAD ZIP button */}
              <button
                 onClick={() => navigate('/tutorial')}
               className="px-6 py-1.5 rounded-lg bg-[#E2E5E9] flex items-center gap-2 md:hidden"
                >Tutorial For Download</button>
              {selectedImages.length > 0 && (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-6 py-1.5 rounded-lg bg-[#E2E5E9]  flex items-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Download with zip
                    </>
                  )}
                </button>
              )}

              {/* DIRECT DOWNLOAD button */}
              {selectedImages.length > 0 && (
                <button
                  onClick={handleDirectDownload}
                  disabled={isDirectDownloading}
                  className="px-6 py-1.5 rounded-lg bg-[#E2E5E9] flex items-center gap-2"
                >
                  {isDirectDownloading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      Direct Download 
                    </>
                  )}
                </button>
              )}

              {/* SELECT */}
              {photos.length > 0 && (
                <div className="relative w-full sm:w-auto">
                  <select
                    value={filterValue}
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className="w-full appearance-none px-4 py-2 pr-10 rounded-lg text-sm bg-white cursor-pointer"
                  >
                    <option value="">Select action</option>
                    <option value="select All">Select All</option>
                    <option value="deselect">Deselect</option>
                  </select>

                  <MoreVertical
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* GRID */}
          {!imageLoading && photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {photos.map((photo: any) => (
                <div
                  key={photo.id}
                  onClick={() => toggleSelect(photo.id)}
                  className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square group cursor-pointer"
                >
                  <img
                    src={photo.link}
                    className="w-full h-full object-cover"
                  />

                  {/* CHECK MARK */}
                  {selectedImages.includes(photo.id) && (
                    <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                      <Check size={12} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
