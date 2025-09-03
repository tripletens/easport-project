import { useEffect, useState } from 'react';
import { footballAPI } from '../../services/api/footballApi';


// everything here is for the api test 
const ApiTest = () => {
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testApi = async () => {
      try {
        const data = await footballAPI.getLeagueStandings('PL');
        setStandings(data);
      } catch (error) {
        console.error('API test failed:', error);
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  if (loading) return <div>Testing API connection...</div>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-cyan-300 mb-4">API Connection Test</h3>
      {standings ? (
        <div>
          <p className="text-green-400">✅ API Connected Successfully!</p>
          <pre className="text-xs text-gray-400 mt-2 overflow-auto">
            {JSON.stringify(standings, null, 2)}
          </pre>
        </div>
      ) : (
        <p className="text-red-400">❌ API Connection Failed - Using Mock Data</p>
      )}
    </div>
  );
};

export default ApiTest;