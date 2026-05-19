import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, XCircle, X } from "lucide-react";
import { useGetAllUsersByAdminQuery } from "@/Redux/features/adminAllApi/adminUserManagement/adminUserManagementApi";
import { toast } from "sonner";
import { useUpdateEventPackageMutation } from "@/Redux/features/adminAllApi/plan/planApi";
import { useTranslation } from "react-i18next";

const DURATION_OPTIONS = ["20 days", "30 days", "60 days", "90 days"];
const CURRENCY_OPTIONS = ["PLN"];
const SHARING_SCOPES = ["BASIC", "ADVANCE", "PREMIUM"];
const SUPPORT_SCOPES = ["STANDARD", "PRIORITY", "VIP"];

interface Props {
  packageData: any;               // the full package object from the API
  onClose: () => void;
           // the RTK mutation trigger
}

export default function EditCustomPlanModal({ packageData, onClose,}: Props) {
     const { t } = useTranslation();
     const [updateEventPackage] = useUpdateEventPackageMutation(); 
  const { data, isLoading: usersLoading } = useGetAllUsersByAdminQuery({});
  const usersData = useMemo(() => data?.data?.data || [], [data]);

  // Prefill form from packageData
  const [form, setForm] = useState({
    name: packageData.name || "",
    description: packageData.description || "",
    photoLimit: packageData.photoLimit?.toString() || "",
    duration: `${packageData.duration} days` ,
    price: packageData.price?.toString() || "",
    priceCurrency: packageData.priceCurrency || "PLN",
    sharingScope: packageData.sharingScope || "BASIC",
    supportScope: packageData.supportScope || "STANDARD",
    anySpecial: packageData.anySpecial || "",
    isCustom: packageData.isCustom ?? true,
  });

  // Pre‑selected users (allowedUserIds from the package)
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  // Populate selected users once usersData is available
  useEffect(() => {
    if (usersData.length > 0 && packageData.allowedUserIds) {
      const initialSelected = usersData.filter((u: any) =>
        packageData.allowedUserIds.includes(u.id)
      );
      setSelectedUsers(initialSelected);
    }
  }, [usersData, packageData.allowedUserIds]);

  const filteredUsers = usersData.filter(
    (u: any) =>
      (u.userName.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase())) &&
      !selectedUsers.find((s: any) => s.id === u.id)
  );

  const removeUser = (id: any) =>
    setSelectedUsers((prev) => prev.filter((u: any) => u.id !== id));

  const addUser = (user: any) => {
    setSelectedUsers((prev) => [...prev, user]);
    setUserSearch("");
    setShowDropdown(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setUpdating(true);
    try {
      const durationDays = parseInt(form.duration);
      const payload = {
        name: form.name,
        description: form.description,
        photoLimit: parseInt(form.photoLimit),
        duration: durationDays,
        price: parseFloat(form.price),
        priceCurrency: form.priceCurrency,
        sharingScope: form.sharingScope,
        supportScope: form.supportScope,
        isCustom: form.isCustom,
        allowedUserIds: selectedUsers.map((u: any) => u.id),
        ...(form.anySpecial && { anySpecial: form.anySpecial }),
      };

     const res = await updateEventPackage({ id: packageData.id, ...payload }).unwrap();
     console.log(" updated res",res)
      toast.success(t("plan_updated_success")); // Note: I should add this key too, or use generic
      onClose();
    } catch (err: any) {
      const message = err?.data?.message || err?.message || t("update_failed");
      toast.error(message);
      setError(message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-1">{t("edit_plan")}</h2>
        <p className="text-gray-400 text-sm mb-6">{t("update_plan_details")}</p>

        {/* Plan name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("plan_name")}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("plan_description")}</label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
        </div>

        {/* Photo limit + Duration */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("uploaded_photo_limit")} <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="photoLimit"
              value={form.photoLimit}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("storage_expiration_limit")} <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              >
                {DURATION_OPTIONS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Price + Any special */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("price_per_event")} <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="priceCurrency"
                value={form.priceCurrency}
                onChange={handleChange}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("add_any_special")}</label>
            <input
              type="text"
              name="anySpecial"
              value={form.anySpecial}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>
        </div>

        {/* Sharing + Support scope */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("sharing_scope")}</label>
            <div className="relative">
              <select
                name="sharingScope"
                value={form.sharingScope}
                onChange={handleChange}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              >
                {SHARING_SCOPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("support_scope")}</label>
            <div className="relative">
              <select
                name="supportScope"
                value={form.supportScope}
                onChange={handleChange}
                className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              >
                {SUPPORT_SCOPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Select user */}
        <div className="mb-5 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("select_user")}</label>
          <div className="relative">
            <input
              type="text"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              placeholder={t("search_user_placeholder")}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {showDropdown && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {usersLoading ? (
                <div className="px-4 py-3 text-sm text-gray-400">{t("loading_users")}</div>
              ) : filteredUsers.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400">{t("no_users_found")}</div>
              ) : (
                filteredUsers.map((u: any) => (
                  <button
                    key={u.id}
                    onMouseDown={() => addUser(u)}
                    className="w-full text-left px-4 py-2.5 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{u.userName}</p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          u.status === "ACTIVE" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-400"
                        }`}
                      >
                        {u.status}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Selected user tags */}
        {selectedUsers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedUsers.map((u: any) => (
              <span
                key={u.id}
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full pl-3 pr-2 py-1 text-sm text-gray-700"
              >
                {u.userName}
                <button
                  onClick={() => removeUser(u.id)}
                  className="text-red-400 hover:text-red-600 transition-colors flex items-center"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Error */}
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={updating}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-opacity disabled:opacity-70"
          style={{ background: "linear-gradient(90deg, #9b59b6 0%, #e67e22 100%)" }}
        >
          {updating ? t("updating") : t("update_plan")}
        </button>
      </div>
    </div>
  );
}