// import { useChangePasswordMutation } from "@/Redux/features/auth/authApi";
// import { Lock } from "lucide-react";

// export default function Security() {
//     const [changePassword, { isLoading }] = useChangePasswordMutation();
//   return (
//     <section className="bg-white rounded-lg p-6 shadow-sm">
//       <div className="flex items-center gap-2 mb-6">
//         <Lock size={20} className="text-[#F97316]" />
//         <h2 className="text-xl font-medium font-lora text-gray-900">
//           Security
//         </h2>
//       </div>

//       {/* Current Password */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Current Password
//         </label>
//         <input
//           type="password"
//           placeholder="Enter your current password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//         />
//       </div>

//       {/* New Password */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           New Password
//         </label>
//         <input
//           type="password"
//           placeholder="Enter your new password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//         />
//       </div>

//       {/* Confirm New Password */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Confirm New Password
//         </label>
//         <input
//           type="password"
//           placeholder="Confirm your new password"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//         />
//       </div>

//       {/* Save Button */}
//       <button
//         className="px-6 py-2 text-white cursor-pointer font-semibold rounded-full transition hover:opacity-90"
//         style={{
//           background:
//             "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50.48%, #F97316 100%)",
//         }}
//       >
//         Save & Change
//       </button>
//     </section>
//   );
// }

import { useChangePasswordMutation } from "@/Redux/features/auth/authApi";
import { Lock } from "lucide-react";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function Security() {
  const { t } = useTranslation();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error(t("all_fields_required"));
    }

    if (newPassword !== confirmPassword) {
      return toast.error(t("passwords_dont_match"));
    }

    try {
      const res = await changePassword({ oldPassword, newPassword }).unwrap();

      console.log("iam the pass res", res);

      // ✅ use backend message
      toast.success(res?.message || t("password_changed"));

      // reset fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Lock size={20} className="text-[#F97316]" />
        <h2 className="text-xl font-medium font-lora text-gray-900">
          {t("security")}
        </h2>
      </div>

      {/* Current Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("current_password")}
        </label>
        <input
          type="password"
          placeholder={t("enter_password")}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* New Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("new_password")}
        </label>
        <input
          type="password"
          placeholder={t("enter_password")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Confirm New Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("confirm_new_password")}
        </label>
        <input
          type="password"
          placeholder={t("enter_password")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="px-6 py-2 text-white cursor-pointer font-semibold rounded-full transition hover:opacity-90 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50.48%, #F97316 100%)",
        }}
      >
        {isLoading ? <BeatLoader size={8} color="#fff" /> : t("save_change")}
      </button>
    </section>
  );
}
