import { Image } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function AdminEventDetailesRecentPhotos({
  eventDetails,
  eventId,
  isLoading,
}: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const eventPhotos = eventDetails?.photos;

  return (
    <div className="mt-14 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-medium leading-[124%] text-[#121417] font-[Lora]">
          {t("recent_photos")}
        </h2>

        <button
          onClick={() =>
            navigate(`/dashboard/admin/all-event-photo/${eventId}`)
          }
          className="text-lg font-manrope font-medium text-purple-500 hover:text-purple-700 cursor-pointer transition-colors"
        >
          {t("view_all")}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E5E5E5] rounded-lg">
                <th className="text-left text-base font-medium font-manrope text-gray-900 py-3 px-4 rounded-l-lg">
                  {t("upload")}
                </th>
                <th className="text-left text-base font-medium font-manrope text-gray-900 py-3 px-4">
                  {t("size")}
                </th>
                <th className="text-left text-base font-medium font-manrope text-gray-900 py-3 px-4">
                  {t("uploads")}
                </th>
                <th className="text-left text-base font-medium font-manrope text-gray-900 py-3 px-4 rounded-r-lg">
                  {t("time")}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 animate-pulse"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gray-200 rounded" />
                          <div className="h-4 bg-gray-200 rounded w-40" />
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded w-16" />
                      </td>

                      <td className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded w-10" />
                      </td>

                      <td className="py-3 px-4">
                        <div className="h-4 bg-gray-200 rounded w-32" />
                      </td>
                    </tr>
                  ))
                : eventPhotos?.map((photo: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      {/* Upload */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Image size={14} className="text-gray-400" />
                          </div>

                          <span className="text-base font-manrope text-gray-900 truncate max-w-[200px]">
                            {photo.link}
                          </span>
                        </div>
                      </td>

                      {/* Size */}
                      <td className="py-3 px-4 text-base font-manrope text-gray-900">
                        {(photo.size / 1024).toFixed(2)} KB
                      </td>

                      {/* Upload ID */}
                      <td className="py-3 px-4 text-base font-manrope text-gray-900">
                        #{photo.id}
                      </td>

                      {/* Time */}
                      <td className="py-3 px-4 text-base font-manrope text-gray-900">
                        {new Date(photo.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}