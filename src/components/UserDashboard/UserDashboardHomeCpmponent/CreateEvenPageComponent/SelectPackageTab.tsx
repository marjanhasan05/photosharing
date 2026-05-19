import blackImg from "@/assets/black.png";
import redImg from "@/assets/red.png";
import { useGetEventPackagesQuery } from "@/Redux/features/eventPackages/eventPackagesApi";
import { BeatLoader } from "react-spinners";
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

export default function SelectPackageTab({
  selectedPlan,
  setSelectedPlan,
  onSubmit,
  isLoading,
}: any) {
  const { t } = useTranslation();
  const { data, isLoading: loadingPackages } = useGetEventPackagesQuery();
  console.log(" iam the packeg data",data)

  // const packages = Object.values((data as any)?.data || {});
  const packages = (data as any)?.data?.data || [];


  if (loadingPackages) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <BeatLoader />
      </div>
    );
  }

  return (
    <section className="w-full py-8 md:py-[60px] px-4">
      <div className="mx-auto w-full max-w-[1240px]">

        {/* Cards */}
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
                    <div className="bg-white rounded-2xl p-4 space-y-4">

                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-bold">
                            {t("plan")} {pkg.id}
                          </h3>

                          {isActive && (
                            <span className="text-xs font-semibold text-pink-500">
                              {t("selected")}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {pkg.sharingScope} {t("event")}
                        </p>
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">
                          {pkg.price}
                        </span>
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

        {/* submit (UNCHANGED UI) */}
        <div className="mt-10">
          <button
            disabled={!selectedPlan || isLoading}
            onClick={onSubmit}
            className="w-full py-3 rounded-full text-white text-sm font-medium bg-gradient-to-r from-purple-500 via-pink-400 to-orange-400 disabled:opacity-50"
          >
            {t("submit")}
          </button>
        </div>

      </div>
    </section>
  );
}