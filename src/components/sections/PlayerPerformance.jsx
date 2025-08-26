export default function PlayerPerformance({ selectedLeague, selectedSeason, selectedTeam }) {
  if (!selectedTeam) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-center">Please select a team to view player data.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">
        Player Performance - {selectedTeam}
      </h3>
      <div className="h-96 bg-gray-900/30 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">Player stats leaderboard and scatter plots will appear here</span>
      </div>
    </div>
  );
}