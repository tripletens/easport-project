
import { useTeamStats } from '../../hooks/useTeamStats';
import { useStandings } from '../../hooks/useStandings';
import { getClubById } from '../../config/premierLeagueClubs';
import KPICards from '../charts/KPICards';
import PerformanceTrendChart from '../charts/PerformanceTrendChart';

const TeamPerformance = ({ selectedSeason, selectedTeam }) => {
  const { data: teamData, loading: teamLoading, error: teamError } = useTeamStats(selectedTeam, selectedSeason);
  const { data: standingsData, loading: standingsLoading, error: standingsError } = useStandings(selectedSeason);
  
  const loading = teamLoading || standingsLoading;
  const error = teamError || standingsError;

  const club = getClubById(selectedTeam);

  // we will extract the actual response data from the API structure
  const stats = teamData?.response;
  const standings = standingsData?.response?.[0]?.league?.standings?.[0];

  if (!selectedTeam) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-center">Please select a Premier League team to view performance data.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="text-red-400">Error loading team data: {error}</div>
        <p className="text-gray-400 mt-2">Using mock data for demonstration purposes.</p>
      </div>
    );
  }

  // we will also extract team position from standings
  const teamPosition = standings?.find(
    t => t.team.id === parseInt(selectedTeam)
  )?.rank;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <img 
          src={club.logo} 
          alt={club.name}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold text-cyan-300">{club.name}</h2>
          <p className="text-gray-400">Premier League {selectedSeason}</p>
          {teamPosition && (
            <p className="text-sm text-cyan-400">Current Position: #{teamPosition}</p>
          )}
        </div>
      </div>
      
      <KPICards 
        data={teamData} 
        team={selectedTeam} 
        season={selectedSeason} 
      />
      
      {/* we will add the performance charts here */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/*  we will also add the team stats */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">Team Statistics</h3>
          {stats ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Matches Played</span>
                <span className="text-gray-200">{stats.fixtures.played.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Wins</span>
                <span className="text-gray-200">{stats.fixtures.wins.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Draws</span>
                <span className="text-gray-200">{stats.fixtures.draws.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Losses</span>
                <span className="text-gray-200">{stats.fixtures.loses.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Goals Scored</span>
                <span className="text-gray-200">{stats.goals.for.total.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Goals Conceded</span>
                <span className="text-gray-200">{stats.goals.against.total.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Clean Sheets</span>
                <span className="text-gray-200">{stats.clean_sheet.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Failed to Score</span>
                <span className="text-gray-200">{stats.failed_to_score.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Penalty Success</span>
                <span className="text-gray-200">{stats.penalty.scored.percentage}</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">No statistics data available</div>
          )}
        </div>
        
        {/* we will add the team's league position & form */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">League Position & Form</h3>
          {teamPosition ? (
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-cyan-400 mb-2">#{teamPosition}</div>
              <p className="text-gray-400">in Premier League</p>
            </div>
          ) : (
            <div className="text-center mb-6 text-gray-400">Position data not available</div>
          )}
          
          {/* here is the club's recent form */}
          {stats?.form && (
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-300 mb-2">Recent Form</h4>
              <div className="flex space-x-2 justify-center">
                {stats.form.split('').slice(0, 5).map((result, index) => (
                  <span 
                    key={index}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      result === 'W' ? 'bg-green-500' :
                      result === 'D' ? 'bg-yellow-500' :
                      result === 'L' ? 'bg-red-500' : 'bg-gray-600'
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Last 5 matches</p>
            </div>
          )}
        </div>
      </div>
      
      {/* we will add additional stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* okay we will have the home vs away performance here */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">Home vs Away Performance</h3>
          {stats && (
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-gray-300 mb-2">Home</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Played: <span className="text-gray-200">{stats.fixtures.played.home}</span></div>
                  <div className="text-gray-400">Wins: <span className="text-gray-200">{stats.fixtures.wins.home}</span></div>
                  <div className="text-gray-400">Goals: <span className="text-gray-200">{stats.goals.for.total.home}</span></div>
                  <div className="text-gray-400">Conceded: <span className="text-gray-200">{stats.goals.against.total.home}</span></div>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-300 mb-2">Away</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-400">Played: <span className="text-gray-200">{stats.fixtures.played.away}</span></div>
                  <div className="text-gray-400">Wins: <span className="text-gray-200">{stats.fixtures.wins.away}</span></div>
                  <div className="text-gray-400">Goals: <span className="text-gray-200">{stats.goals.for.total.away}</span></div>
                  <div className="text-gray-400">Conceded: <span className="text-gray-200">{stats.goals.against.total.away}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* okay let's add some unique data about the biggest results from the api response */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">Biggest Results</h3>
          {stats && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Biggest Win</span>
                <span className="text-gray-200">{stats.biggest.wins.home || stats.biggest.wins.away || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Biggest Loss</span>
                <span className="text-gray-200">{stats.biggest.loses.home || stats.biggest.loses.away || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Longest Win Streak</span>
                <span className="text-gray-200">{stats.biggest.streak.wins} matches</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Longest Unbeaten</span>
                <span className="text-gray-200">{stats.biggest.streak.wins + stats.biggest.streak.draws} matches</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* we will add the performance trend chart */}
      <PerformanceTrendChart 
        data={teamData} 
        team={selectedTeam} 
        season={selectedSeason} 
      />
    </div>
  );
};

export default TeamPerformance;