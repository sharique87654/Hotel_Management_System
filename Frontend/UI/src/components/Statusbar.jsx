import { useRooms } from "../Context/RoomContext";

export const Statusbar = () => {
  const { basicCount, luxuryCount, totalCount, loading } = useRooms();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="py-20 mx-auto w-100 bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800 text-white shadow-2xl mt-0">
      <hr className="border-none h-[3px] w-3/4 mx-auto bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-lg" />

      <div className="grid gap-10 sm:grid-cols-3 mt-12 text-center">
        <div>
          <h6 className="text-6xl font-extrabold text-amber-400">{basicCount}</h6>
          <p className="mt-3 text-lg font-bold">Basic Rooms</p>
        </div>
        <div>
          <h6 className="text-6xl font-extrabold text-amber-400">{luxuryCount}</h6>
          <p className="mt-3 text-lg font-bold">Luxury Rooms</p>
        </div>
        <div>
          <h6 className="text-6xl font-extrabold text-amber-400">{totalCount}</h6>
          <p className="mt-3 text-lg font-bold">Total Rooms</p>
        </div>
      </div>

      <hr className="border-none h-[3px] w-3/4 mx-auto mt-12 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-lg" />
    </div>
  );
};
