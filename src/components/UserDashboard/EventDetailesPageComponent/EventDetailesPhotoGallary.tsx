// import { Check, Download, MoreVertical } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// export default function EventDetailesPhotoGallary({ detailesData, imageLoading }: any) {
//   console.log(" iam ", detailesData);

//   const photos = detailesData?.images || [];
//   console.log(photos);
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

//   return (
//     <div>
//       <div className="px-4  pt-2 pb-10">
//         {/* Section Header */}
//         <div className="  py-8">
//           <div className="mb-8 bg-[#FFF] p-6 rounded-2xl">
//             {/* HEADER */}
//             <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
//               <h2 className="text-[#0A0A0A] font-lora text-[20px] sm:text-[24px] font-medium">
//                 Event Photos ({photos.length})
//               </h2>

//               <div className="flex gap-3 w-full sm:w-auto">
//                 {/* DOWNLOAD */}
//                 {selectedImages.length > 0 && (
//                   <button
//                     onClick={handleDownload}
//                     className="px-6 py-1.5 rounded-lg bg-[#E2E5E9] flex items-center gap-2"
//                   >
//                     <Download size={16} />
//                     Download
//                   </button>
//                 )}

//                 {/* SELECT */}
//                 {photos.length > 0 && (
//                   <div className="relative w-full sm:w-auto">
//                     <select
//                       value={filterValue}
//                       onChange={(e) => handleSelectChange(e.target.value)}
//                       className="w-full appearance-none px-4 py-2 pr-10 rounded-lg text-sm bg-white cursor-pointer"
//                     >
//                       <option value="">Select action</option>
//                       <option value="select All">Select All</option>
//                       <option value="deselect">Deselect</option>
//                     </select>

//                     <MoreVertical
//                       size={16}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* GRID */}
//             {!imageLoading && photos.length > 0 && (
//               <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//                 {photos.map((photo: any) => (
//                   <div
//                     key={photo.id}
//                     onClick={() => toggleSelect(photo.id)}
//                     className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square group cursor-pointer"
//                   >
//                     <img
//                       src={photo.link}
//                       className="w-full h-full object-cover"
//                     />

//                     {/* CHECK MARK */}
//                     {selectedImages.includes(photo.id) && (
//                       <div className="absolute top-2 right-2 bg-white rounded-full p-1">
//                         <Check size={12} />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// this is workbel code bellow

// import { useDownloadImagesZipMutation } from "@/Redux/features/download/downloadApi";
// import { Check, Download, MoreVertical } from "lucide-react";
// import { useState } from "react";
// import { toast } from "sonner";

// // Add token, guestId as props
// export default function EventDetailesPhotoGallary({
//   detailesData,
//   imageLoading,
//   token,        // 👈 new
//   guestId,      // 👈 new
// }: any) {
//   const photos = detailesData?.images || [];
//   const [selectedImages, setSelectedImages] = useState<number[]>([]);
//   const [filterValue, setFilterValue] = useState("All Users");

//   // 👇 use the mutation hook
//   const [downloadZip, { isLoading: isDownloading }] = useDownloadImagesZipMutation();

//   const toggleSelect = (id: number) => {
//     setSelectedImages((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const handleSelectChange = (value: string) => {
//     setFilterValue(value);
//     if (value === "select All") {
//       setSelectedImages(photos.map((p: any) => p.id));
//     }
//     if (value === "deselect") {
//       setSelectedImages([]);
//     }
//   };

//   // 👇 download handler
//   const handleDownload = async () => {
//     if (selectedImages.length === 0) {
//       toast.warning("No images selected");
//       return;
//     }
//     // if (!token || !guestId) {
//     //   toast.error("Missing token or guest ID");
//     //   return;
//     // }

//     try {
//       const blob = await downloadZip({
//         token,
//         imageIds: selectedImages,
//         guestId,
//       }).unwrap();

//       // Validate that we got a Blob
//       if (!(blob instanceof Blob)) {
//         throw new Error("Invalid response from server");
//       }

//       // Optional: check if the blob is a ZIP (by MIME type)
//       if (blob.type && !blob.type.includes("zip")) {
//         // Try to read as text – maybe an error message
//         const text = await blob.text();
//         throw new Error(text || "Server returned an invalid response");
//       }

//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "images.zip";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);

//       toast.success("Download started");
//     } catch (error: any) {
//       console.error("Download error:", error);
//       toast.error(error?.message || "Failed to download images");
//     }
//   };

//   return (
//     <div>
//       <div className="px-4 pt-2 pb-10">
//         <div className="py-8">
//           <div className="mb-8 bg-[#FFF] p-6 rounded-2xl">
//             <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
//               <h2 className="text-[#0A0A0A] font-lora text-[20px] sm:text-[24px] font-medium">
//                 Event Photos ({photos.length})
//               </h2>

