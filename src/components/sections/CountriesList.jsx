import { useCountries } from '../../hooks/useCountries';

const CountriesList = () => {
  const { data, loading, error } = useCountries();

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
        <div className="text-red-400">Error loading countries: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Countries & Federations</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-sm text-gray-400 pb-2">Country</th>
              <th className="text-left text-sm text-gray-400 pb-2">Code</th>
              <th className="text-left text-sm text-gray-400 pb-2">Governing Body</th>
              <th className="text-left text-sm text-gray-400 pb-2">Clubs</th>
              <th className="text-left text-sm text-gray-400 pb-2">Players</th>
              <th className="text-left text-sm text-gray-400 pb-2">National Teams</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((country, index) => (
              <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                <td className="py-3 text-sm text-gray-200">{country.country}</td>
                <td className="py-3 text-sm text-gray-400">{country.country_code}</td>
                <td className="py-3 text-sm text-gray-400">{country.governing_body}</td>
                <td className="py-3 text-sm text-gray-400 text-right">{country["#_clubs"]}</td>
                <td className="py-3 text-sm text-gray-400 text-right">{country["#_players"]}</td>
                <td className="py-3 text-sm text-gray-400">
                  {country.national_teams?.join(', ') || 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Showing {data?.data?.length || 0} countries
      </div>
    </div>
  );
};

export default CountriesList;