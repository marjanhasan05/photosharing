export default function InvoiceModal({ data, onClose }: any) {
  if (!data) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="w-[95%] max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Invoice Details
            </h2>
            <p className="text-sm text-blue-600 mt-1">{data.invoice}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Event Name */}
          <div>
            <p className="text-gray-500 mb-1">Event Name</p>
            <div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700">
              {data.eventName}
            </div>
          </div>

          {/* Date */}
          <div>
            <p className="text-gray-500 mb-1">Date</p>
            <div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700">
              {data.createDate}
            </div>
          </div>

          {/* Plan */}
          <div>
            <p className="text-gray-500 mb-1">Plan</p>
            <div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700">
              {data.plan || "Plus (most popular)"}
            </div>
          </div>

          {/* Amount */}
          <div>
            <p className="text-gray-500 mb-1">Amount</p>
            <div className="bg-gray-100 rounded-lg px-4 py-3 text-gray-700">
              {data.amount}
            </div>
          </div>

          {/* Status (full width) */}
          <div className="md:col-span-2">
            <p className="text-gray-500 mb-1">Status</p>
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <span className="text-green-600 font-medium">
                {data.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}