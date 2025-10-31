export default function DashboardCard({ title, value, color }) {
  return (
    <div className={`rounded-xl shadow-md p-6 text-white ${color}`}>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
