// import Notifications from "@/components/UserDashboard/UserProfileSettingPageComponent/Notifications";
import ProfileInformation from "@/components/UserDashboard/UserProfileSettingPageComponent/ProfileInformation";
import Security from "@/components/UserDashboard/UserProfileSettingPageComponent/Security";

export default function UserProfileSetting() {
  return (
    <div>
      <div className="bg-[#F5F9FA]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium font-lora text-gray-900">
            Setting & Profile
          </h1>
          <p className="text-gray-600 mt-2 text-base font-manrope">
            View and edit your profile
          </p>
        </div>

        {/* Profile Information Section */}
        <ProfileInformation />

        {/* Notifications Section */}
        {/* <Notifications /> */}

        {/* Security Section */}
        <Security />
      </div>
    </div>
  );
}
