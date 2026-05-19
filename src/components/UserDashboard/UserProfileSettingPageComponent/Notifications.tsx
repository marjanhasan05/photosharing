import { Bell } from "lucide-react";
import { useState } from "react";
type ToggleKey = "upload" | "push" | "storage";
export default function Notifications() {
  const [toggles, setToggles] = useState({
    upload: true,
    push: true,
    storage: true,
  });

  const handleToggle = (key: ToggleKey) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  return (
    <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Bell size={20} className="text-[#F97316]" />
        <h2 className="text-xl font-medium font-lora text-gray-900">
          Notifications
        </h2>
      </div>

      {/* Upload Notification */}
      <div className="flex items-center justify-between py-5 border-b border-gray-100">
        <div>
          <h3 className="text-gray-900 font-medium">Upload Notification</h3>
          <p className="text-sm text-gray-600 mt-1">
            Get notified when guest upload photo
          </p>
        </div>
        <button
          onClick={() => handleToggle("upload")}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            toggles.upload ? "bg-purple-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              toggles.upload ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Push Notifications */}
      <div className="flex items-center justify-between py-5 border-b border-gray-100">
        <div>
          <h3 className="text-gray-900 font-medium">Push Notifications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Receive email updates about appointments
          </p>
        </div>
        <button
          onClick={() => handleToggle("push")}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            toggles.push ? "bg-purple-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              toggles.push ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Storage Notification */}
      <div className="flex items-center justify-between py-5">
        <div>
          <h3 className="text-gray-900 font-medium">Storage Notification</h3>
          <p className="text-sm text-gray-600 mt-1">Notified when filled 10B</p>
        </div>
        <button
          onClick={() => handleToggle("storage")}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            toggles.storage ? "bg-purple-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              toggles.storage ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </section>
  );
}
