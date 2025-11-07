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
    console.log("🏨 Viewing room details:", { roomId, roomName });
    navigate("/rooms/roomsBooking", {
      state: { roomId, roomName, description, roomType, price, noOfBed, image },
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 hover:border-blue-400 transition-all duration-300 group">
      {/* Room Image */}
      <div className="relative overflow-hidden">
        <img
          className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={
            image ||
            "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1973&auto=format&fit=crop"
          }
          alt={roomName}
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          ₹{price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
            {roomType}
          </span>
          <span className="text-slate-400 text-sm">🛏 {noOfBed} Beds</span>
        </div>

        <h5 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {roomName}
        </h5>

        <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Button */}
        <button
          onClick={handleMoreDetailClick}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
        >
          View Details
          <svg
            className="w-5 h-5"
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

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
}
