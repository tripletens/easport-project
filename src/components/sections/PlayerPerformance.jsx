import React, { useState, useEffect } from 'react';
import { useTeamPlayers } from '../../hooks/useTeamPlayers';
import { getClubById } from '../../config/premierLeagueClubs';
import PlayerProfile from './PlayerProfile';
import PlayerComparison from './PlayerComparison';

const PlayerPerformance = ({ selectedSeason, selectedTeam }) => {
  const { data, loading, error } = useTeamPlayers(selectedTeam, selectedSeason);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const club = getClubById(selectedTeam);

  // we will reset states when team or season changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedPlayer(null);
    setViewMode('list');
    setSelectedPlayers([]);
  }, [selectedTeam, selectedSeason]);

  // let's create a function to handle player selection for profile view
  const handlePlayerSelect = (playerData) => {
    setSelectedPlayer(playerData);
    setViewMode('profile');
  };

  // let's also create a function to handle closing the profile
  const handleCloseProfile = () => {
    setSelectedPlayer(null);
    setViewMode('list');
  };

  // let's create a function to handle player selection for comparison
  const handlePlayerCompareSelect = (playerData) => {
    if (selectedPlayers.some(p => p.player.id === playerData.player.id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p.player.id !== playerData.player.id));
    } else if (selectedPlayers.length < 4) {
      setSelectedPlayers([...selectedPlayers, playerData]);
    }
  };

  // let's create a function to toggle comparison view
  const toggleComparisonView = () => {
    if (viewMode === 'comparison') {
      setViewMode('list');
      setSelectedPlayers([]);
    } else if (selectedPlayers.length > 0) {
      setViewMode('comparison');
    }
  };

  // if we are in the profile view or section we will show player profile
  if (viewMode === 'profile' && selectedPlayer) {
    return (
      <PlayerProfile
        playerData={selectedPlayer}
        club={club}
        season={selectedSeason}
        onClose={handleCloseProfile}
      />
    );
  }

  // if we are in the comparison view or section we will show the comparison of players 
  if (viewMode === 'comparison') {
    return (
      <PlayerComparison
        playersData={data?.response || []}
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
        onBack={() => setViewMode('list')}
        selectedSeason={selectedSeason}
        selectedTeam={selectedTeam}
        club={club}
      />
    );
  }

  //  we will show some errors / states such as loading, error, and empty states
  if (!selectedTeam) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-center">Please select a Premier League team to view player data.</p>
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
        <div className="text-red-400">Error loading player data: {error}</div>
        <p className="text-gray-400 mt-2">Using mock data for demonstration purposes.</p>
      </div>
    );
  }

  // let's get players from API response
  const players = data?.response || [];

  console.log({ players, length: players?.length });
  
  const totalPlayerPages = Math.ceil(players.length / playersPerPage);

  // Calculate pagination for currently loaded players
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  // here we will handle the changing of pages
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // we will calculate the page numbers to show
  const pageNumbers = [];
  for (let i = 1; i <= totalPlayerPages; i++) {
    pageNumbers.push(i);
  }

  const maxPageNumbersToShow = 10; // max page number to show is 10 
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  let endPage = Math.min(totalPlayerPages, startPage + maxPageNumbersToShow - 1);

  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  const visiblePageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePageNumbers.push(i);
  }

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={club.logo}
            alt={club.name}
            className="w-12 h-12 object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold text-cyan-300">{club.name} Players</h2>
            <p className="text-gray-400">Premier League {selectedSeason}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {selectedPlayers.length > 0 && (
            <div className="text-sm text-cyan-300 bg-cyan-900/30 px-3 py-1 rounded-full">
              {selectedPlayers.length} selected for comparison
            </div>
          )}
          <button
            onClick={toggleComparisonView}
            disabled={selectedPlayers.length === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPlayers.length > 0
              ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-500/20'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
          >
            {viewMode === 'comparison' ? 'Back to List' : 'Compare Players'}
          </button>
        </div>
      </div>

      {selectedPlayers.length > 0 && (
        <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-lg p-3 mb-4">
          <p className="text-cyan-300 text-sm text-center">
            Select up to 4 players. Click player names to view profiles or use the Compare button for advanced analysis.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstPlayer + 1}-{Math.min(indexOfLastPlayer, players.length)} of {players.length} players
        </div>
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPlayerPages}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-sm text-gray-400 pb-2">Select</th>
              <th className="text-left text-sm text-gray-400 pb-2">Player</th>
              <th className="text-left text-sm text-gray-400 pb-2">Position</th>
              <th className="text-left text-sm text-gray-400 pb-2">Age</th>
              <th className="text-left text-sm text-gray-400 pb-2">Nationality</th>
              <th className="text-left text-sm text-gray-400 pb-2">Apps</th>
              <th className="text-left text-sm text-gray-400 pb-2">Goals</th>
              <th className="text-left text-sm text-gray-400 pb-2">Assists</th>
              <th className="text-left text-sm text-gray-400 pb-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {currentPlayers.map((playerData) => {
              const stats = playerData.statistics[0] || {};
              const isSelected = selectedPlayers.some(p => p.player.id === playerData.player.id);

              return (
                <tr
                  key={playerData.player.id}
                  className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${isSelected ? 'bg-cyan-900/20' : ''
                    }`}
                >
                  <td className="py-3 px-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handlePlayerCompareSelect(playerData)}
                      className="w-4 h-4 text-cyan-600 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
                    />
                  </td>

                  <td className="py-3">
                    <div
                      className="flex items-center space-x-2 cursor-pointer group"
                      onClick={() => handlePlayerSelect(playerData)}
                    >
                      <img
                        src={playerData.player.photo}
                        alt={playerData.player.name}
                        className="w-8 h-8 object-cover rounded-full border-2 border-gray-600 group-hover:border-cyan-500 transition-colors"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/32';
                        }}
                      />
                      <span className="text-sm text-gray-200 group-hover:text-cyan-300 transition-colors">
                        {playerData.player.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-400">{stats.games?.position || 'N/A'}</td>
                  <td className="py-3 text-sm text-gray-400">{playerData.player.age}</td>
                  <td className="py-3 text-sm text-gray-400">{playerData.player.nationality}</td>
                  <td className="py-3 text-sm text-gray-400">{stats.games?.appearences || 0}</td>
                  <td className="py-3 text-sm text-gray-400">{stats.goals?.total || 0}</td>
                  <td className="py-3 text-sm text-gray-400">{stats.goals?.assists || 0}</td>
                  <td className="py-3 text-sm text-gray-400">
                    {stats.games?.rating ? (
                      <span className={`font-medium ${parseFloat(stats.games.rating) >= 7.5 ? 'text-green-400' :
                        parseFloat(stats.games.rating) >= 6.5 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                        {parseFloat(stats.games.rating).toFixed(2)}
                      </span>
                    ) : 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {players.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No player data available for this team and season.
        </div>
      )}

      {players.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <div>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md mr-2 text-sm font-medium ${currentPage === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-cyan-600 text-white hover:bg-cyan-500'
                }`}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPlayerPages}
              className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === totalPlayerPages // FIXED: Use totalPlayerPages
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-cyan-600 text-white hover:bg-cyan-500'
                }`}
            >
              Next
            </button>
          </div>

          <div className="hidden md:flex space-x-1">
            {visiblePageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 rounded-md text-sm font-medium ${currentPage === number
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {number}
              </button>
            ))}
            {endPage < totalPlayerPages && (
              <>
                <span className="px-2 py-2 text-gray-400">...</span>
                <button
                  onClick={() => paginate(totalPlayerPages)}
                  className="w-10 h-10 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 text-sm font-medium"
                >
                  {totalPlayerPages}
                </button>
              </>
            )}
          </div>

          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPlayerPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPerformance;