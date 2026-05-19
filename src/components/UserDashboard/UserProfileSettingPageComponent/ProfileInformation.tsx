// import { selectCurrentUser } from "@/Redux/features/auth/authSlice";
// import { useAppSelector } from "@/Redux/hooks";
// import { User, Camera } from "lucide-react";

// export default function ProfileInformation() {
//     const user = useAppSelector(selectCurrentUser);
//     console.log("iam the user from profile", user);
//   return (
//     <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
//       <div className="flex items-center gap-2 mb-6">
//         <User size={20} className="text-[#F97316]" />
//         <h2 className="text-xl font-medium font-lora text-gray-900">
//           Profile Information
//         </h2>
//       </div>

//       {/* Profile Photo Section */}
//       <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
//         <div className="flex items-center gap-4">
//           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <button
//               className=" text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition"
//               style={{
//                 background:
//                   "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50.48%, #F97316 100%)",
//               }}
//             >
//               <Camera size={14} />
//               Change Photo
//             </button>
//             <p className="text-base text-gray-600 mt-4">
//               {" "}
//               JPG, PNG or GIF Max size 5MB
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         {/* Full Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Full name
//           </label>
//           <input
//             type="text"
//             placeholder="Dr. Thompson"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             defaultValue="Dr. Thompson"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="dr.thompson@therapyhub.com"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             defaultValue="dr.thompson@therapyhub.com"
//           />
//         </div>
//       </div>

//       {/* Phone */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Phone
//         </label>
//         <input
//           type="tel"
//           placeholder="(555) 123-4567"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           defaultValue="(555) 123-4567"
//         />
//       </div>

//       {/* Save Button */}
//       <button
//         className="px-6 py-2 cursor-pointer text-white font-semibold rounded-full transition hover:opacity-90"
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

import { useGetMeQuery } from "@/Redux/features/auth/authApi";
import {
  useUpdateUserProfileMutation,
  useUpdateUserAvatarMutation,
} from "@/Redux/features/userDashboard/userDashboardApi";

import { User, Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function ProfileInformation() {
  const { t } = useTranslation();
  const { data, refetch } = useGetMeQuery({
    refetchOnMountOrArgChange: true,
  });

  const user = data?.data;

  console.log("user profile data", user);

  // ✅ states (now properly sync with API data)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const email = user?.email || "";

  const fileRef = useRef<HTMLInputElement | null>(null);

  // ✅ FIXED: correct mutations
  const [updateUserProfile, { isLoading }] =
    useUpdateUserProfileMutation();

  const [updateUserAvatar] = useUpdateUserAvatarMutation();

  // ✅ sync API data → state
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  // ===============================
  // PROFILE UPDATE
  // ===============================
  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile({
        name,
        phone,
        email, // backend requires it (read-only)
      }).unwrap();

      toast.success(t("profile_updated"));
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || t("login_failed"));
    }
  };

  // ===============================
  // AVATAR UPDATE
  // ===============================
  const handleAvatarChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await updateUserAvatar(formData).unwrap();

      toast.success(t("avatar_updated"));
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || t("login_failed"));
    }
  };

  return (
    <section className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <User size={20} className="text-[#F97316]" />
        <h2 className="text-xl font-medium font-lora text-gray-900">
          {t("profile_information")}
        </h2>
      </div>

      {/* AVATAR SECTION */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden">
            <img
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <input
              type="file"
              ref={fileRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />

            <button
              onClick={() => fileRef.current?.click()}
              className="text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-1 transition"
              style={{
                background:
                  "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50.48%, #F97316 100%)",
              }}
            >
              <Camera size={14} />
              {t("change_photo")}
            </button>

            <p className="text-base text-gray-600 mt-4">
              {t("file_upload_limit")}
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("full_name")}
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* EMAIL (READ ONLY) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("email")}
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
            value={email}
            readOnly
          />
        </div>
      </div>

      {/* PHONE */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("phone")}
        </label>
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* SAVE */}
      <button
        onClick={handleUpdateProfile}
        disabled={isLoading}
        className="px-6 py-2 cursor-pointer text-white font-semibold rounded-full transition hover:opacity-90 disabled:opacity-60"
        style={{
          background:
            "linear-gradient(90deg, #8B5CF6 0%, #EC4899 50.48%, #F97316 100%)",
        }}
      >
        {isLoading ? t("loading") : t("save_change")}
      </button>
    </section>
  );
}