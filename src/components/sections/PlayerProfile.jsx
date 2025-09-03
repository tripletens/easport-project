// src/components/sections/PlayerProfile.jsx
import React from 'react';

const PlayerProfile = ({ playerData, club, season, onClose }) => {
  // Extract data for easier access
  const player = playerData.player;
  const stats = playerData.statistics[0] || {}; // Get stats for the relevant league/season
  const teamStats = stats.team || {};

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onClose}
          className="flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-medium"
        >
          &larr; Back to Players List
        </button>
        <div className="text-right">
          <p className="text-gray-300 text-sm">
            {club.name} • {season}
          </p>
        </div>
      </div>

      {/* Player Header */}
      <div className="flex items-start space-x-6 mb-8">
        <img
          src={player.photo}
          alt={player.name}
          className="w-32 h-32 object-cover rounded-lg border-2 border-cyan-500/30"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/128';
          }}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-2">{player.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-4">
            <span>
              <strong>Age:</strong> {player.age}
            </span>
            <span>
              <strong>Nationality:</strong> {player.nationality}
            </span>
            <span>
              <strong>Position:</strong> {stats.games?.position || 'N/A'}
            </span>
            {player.height && (
              <span>
                <strong>Height:</strong> {player.height}
              </span>
            )}
            {player.weight && (
              <span>
                <strong>Weight:</strong> {player.weight}
              </span>
            )}
          </div>
          {playerData.player.injured && (
            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium mb-4">
              ⚠️ Currently Injured
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Appearances */}
        <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
          <h3 className="text-cyan-400 text-sm font-semibold mb-1">Appearances</h3>
          <p className="text-2xl font-bold text-white">{stats.games?.appearences || 0}</p>
          <p className="text-xs text-gray-400">
            Started: {stats.games?.lineups || 0}
          </p>
        </div>

        {/* Goals */}
        <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
          <h3 className="text-cyan-400 text-sm font-semibold mb-1">Goals</h3>
          <p className="text-2xl font-bold text-white">{stats.goals?.total || 0}</p>
          <p className="text-xs text-gray-400">
            {stats.goals?.conceded ? `Conceded: ${stats.goals.conceded}` : 'Assists: ' + (stats.goals?.assists || 0)}
          </p>
        </div>

        {/* we will add the player's rating */}
        <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
          <h3 className="text-cyan-400 text-sm font-semibold mb-1">Rating</h3>
          <p className="text-2xl font-bold text-white">
            {stats.games?.rating ? parseFloat(stats.games.rating).toFixed(2) : 'N/A'}
          </p>
          <p className="text-xs text-gray-400">Average Match Rating</p>
        </div>

        {/* we will add the cards */}
        <div className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
          <h3 className="text-cyan-400 text-sm font-semibold mb-1">Cards</h3>
          <div className="flex items-center space-x-3">
            <span className="text-yellow-500 text-lg">🟨 {stats.cards?.yellow || 0}</span>
            <span className="text-red-500 text-lg">🟥 {stats.cards?.red || 0}</span>
          </div>
        </div>
      </div>

      {/* here is where we will add a detailed Stats Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Detailed Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Shots Total:</span> {stats.shots?.total || 0}
          </div>
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Shots On Target:</span> {stats.shots?.on || 0}
          </div>
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Pass Accuracy:</span>{' '}
            {stats.passes?.accuracy ? `${stats.passes.accuracy}%` : 'N/A'}
          </div>
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Key Passes:</span> {stats.passes?.key || 0}
          </div>
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Dribbles Attempted:</span> {stats.dribbles?.attempts || 0}
          </div>
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Dribbles Success:</span> {stats.dribbles?.success || 0}
          </div>
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Tackles Total:</span> {stats.tackles?.total || 0}
          </div>
          <div className="p-3 bg-gray-800/30 rounded">
            <span className="text-gray-400">Blocks:</span> {stats.tackles?.blocks || 0}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center mt-8">
        Statistics provided by API-FOOTBALL on <a href="https://rapidapi.com/"> RAPID API </a>. Data may be limited for the current season.
      </p>
    </div>
  );
};

export default PlayerProfile;