import EquipmentPage from "./components/EquipmentPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center gap-4">
          <div className="bg-white rounded-full p-2 shadow">
            <span className="text-2xl">⚙️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Equipment Management System
            </h1>
            <p className="text-slate-300 text-sm">
              Manage equipment and maintenance lifecycle
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <EquipmentPage />
      </div>
    </div>
  );
}

export default App;