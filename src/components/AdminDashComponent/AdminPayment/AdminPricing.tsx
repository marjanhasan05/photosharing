import blackImg from "@/assets/black.png";
import redImg from "@/assets/red.png";
import { useGetEventPackagesQuery } from "@/Redux/features/eventPackages/eventPackagesApi";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import EditCustomPlanModal from "../EditCustomPlanModal";
import { useDeleteEventPackageMutation } from "@/Redux/features/adminAllApi/plan/planApi";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

// feature builder from backend
const buildFeatures = (pkg: any, t: any) => {
  return [
    pkg.photoLimit
      ? t("up_to_photos", { count: pkg.photoLimit })
      : t("unlimited_photos"),
    t("days_access", { count: pkg.duration }),
    t("sharing_type", { type: pkg.sharingScope }),
    t("support_type", { type: pkg.supportScope }),
  ];
};

function FeatureItem({ text, active }: { text: string; active?: boolean }) {
  return (
    <li className="flex items-center gap-2 mt-2">
      <img
        src={active ? redImg : blackImg}
        alt="icon"
        className="w-[18px] h-[18px]"
      />
      <span className="text-sm md:text-base font-medium text-[#181A18]">
        {text}
      </span>
    </li>
  );
}

export default function AdminPricing({ selectedPlan, setSelectedPlan }: any) {
  const { t } = useTranslation();
  const [deleteEventPackage] = useDeleteEventPackageMutation();
  const navigate = useNavigate();
  const { data, isLoading: loadingPackages } = useGetEventPackagesQuery();
  const packages = (data as any)?.data?.data || [];
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  const handleEditClick = (pkg: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPackage(pkg);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingPackage(null);
  };

  const handleDelete = (e: any, id: number) => {
    e.stopPropagation();

    Swal.fire({
      target: containerRef.current,
      title: t("delete_package_confirm_title"),
      text: t("delete_package_confirm_text"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: t("delete_package_confirm_button"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEventPackage(id).unwrap();

          Swal.fire({
            target: containerRef.current,
            title: t("deleted_title"),
            text: t("deleted_text"),
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (err) {
          console.log("Delete error:", err);

          Swal.fire({
            target: containerRef.current,
            title: t("error_title"),
            text: t("failed_to_delete_package"),
            icon: "error",
          });
        }
      }
    });
  };

  if (loadingPackages) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <BeatLoader />
      </div>
    );
  }

  return (
    <section ref={containerRef} className="w-full py-8 md:py-[60px]  relative">
      <div className="flex justify-between items-center py-8">
        <h2 className="mb-3 font-lora text-2xl font-medium leading-[120%] text-[#121417] ">
          {t("pricing_packages")}
        </h2>

        <button
          onClick={() => navigate("/dashboard/admin/create-custom-plan")}
          className="flex items-center justify-center gap-2 w-full lg:w-auto bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F97316] text-white text-base lg:text-lg cursor-pointer font-medium px-5 py-3 rounded-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#EC4899]/30 active:scale-[0.98]"
        >
          <Plus size={18} color="white" />
          {t("create_custom_plan")}
        </button>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg: any) => {
            const isActive = selectedPlan?.id === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPlan(pkg)}
                className={`cursor-pointer rounded-[22px] p-[1px] transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
                    : "border border-[#EDEDED]"
                }`}
              >
                <div className="flex flex-col h-full rounded-[20px] bg-gradient-to-b from-[#F5F7F9] to-[#FCFCFD] p-3">
                  {/* top card */}
                  <div
                    className={`rounded-2xl p-[1px] ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
                        : "bg-white border border-[#EDEDED]"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-4 space-y-4 relative">
                      {/* ADMIN ACTION BUTTONS */}
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button
                          onClick={(e) => handleEditClick(pkg, e)}
                          className="p-1.5 cursor-pointer rounded-md bg-gray-100 hover:bg-gray-200 transition"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                           onClick={(e) => handleDelete(e, pkg.id)}
                          className="p-1.5 cursor-pointer rounded-md bg-red-100 hover:bg-red-200 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-bold">{t("plan_with_id", { id: pkg.id })}</h3>

                          {isActive && (
                            <span className="text-xs font-semibold text-pink-500">
                              {t("selected")}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {t("plan_label", { scope: pkg.sharingScope })}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">{pkg.price}</span>
                        <span className="text-sm text-gray-500">
                          {t("currency_sign")}
                        </span>
                      </div>

                      <button
                        className={`w-full py-2 rounded-xl text-white font-semibold transition ${
                          isActive
                            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400"
                            : "bg-purple-500"
                        }`}
                      >
                        {t("select")}
                      </button>
                    </div>
                  </div>

                  {/* divider */}
                  <div className="h-px bg-gray-200 my-4" />

                  {/* features */}
                  <ul className="flex flex-col gap-2">
                    {buildFeatures(pkg, t).map((f, i) => (
                      <FeatureItem key={i} text={f} active={isActive} />
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Modal */}
      {showEditModal && editingPackage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-2xl">
          <EditCustomPlanModal
            packageData={editingPackage}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </section>
  );
}
