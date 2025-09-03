const PerformanceTrendChart = ({ data, team, season }) => {
  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Performance Trends</h3>
      <div className="h-64 bg-gray-900/30 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">
          Performance trend chart will be implemented here for {team} in {season}
        </span>
      </div>
    </div>
  );
};

export default PerformanceTrendChart;