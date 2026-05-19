import { useTranslation } from "react-i18next";

export default function AdminEventDetailesHeader({
  eventDetails,
}: any) {
  const { t } = useTranslation();

  const {
    organizer,
    eventDate,
    status,
    package: packageInfo,
    creationDate,
    endingDate,
  } = eventDetails || {};

  return (
    <div>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-4">
        
        <div className="flex items-start justify-between mb-5">
          <h1 className="text-[32px] font-medium leading-[140%] text-[#121417] font-lora">
            {t("event_details")}
          </h1>

          <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            {status ? t(status.toLowerCase()) : "-"}
          </span>
        </div>

        <div className="flex flex-wrap justify-between gap-y-3">

          {/* Organizer */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{t("organizer")}</p>
            <p className="text-sm font-semibold text-gray-800">
              {organizer?.name}{" "}
              <span className="text-gray-400 font-normal text-xs">
                ({organizer?.email})
              </span>
            </p>
          </div>

          {/* Event Date */}
          <div>
            <p className="text-sm font-lora text-gray-500 mb-2">{t("event_date")}</p>
            <p className="text-sm font-medium font-manrope text-gray-800">
              {eventDate ? new Date(eventDate).toLocaleDateString() : "-"}
            </p>
          </div>

          {/* Package */}
          <div>
            <p className="text-sm font-lora text-gray-500 mb-2">{t("package")}</p>
            <p className="text-sm font-medium font-manrope text-gray-800">
              {packageInfo?.name} (${packageInfo?.price})
            </p>
          </div>

          {/* Created */}
          <div>
            <p className="text-sm font-lora text-gray-500 mb-2">{t("created")}</p>
            <p className="text-sm font-medium font-manrope text-gray-800">
              {creationDate ? new Date(creationDate).toLocaleDateString() : "-"}
            </p>
          </div>

          {/* End Date */}
          <div>
            <p className="text-sm font-lora text-gray-500 mb-2">{t("end_date")}</p>
            <p className="text-sm font-medium font-manrope text-red-500">
              {endingDate ? new Date(endingDate).toLocaleDateString() : "-"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}