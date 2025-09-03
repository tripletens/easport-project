import { useStandings } from '../../hooks/useStandings';
import { PREMIER_LEAGUE_CLUBS } from '../../config/premierLeagueClubs';

const PremierLeagueStandings = ({ season }) => {
  const { data, loading, error } = useStandings(season);

  if (loading) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="text-red-400">Error loading standings: {error}</div>
        <p className="text-gray-400 mt-2">Using mock data for demonstration purposes.</p>
      </div>
    );
  }

  // we will extract the standings data from the API response
  const leagueStandings = data?.response?.[0]?.league?.standings?.[0] || [];

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Premier League Standings {season}</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-sm text-gray-400 pb-2">Pos</th>
              <th className="text-left text-sm text-gray-400 pb-2">Team</th>
              <th className="text-left text-sm text-gray-400 pb-2">Played</th>
              <th className="text-left text-sm text-gray-400 pb-2">Won</th>
              <th className="text-left text-sm text-gray-400 pb-2">Drawn</th>
              <th className="text-left text-sm text-gray-400 pb-2">Lost</th>
              <th className="text-left text-sm text-gray-400 pb-2">GF</th>
              <th className="text-left text-sm text-gray-400 pb-2">GA</th>
              <th className="text-left text-sm text-gray-400 pb-2">GD</th>
              <th className="text-left text-sm text-gray-400 pb-2">Points</th>
              <th className="text-left text-sm text-gray-400 pb-2">Form</th>
            </tr>
          </thead>
          <tbody>
            {leagueStandings.map((team) => {
              const isOurClub = PREMIER_LEAGUE_CLUBS.CLUBS.some(club => club.id === team.team.id);
              return (
                <tr 
                  key={team.team.id} 
                  className={`border-b border-gray-700/50 hover:bg-gray-700/30 ${
                    isOurClub ? 'bg-cyan-900/20' : ''
                  }`}
                >
                  <td className="py-3 text-sm text-gray-200">{team.rank}</td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={team.team.logo} 
                        alt={team.team.name}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-sm text-gray-200">{team.team.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-400 text-center">{team.all.played}</td>
                  <td className="py-3 text-sm text-gray-400 text-center">{team.all.win}</td>
                  <td className="py-3 text-sm text-gray-400 text-center">{team.all.draw}</td>
                  <td className="py-3 text-sm text-gray-400 text-center">{team.all.lose}</td>
                  <td className="py-3 text-sm text-gray-400 text-center">{team.all.goals.for}</td>
                  <td className="py-3 text-sm text-gray-400 text-center">{team.all.goals.against}</td>
                  <td className="py-3 text-sm text-gray-400 text-center">{team.goalsDiff}</td>
                  <td className="py-3 text-sm font-semibold text-gray-200 text-center">{team.points}</td>
                  <td className="py-3">
                    <div className="flex space-x-1">
                      {team.form?.split('').map((result, index) => (
                        <span 
                          key={index}
                          className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                            result === 'W' ? 'bg-green-500' :
                            result === 'D' ? 'bg-yellow-500' :
                            result === 'L' ? 'bg-red-500' : 'bg-gray-600'
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Highlighted rows show the 5 clubs available for detailed analysis
      </div>
    </div>
  );
};

export default PremierLeagueStandings;