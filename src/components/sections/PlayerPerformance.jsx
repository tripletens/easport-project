// src/components/sections/PlayerPerformance.jsx
import React, { useState, useEffect } from 'react';
import { useTeamPlayers } from '../../hooks/useTeamPlayers';
import { getClubById } from '../../config/premierLeagueClubs';

const PlayerPerformance = ({ selectedSeason, selectedTeam }) => {
  const { data, loading, error } = useTeamPlayers(selectedTeam, selectedSeason);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);
  const club = getClubById(selectedTeam);

  // Reset to first page when team or season changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTeam, selectedSeason]);

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

  // Get players from API response
  const players = data?.response || [];
  const totalPages = data?.paging?.total || 1;
  const totalResults = data?.results || 0;

  // Calculate pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers to show
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(players.length / playersPerPage); i++) {
    pageNumbers.push(i);
  }

  // Only show a subset of page numbers for better UI
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
  
  if (endPage - startPage + 1 < maxPageNumbersToShow) {
    startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
  }

  const visiblePageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePageNumbers.push(i);
  }

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
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
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstPlayer + 1}-{Math.min(indexOfLastPlayer, players.length)} of {players.length} players
        </div>
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
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
              return (
                <tr key={playerData.player.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={playerData.player.photo} 
                        alt={playerData.player.name}
                        className="w-8 h-8 object-cover rounded-full"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/32';
                        }}
                      />
                      <span className="text-sm text-gray-200">{playerData.player.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-400">{stats.games?.position || 'N/A'}</td>
                  <td className="py-3 text-sm text-gray-400">{playerData.player.age}</td>
                  <td className="py-3 text-sm text-gray-400">{playerData.player.nationality}</td>
                  <td className="py-3 text-sm text-gray-400">{stats.games?.appearences || 0}</td>
                  <td className="py-3 text-sm text-gray-400">{stats.goals?.total || 0}</td>
                  <td className="py-3 text-sm text-gray-400">{stats.goals?.assists || 0}</td>
                  <td className="py-3 text-sm text-gray-400">
                    {stats.games?.rating ? parseFloat(stats.games.rating).toFixed(2) : 'N/A'}
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
              className={`px-4 py-2 rounded-md mr-2 ${
                currentPage === 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-cyan-600 text-white hover:bg-cyan-500'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
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
                className={`w-10 h-10 rounded-md ${
                  currentPage === number
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {number}
              </button>
            ))}
            {endPage < totalPages && (
              <>
                <span className="px-2 py-2">...</span>
                <button
                  onClick={() => paginate(totalPages)}
                  className="w-10 h-10 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
          
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPerformance;