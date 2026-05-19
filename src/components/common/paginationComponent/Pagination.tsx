// export default function Pagination({
//   currentPage = 1,
//   totalPages = 3,
//   totalItems = 48,
//   itemsPerPage = 10,
//   onPageChange,
// }: any) {
//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="flex items-center justify-between mt-4">
//       {/* Info */}
//       <div className="text-sm text-gray-600">
//         Showing {startItem} to {endItem} of {totalItems} events
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => onPageChange?.(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
//         >
//           Previous
//         </button>

//         {pages.map((page) => (
//           <button
//             key={page}
//             onClick={() => onPageChange?.(page)}
//             className={`px-3 py-2 text-sm border rounded ${
//               currentPage === page
//                 ? "border-orange-500 bg-orange-500 text-white"
//                 : "border-gray-300 hover:bg-gray-50"
//             }`}
//           >
//             {page}
//           </button>
//         ))}

//         <button
//           onClick={() => onPageChange?.(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
}: any) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange?.(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange?.(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Info */}
      <div className="text-sm text-gray-600">
        Showing {totalItems === 0 ? 0 : startItem} to {endItem} of {totalItems} events
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm border cursor-pointer border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`px-3 py-2 text-sm border rounded cursor-pointer ${
              currentPage === page
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm border cursor-pointer border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}