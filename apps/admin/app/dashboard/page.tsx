export default function AdminDashboardPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#272848" }}
    >
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 shadow-lg"
          style={{ background: "linear-gradient(135deg, #6D71F9, #54C1FB)" }}
        >
          <span className="text-white font-bold text-2xl">X</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Xpersive Labs — Admin
        </h1>
        <p className="text-white/50 text-sm">Admin panel under construction.</p>
      </div>
    </div>
  );
}
