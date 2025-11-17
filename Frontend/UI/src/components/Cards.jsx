import { useNavigate } from "react-router-dom";

export default function Cards({
  roomId,
  image,
  roomName,
  description,
  roomType,
  price,
  noOfBed,
}) {
  const navigate = useNavigate();

  const handleMoreDetailClick = () => {
    navigate("/rooms/roomsBooking", {
      state: { roomId, roomName, description, roomType, price, noOfBed, image },
    });
  };

  return (
    <div
      className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden 
    transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 
    transition-all duration-300 group"
    >
      {/* Smaller Room Image */}
      <div className="relative overflow-hidden h-44">
        <img
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={
            image ||
            "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
          }
          alt={roomName}
        />
        {/* Price Badge */}
        <div
          className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-500 
        text-white px-4 py-1.5 rounded-full font-bold shadow-lg text-sm"
        >
          ₹{price.toLocaleString()}
        </div>
        {/* Overlay on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent 
        to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Room Type & Beds */}
        <div className="flex justify-between items-center mb-3">
          <span
            className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs 
          font-semibold uppercase tracking-wide border border-blue-500/30"
          >
            {roomType}
          </span>
          <span className="text-gray-400 text-sm flex items-center gap-1">
            <span>🛏️</span> {noOfBed} {noOfBed === 1 ? "Bed" : "Beds"}
          </span>
        </div>

        {/* Room Name */}
        <h5
          className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 
        transition-colors duration-200 line-clamp-1"
        >
          {roomName}
        </h5>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-5 leading-relaxed min-h-[2.5rem]">
          {description}
        </p>

        {/* View Details Button */}
        <button
          onClick={handleMoreDetailClick}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 
          hover:to-blue-600 text-white font-semibold py-2.5 rounded-xl transition-all 
          shadow-md hover:shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 
          text-sm group-hover:gap-3"
        >
          View Details
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent 
      via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>
    </div>
  );
}
