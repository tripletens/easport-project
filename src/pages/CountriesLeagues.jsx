import { useState, useEffect } from 'react';
import { useLeagues } from '../hooks/useLeagues';

const CountriesLeagues = ({ onSelectLeague }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const { data, loading, error } = useLeagues(selectedCountry);

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
        <div className="text-red-400">Error loading leagues: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Leagues & Countries</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Country</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full md:w-64 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All Countries</option>
          <option value="England">England</option>
          <option value="Spain">Spain</option>
          <option value="Germany">Germany</option>
          <option value="Italy">Italy</option>
          <option value="France">France</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.response?.map((leagueData) => (
          <div 
            key={leagueData.league.id}
            className="p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-cyan-400 transition cursor-pointer"
            onClick={() => onSelectLeague(leagueData.league.id, leagueData.league.name)}
          >
            <div className="flex items-center space-x-3">
              <img 
                src={leagueData.league.logo} 
                alt={leagueData.league.name}
                className="w-8 h-8 object-contain"
              />
              <div>
                <h4 className="text-gray-200 font-medium">{leagueData.league.name}</h4>
                <p className="text-sm text-gray-400">{leagueData.country.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountriesLeagues;