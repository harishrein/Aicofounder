export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="widget">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
          <p className="text-gray-600">Daily business overview coming soon...</p>
        </div>
        <div className="widget">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Cash Flow</h3>
          <p className="text-gray-600">Financial metrics coming soon...</p>
        </div>
        <div className="widget">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Leads</h3>
          <p className="text-gray-600">Sales pipeline coming soon...</p>
        </div>
        <div className="widget">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Projects</h3>
          <p className="text-gray-600">Active projects coming soon...</p>
        </div>
      </div>
    </div>
  );
}