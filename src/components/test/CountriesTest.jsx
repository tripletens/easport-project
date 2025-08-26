// src/components/test/CountriesTest.jsx
import { useState, useEffect } from 'react';
import { footballAPI } from '../../api/footballApi';

const CountriesTest = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testCountriesAPI = async () => {
      try {
        const data = await footballAPI.getCountries();
        setResult(data);
      } catch (error) {
        setResult({ error: error.message });
      } finally {
        setLoading(false);
      }
    };

    testCountriesAPI();
  }, []);

  if (loading) return <div className="text-cyan-300">Testing countries API...</div>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-cyan-300 mb-2">Countries API Test</h3>
      
      {result?.error ? (
        <div className="text-red-400">
          ❌ API Error: {result.error}
        </div>
      ) : result?.data ? (
        <div className="text-green-400">
          ✅ API Connected Successfully! Found {result.data.length} countries
        </div>
      ) : (
        <div className="text-yellow-400">
          ⚠️ Using mock data - {result.data?.length || 0} countries loaded
        </div>
      )}
      
      <div className="mt-2 text-xs text-gray-400">
        <pre>{JSON.stringify(result?.data?.[0] || result, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CountriesTest;