export default function Loading() {
  return (
    <div className="p-6 animate-pulse">
      {/* Heading shimmer */}
      <div className="flex justify-center mb-8">
        <div className="h-8 w-60 bg-gray-300 rounded-md"></div>
      </div>

      {/* Cards shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl overflow-hidden p-4"
          >
            {/* Image skeleton */}
            <div className="h-40 bg-gray-300 rounded-md mb-4"></div>

            {/* Text skeleton */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
