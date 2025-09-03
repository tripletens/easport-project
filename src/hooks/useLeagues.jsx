import { useState, useEffect } from 'react';
import { footballAPI } from '../services/api/footballApi';

export const useLeagues = (country) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch the leagues
  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = country ? { country } : {};
        const leaguesData = await footballAPI.getLeagues(params);
        setData(leaguesData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching leagues:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [country]);

  return { data, loading, error };
};