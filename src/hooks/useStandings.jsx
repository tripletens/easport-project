// src/hooks/useStandings.jsx
import { useState, useEffect } from 'react';
import { footballAPI } from '../services/api/footballApi';

export const useStandings = (season = '2023') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);

      try {
        const standingsData = await footballAPI.getPremierLeagueStandings(season);
        setData(standingsData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching standings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [season]);

  return { data, loading, error };
};