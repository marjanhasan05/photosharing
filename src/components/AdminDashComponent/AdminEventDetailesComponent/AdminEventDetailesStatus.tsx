import { useTranslation } from "react-i18next";
import { Upload, HardDrive, Users } from "lucide-react";

export default function AdminEventDetailesStatus({ eventDetails }: any) {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Upload,
      value: eventDetails ? eventDetails.totalUploadCount : 0,
      label: t("total_uploads"),
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
      borderColor: "border-blue-100",
    },
    {
      icon: HardDrive,
      value: Number(eventDetails?.totalStorageUsed || 0).toFixed(2),
      label: t("storage_used"),
      iconBg: "bg-orange-50",
      iconColor: "text-orange-400",
      borderColor: "border-orange-100",
    },
    {
      icon: Users,
      value: eventDetails?.totalGuestCount || 0,
      label: t("total_guests"),
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
      borderColor: "border-green-100",
    },
  ];

  return (
    <div>
      <div className="flex gap-4 mb-4 flex-wrap">
        {stats.map((s: any, i: any) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="p-[2px] rounded-2xl bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_50.48%,#F97316_100%)] flex-1 min-w-[140px]"
            >
              <div className="bg-white rounded-2xl p-5 h-full">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${s.iconBg} mb-3`}
                >
                  <Icon size={18} className={s.iconColor} />
                </div>

                <p className="text-2xl font-medium font-lora text-gray-900 leading-none mb-2">
                  {s.value}
                </p>
                <p className="text-sm text-gray-500 font-manrope">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
