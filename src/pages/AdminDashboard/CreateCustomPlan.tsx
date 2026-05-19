// import { useState } from "react";
// import { ArrowLeft, ChevronDown, XCircle } from "lucide-react";
// import { useGetAllUsersByAdminQuery } from "@/Redux/features/adminAllApi/adminUserManagement/adminUserManagementApi";

// const DURATION_OPTIONS = [
//   "10 days",
//   "20 days",
//   "30 days",
//   "60 days",
//   "90 days",
// ];
// const CURRENCY_OPTIONS = ["PLN", "USD", "EUR"];
// const SHARING_SCOPES = ["BASIC", "STANDARD", "PREMIUM"];
// const SUPPORT_SCOPES = ["STANDARD", "PRIORITY", "VIP"];

// const MOCK_USERS = [
//   { id: 1, name: "Take Wing" },
//   { id: 2, name: "Sapphire Stars Design" },
//   { id: 3, name: "Leather Club Chair" },
//   { id: 4, name: "Aurora Events" },
//   { id: 5, name: "Blue Horizon" },
// ];

// export default function CreateCustomPlan() {
//   const { data, isLoading, refetch } = useGetAllUsersByAdminQuery({});

//   const usersData = data?.data?.data || [];
//   console.log(usersData)

//   const [form, setForm] = useState({
//     name: "Custom Plan",
//     photoLimit: "1000",
//     duration: "20 days",
//     price: "169",
//     priceCurrency: "PLN",
//     sharingScope: "BASIC",
//     supportScope: "STANDARD",
//     anySpecial: "",
//     isCustom: true,
//   });

//   const [selectedUsers, setSelectedUsers] = useState([
//     { id: 1, name: "Take Wing" },
//     { id: 2, name: "Sapphire Stars Design" },
//     { id: 3, name: "Leather Club Chair" },
//   ]);

//   const [userSearch, setUserSearch] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const filteredUsers = MOCK_USERS.filter(
//     (u) =>
//       u.name.toLowerCase().includes(userSearch.toLowerCase()) &&
//       !selectedUsers.find((s) => s.id === u.id),
//   );

//   const removeUser = (id) =>
//     setSelectedUsers((prev) => prev.filter((u) => u.id !== id));

//   const addUser = (user) => {
//     setSelectedUsers((prev) => [...prev, user]);
//     setUserSearch("");
//     setShowDropdown(false);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const durationDays = parseInt(form.duration);
//       const payload = {
//         name: form.name,
//         description: form.anySpecial || undefined,
//         photoLimit: parseInt(form.photoLimit),
//         duration: durationDays,
//         price: parseFloat(form.price),
//         priceCurrency: form.priceCurrency,
//         sharingScope: form.sharingScope,
//         supportScope: form.supportScope,
//         isCustom: form.isCustom,
//         allowedUserIds: selectedUsers.map((u) => u.id),
//         anySpecial: form.anySpecial || undefined,
//       };

//       const res = await fetch("/api/v1/admin/event-packages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to create plan");
//       setSuccess(true);
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen ">
//       <button className="flex items-center gap-1.5 text-gray-500 text-sm mb-6 hover:text-gray-700 transition-colors">
//         <ArrowLeft className="w-4 h-4" />
//         Go back
//       </button>
//       <div className="bg-white rounded-2xl shadow-sm p-8 w-full ">
//         {/* Back */}

//         {/* Header */}
//         <h1 className="text-2xl font-lora font-semibold text-gray-900">
//           Create Custom Plan
//         </h1>
//         <p className="text-gray-400 text-base mt-1 mb-6">
//           Enter your custom plan details
//         </p>

//         {/* Plan name */}
//         <div className="mb-5">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Plan name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Custom Plan"
//             className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//           />
//         </div>