//               <div className="flex gap-3 w-full sm:w-auto">
//                 {selectedImages.length > 0 && (
//                   <button
//                     onClick={handleDownload}
//                     disabled={isDownloading}
//                     className="px-6 py-1.5 rounded-lg bg-[#E2E5E9] flex items-center gap-2"
//                   >
//                     {isDownloading ? (
//                       <>
//                         <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
//                         Downloading...
//                       </>
//                     ) : (
//                       <>
//                         <Download size={16} />
//                         Download with Zip
//                       </>
//                     )}
//                   </button>
//                 )}

//                 {photos.length > 0 && (
//                   <div className="relative w-full sm:w-auto">
//                     <select
//                       value={filterValue}
//                       onChange={(e) => handleSelectChange(e.target.value)}
//                       className="w-full appearance-none px-4 py-2 pr-10 rounded-lg text-sm bg-white cursor-pointer"
//                     >
//                       <option value="">Select action</option>
//                       <option value="select All">Select All</option>
//                       <option value="deselect">Deselect</option>
//                     </select>
//                     <MoreVertical
//                       size={16}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {!imageLoading && photos.length > 0 && (
//               <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
//                 {photos.map((photo: any) => (
//                   <div
//                     key={photo.id}
//                     onClick={() => toggleSelect(photo.id)}
//                     className="relative overflow-hidden rounded-lg bg-gray-200 aspect-square group cursor-pointer"
//                   >
//                     <img src={photo.link} className="w-full h-full object-cover" />
//                     {selectedImages.includes(photo.id) && (
//                       <div className="absolute top-2 right-2 bg-white rounded-full p-1">
//                         <Check size={12} />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// new code with derect download

import {
  useDownloadImagesZipMutation,
  useDownloadDirectImageMutation,
} from "@/Redux/features/download/downloadApi";
import { Check, Download, MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function EventDetailesPhotoGallary({
  detailesData,
  imageLoading,
  token,
  guestId,
}: any) {
  const photos = detailesData?.images || [];
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [filterValue, setFilterValue] = useState("All Users");
  const [isDirectDownloading, setIsDirectDownloading] = useState(false);
  const navigate = useNavigate();

  const [downloadZip, { isLoading: isDownloading }] =
    useDownloadImagesZipMutation();
  const [downloadDirect] = useDownloadDirectImageMutation();

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

  const handleDownload = async () => {
    if (selectedImages.length === 0) {
      toast.warning("No images selected");
      return;
    }

    try {
      const blob = await downloadZip({
        token,
        imageIds: selectedImages,
        guestId,
      }).unwrap();

      if (!(blob instanceof Blob)) {
        throw new Error("Invalid response from server");
      }

      if (blob.type && !blob.type.includes("zip")) {
        const text = await blob.text();
        throw new Error(text || "Server returned an invalid response");
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch (error: any) {
      console.error("Download error:", error);
      toast.error(error?.message || "Failed to download images");
    }
  };

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

  return (
    <div>
          {/* LOADING OVERLAY */}
    {(isDownloading || isDirectDownloading) && (
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
      <div className="px-4 pt-2 pb-10">
        <div className="py-8">
          <div className="mb-8 bg-[#FFF] p-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <h2 className="text-[#0A0A0A] font-lora text-[20px] sm:text-[24px] font-medium">
                Event Photos ({photos.length})
              </h2>

              <div className="flex flex-col lg:flex-row gap-3 w-full sm:w-auto">
                <button
                 onClick={() => navigate('/tutorial')}
               className="px-6 py-1.5 rounded-lg bg-[#E2E5E9] flex items-center gap-2 md:hidden"
                >Tutorial For Download</button>
                {selectedImages.length > 0 && (
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="px-6 py-1.5 rounded-lg cursor-pointer bg-[#E2E5E9] flex items-center gap-2"
                  >
                    {isDownloading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Download with Zip
                      </>
                    )}
                  </button>
                )}

                {selectedImages.length > 0 && (
                  <button
                    onClick={handleDirectDownload}
                    disabled={isDirectDownloading}
                    className="px-6 py-1.5 rounded-lg cursor-pointer bg-[#E2E5E9] flex items-center gap-2"
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

                <div className="">
                  {photos.length > 0 && (
                    <div className="relative w-full sm:w-auto">
                      <select
                        value={filterValue}
                        onChange={(e) => handleSelectChange(e.target.value)}
                        className="w-full appearance-none px-4 py-2 pr-8 rounded-lg text-sm bg-white cursor-pointer border border-gray-200"
                      >
                        <option value="">Select action</option>
                        <option value="select All">Select All</option>
                        <option value="deselect">Deselect</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <MoreVertical size={16} className="text-gray-500" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
    </div>
  );
}
