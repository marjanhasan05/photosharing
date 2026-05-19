import { CheckCircle, Copy, Download, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EventCreateSuccessfullyModal({
  open,
  onClose,
  eventLink = "https://photoshare.app/e/8vpke",
}: {
  open: boolean;
  onClose: () => void;
  eventLink?: string;
}) {
  const { t } = useTranslation();
  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(eventLink);
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-2xl rounded-2xl p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-5">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 flex items-center justify-center mb-3">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {t("event_created_success")}
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            {t("event_live_ready")}
          </p>
        </div>

        {/* Event Link */}
        <div className="border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">{t("event_link")}</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={eventLink}
              className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none border border-gray-200"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white text-sm font-medium px-4 py-2 rounded-lg whitespace-nowrap"
            >
              <Copy className="w-4 h-4" />
              {t("copy")}
            </button>
          </div>
        </div>

        {/* QR Code */}
        <div className="border border-gray-200 rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700 text-center mb-3">
            {t("qr_code")}
          </p>
          <div className="flex flex-col items-center">
            <div className="border border-gray-300 rounded-lg p-2 bg-white mb-2">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${eventLink}`}
                alt="QR Code"
                className="w-28 h-28 object-contain"
              />
            </div>
            <p className="text-xs text-gray-400">{t("qr_code_event")}</p>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            {t("scan_qr_access")}
          </p>
          <div className="flex gap-3 mt-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">
              <Download className="w-4 h-4" />
              {t("download_qr")}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm text-gray-600 hover:bg-gray-50">
              <Share2 className="w-4 h-4" />
              {t("share_link")}
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border border-gray-200 rounded-xl p-4 mb-5">
          <p className="text-sm font-semibold text-gray-700 mb-2">{t("next_steps")}</p>
          <ul className="space-y-1">
            <li className="text-sm text-purple-500">
              • {t("step_share_link")}
            </li>
            <li className="text-sm text-purple-500">
              • {t("step_guests_upload")}
            </li>
            <li className="text-sm text-purple-500">
              • {t("step_monitor_uploads")}
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 text-white font-semibold text-sm">
            {t("manage_event")}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-sm"
          >
            {t("go_to_dashboard")}
          </button>
        </div>
      </div>
    </div>
  );
}
