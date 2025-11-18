export default function DashboardCard({ title, value, color, icon, textColor }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden 
    hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-center justify-between">
          {/* Left: Stats Info */}
          <div className="flex-1">
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wide mb-2">
              {title}
            </p>
            <p className={`text-4xl font-bold ${textColor || 'text-white'} group-hover:scale-110 
            transition-transform duration-300`}>
              {value}
            </p>
          </div>

          {/* Right: Icon */}
          <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center 
          shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
            <span className="text-3xl">{icon || "📊"}</span>
          </div>
        </div>

        {/* Bottom Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Active</span>
            <span className={`font-semibold ${textColor || 'text-gray-400'}`}>
              {value > 0 ? '100%' : '0%'}
            </span>
          </div>
          <div className="mt-2 bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full ${color} transition-all duration-500`}
              style={{ width: value > 0 ? '100%' : '0%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
