import { useTranslation } from "react-i18next";

export default function RecentActivity({
  adminRecentActivity,
  topOrganizers,
  isLoading,
}: any) {
  const { t } = useTranslation();

  return (
    <div className=" mt-10">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-medium font-lora text-gray-900 mb-6">
              {t("recent_activity")}
            </h2>

            <div className="space-y-5">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center animate-pulse"
                    >
                      <div className="w-3 h-3 rounded-full bg-gray-200"></div>

                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                : adminRecentActivity?.map((activity: any, index: number) => (
                    <div key={index} className="flex gap-4 items-center">
                      {/* Dot */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            activity.type === "LOGIN"
                              ? "bg-blue-500"
                              : activity.type === "PAYMENT"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        ></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-gray-900 font-manrope font-medium">
                          {t(activity.type.toLowerCase())}:{" "}
                          <span className="text-gray-600 font-manrope">
                            {activity.description}
                          </span>
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(activity.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Top Organizers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-medium font-lora text-gray-900 mb-6">
              {t("top_organizers")}
            </h2>

            <div className="space-y-5">
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-5 animate-pulse"
                    >
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>

                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))
                : topOrganizers?.map((organizer: any) => (
                    <div
                      key={organizer.id}
                      className="flex items-center justify-between pb-5 border-gray-100 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <p className="text-gray-900 font-lora font-medium">
                          {organizer.name}
                        </p>
                        <p className="text-sm text-gray-500 font-manrope mt-1">
                          {t("events_count", { count: organizer.eventCount })}
                        </p>
                      </div>

                      <p className="text-lg font-lora font-semibold text-orange-500">
                        ${organizer.totalSpending}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}