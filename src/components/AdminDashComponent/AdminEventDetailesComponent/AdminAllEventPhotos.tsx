import Pagination from "@/components/common/paginationComponent/Pagination";
import { Image } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminAllEventPhotos({
  eventPhotos,
  isLoading,
  meta,
  page,
  setPage,
}: any) {
  const { t } = useTranslation();
  const photos = eventPhotos?.data || [];
  console.log(photos)

  return (
    <div>
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
                <th className="text-left text-base font-medium font-manrope text-gray-900 py-3 px-4">
                  Thumbelnail
                </th>
                <th className="text-left text-base font-medium font-manrope text-gray-900 py-3 px-4 rounded-r-lg">
                  {t("time")}
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      </td>

                      <td className="py-3 px-4">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      </td>

                      <td className="py-3 px-4">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                : photos?.map((photo: any, i: number) => (
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

                          <span className="text-base font-manrope text-gray-900 truncate max-w-[250px]">
                            {photo.link}
                          </span>
                        </div>
                      </td>

                      {/* Size */}
                      <td className="py-3 px-4 text-base font-manrope text-gray-900">
                        {(photo.size / 1024).toFixed(2)} KB
                      </td>

                      {/* Uploads */}
                      <td className="py-3 px-4 text-base font-manrope text-gray-900">
                        {photo.guestId}
                      </td>
                      <td className="py-3 px-4 text-base font-manrope text-gray-900">
                        <img
                          src={photo?.link}
                          alt="thumbnail"
                          className="w-10 h-10 object-cover rounded"
                        />
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

      {/* pagination */}
      <Pagination
        currentPage={meta?.page || page}
        totalPages={meta?.lastPage || 1}
        totalItems={meta?.total || 0}
        itemsPerPage={10}
        onPageChange={setPage}
      />
    </div>
  );
}