//         {/* Photo limit + Duration */}
//         <div className="grid grid-cols-2 gap-4 mb-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Uploaded photo limit <span className="text-red-400">*</span>
//             </label>
//             <input
//               type="number"
//               name="photoLimit"
//               value={form.photoLimit}
//               onChange={handleChange}
//               placeholder="1000"
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Cloud storage expiration limit{" "}
//               <span className="text-red-400">*</span>
//             </label>
//             <div className="relative">
//               <select
//                 name="duration"
//                 value={form.duration}
//                 onChange={handleChange}
//                 className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//               >
//                 {DURATION_OPTIONS.map((d) => (
//                   <option key={d}>{d}</option>
//                 ))}
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Price + Any special */}
//         <div className="grid grid-cols-2 gap-4 mb-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Price per event <span className="text-red-400">*</span>
//             </label>
//             <div className="flex gap-2">
//               <select
//                 name="priceCurrency"
//                 value={form.priceCurrency}
//                 onChange={handleChange}
//                 className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//               >
//                 {CURRENCY_OPTIONS.map((c) => (
//                   <option key={c}>{c}</option>
//                 ))}
//               </select>
//               <input
//                 type="number"
//                 name="price"
//                 value={form.price}
//                 onChange={handleChange}
//                 placeholder="169"
//                 className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//               />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Add any special
//             </label>
//             <input
//               type="text"
//               name="anySpecial"
//               value={form.anySpecial}
//               onChange={handleChange}
//               placeholder="Priority support"
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//             />
//           </div>
//         </div>

//         {/* Sharing + Support scope */}
//         <div className="grid grid-cols-2 gap-4 mb-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Sharing scope
//             </label>
//             <div className="relative">
//               <select
//                 name="sharingScope"
//                 value={form.sharingScope}
//                 onChange={handleChange}
//                 className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//               >
//                 {SHARING_SCOPES.map((s) => (
//                   <option key={s}>{s}</option>
//                 ))}
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Support scope
//             </label>
//             <div className="relative">
//               <select
//                 name="supportScope"
//                 value={form.supportScope}
//                 onChange={handleChange}
//                 className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//               >
//                 {SUPPORT_SCOPES.map((s) => (
//                   <option key={s}>{s}</option>
//                 ))}
//               </select>
//               <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//         </div>

//         {/* Select user */}
//         <div className="mb-5 relative">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select user
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               value={userSearch}
//               onChange={(e) => {
//                 setUserSearch(e.target.value);
//                 setShowDropdown(true);
//               }}
//               onFocus={() => setShowDropdown(true)}
//               onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
//               placeholder="Search user for this custom plan"
//               className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
//             />
//             <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//           </div>
//           {showDropdown && filteredUsers.length > 0 && (
//             <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
//               {filteredUsers.map((u) => (
//                 <button
//                   key={u.id}
//                   onMouseDown={() => addUser(u)}
//                   className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 transition-colors"
//                 >
//                   {u.name}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Selected user tags */}
//         {selectedUsers.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-6">
//             {selectedUsers.map((u) => (
//               <span
//                 key={u.id}
//                 className="inline-flex items-center gap-1.5 bg-white border border-gray-200 rounded-full pl-3 pr-2 py-1 text-sm text-gray-700"
//               >
//                 {u.name}
//                 <button
//                   onClick={() => removeUser(u.id)}
//                   className="text-red-400 hover:text-red-600 transition-colors flex items-center"
//                 >
//                   <XCircle className="w-4 h-4" />
//                 </button>
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Error / Success */}
//         {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
//         {success && (
//           <p className="text-sm text-green-600 mb-4">
//             Custom plan created successfully!
//           </p>
//         )}

//         {/* Submit button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-opacity disabled:opacity-70"
//           style={{
//             background: "linear-gradient(90deg, #9b59b6 0%, #e67e22 100%)",
//           }}
//         >
//           {loading ? "Creating..." : "Add custom plan"}
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { ArrowLeft, ChevronDown, XCircle } from "lucide-react";
import { useGetAllUsersByAdminQuery } from "@/Redux/features/adminAllApi/adminUserManagement/adminUserManagementApi";
import { useCreateEventPackageMutation } from "@/Redux/features/adminAllApi/plan/planApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const DURATION_OPTIONS = ["20 days", "30 days", "60 days", "90 days"];
const CURRENCY_OPTIONS = ["PLN"];
const SHARING_SCOPES = ["BASIC", "ADVANCE", "PREMIUM"]; // BASIC, ADVANCE, PREMIUM
const SUPPORT_SCOPES = ["STANDARD", "PRIORITY", "VIP"];

