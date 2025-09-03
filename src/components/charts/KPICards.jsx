const KPICards = ({ data, team, season }) => {
  // we will extract data from API response
  const stats = data?.response;
  
  // we will calculate values or use defaults
  const goalsScored = stats?.goals?.for?.total?.total || 0;
  const goalsConceded = stats?.goals?.against?.total?.total || 0;
  const wins = stats?.fixtures?.wins?.total || 0;
  const draws = stats?.fixtures?.draws?.total || 0;
  const losses = stats?.fixtures?.loses?.total || 0;
  const cleanSheets = stats?.clean_sheet?.total || 0;
  const goalDifference = goalsScored - goalsConceded;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">{goalsScored}</div>
        <div className="text-sm text-gray-400 mt-1">Goals Scored</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">{wins}</div>
        <div className="text-sm text-gray-400 mt-1">Wins</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">{cleanSheets}</div>
        <div className="text-sm text-gray-400 mt-1">Clean Sheets</div>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
        <div className="text-2xl font-bold text-cyan-400">{goalDifference > 0 ? '+' : ''}{goalDifference}</div>
        <div className="text-sm text-gray-400 mt-1">Goal Difference</div>
      </div>
    </div>
  );
};

export default KPICards;