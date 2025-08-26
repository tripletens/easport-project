export const KPICards = ({ league, season, team }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">72%</div>
        <div className="text-sm text-gray-400 mt-1">Avg. Possession</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">2.4</div>
        <div className="text-sm text-gray-400 mt-1">Goals per Game</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">85%</div>
        <div className="text-sm text-gray-400 mt-1">Pass Accuracy</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">14</div>
        <div className="text-sm text-gray-400 mt-1">Wins</div>
      </div>
    </div>
  );
};