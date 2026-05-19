import logo from "@/assets/logoN.svg";
export default function GustLandingPage() {
  const eventLink = "https://photoshare.app/e/8vpke";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="border bg-white border-gray-200 rounded-xl p-6 max-w-lg w-full">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="h-20 w-20 overflow-hidden flex items-center justify-center ">
            <img
              src={logo}
              alt=""
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <h2 className="text-[#121417] font-lora text-xl font-medium mt-1">
            Scan to upload your photos
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="border border-[#E5E7EB] rounded-lg p-6 bg-[#F3F4F6] mb-2">
            <div className="p-3 border-2 border-black rounded-2xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${eventLink}`}
                alt="QR Code"
                className="w-36 h-40 object-contain"
              />
            </div>
            <p className="text-base font-manrope text-center text-gray-900">
              QR Code for Event
            </p>
          </div>
        </div>

        <p className="text-[#8B5CF6] text-center font-lora text-[20px] italic mt-3">
          Share your moments instantly
        </p>
      </div>
    </div>
  );
}