export default function CreateCustomPlan() {
    const navigate = useNavigate();
  const [createEventPackage, { isLoading: creating }] =
    useCreateEventPackageMutation();

  const { data, isLoading } = useGetAllUsersByAdminQuery({});
  const usersData = data?.data?.data || [];

  const [form, setForm] = useState({
    name: "",
    description: "",
    photoLimit: "",
    duration: "",
    price: "",
    priceCurrency: "PLN",
    sharingScope: "BASIC",
    supportScope: "STANDARD",
    anySpecial: "",
    isCustom: true,
  });

const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const filteredUsers = usersData.filter(
    (u: any) =>
      (u.userName.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase())) &&
      !selectedUsers.find((s: any) => s.id === u.id),
  );

  const removeUser = (id: any) =>
    setSelectedUsers((prev) => prev.filter((u: any) => u.id !== id));

const addUser = (user: any) => {
  setSelectedUsers((prev: any[]) => [...prev, user]);
  setUserSearch("");
  setShowDropdown(false);
};
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
   

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

      const res = await createEventPackage(payload).unwrap();

      console.log("API Response:", res);

      //  Success toast from backend response
      toast.success(res?.message || "Plan created successfully");

      setSuccess(true);
    } catch (err: any) {
      console.log("Error:", err);

      //  Try backend error message first
      const errorMessage =
        err?.data?.message || err?.message || "Something went wrong";

      toast.error(errorMessage);

      setError(errorMessage);
    } finally {
      //   setSubmitLoading(false);
    }
  };
  return (
    <div className="min-h-screen">
          {/* Back */}
        <button
          onClick={() => navigate(-1)}
         className="flex curssor-pointer items-center gap-1.5 text-gray-500 text-base mb-6 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Go back
        </button>
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full ">
      

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Custom Plan
        </h1>
        <p className="text-gray-400 text-sm mt-1 mb-6">
          Enter your custom plan details
        </p>

        {/* Plan name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Custom Plan"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan Description
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter plan description"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          />
        </div>
        {/* Photo limit + Duration */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Uploaded photo limit <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              name="photoLimit"
              value={form.photoLimit}
              onChange={handleChange}
              placeholder="1000"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cloud storage expiration limit{" "}
              <span className="text-red-400">*</span>
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
              Price per event <span className="text-red-400">*</span>
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
                placeholder="169"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add any special
            </label>
            <input
              type="text"
              name="anySpecial"
              value={form.anySpecial}
              onChange={handleChange}
              placeholder="Priority support"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
          </div>
        </div>

        {/* Sharing + Support scope */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sharing scope
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Support scope
            </label>
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

        {/* Select user — from backend */}
        <div className="mb-5 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select user
          </label>
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
              placeholder="Search user for this custom plan"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
            />
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              {isLoading ? (
                <div className="px-4 py-3 text-sm text-gray-400">
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-400">
                  No users found
                </div>
              ) : (
                filteredUsers.map((u: any) => (
                  <button
                    key={u.id}
                    onMouseDown={() => addUser(u)}
                    className="w-full text-left px-4 py-2.5 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {u.userName}
                        </p>
                        <p className="text-xs text-gray-400">{u.email}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          u.status === "ACTIVE"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-400"
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
            {selectedUsers.map((u:any) => (
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

        {/* Error / Success */}
        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-sm text-green-600 mb-4">
            Custom plan created successfully!
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={creating}
          className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-opacity disabled:opacity-70"
          style={{
            background: "linear-gradient(90deg, #9b59b6 0%, #e67e22 100%)",
          }}
        >
          {creating ? "Creating..." : "Add custom plan"}
        </button>
      </div>
    </div>
  );
}
