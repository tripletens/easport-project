import { useState, useEffect } from 'react';
import { footballAPI } from '../api/footballApi';

export const useTeamStats = (teamId, season = '2023') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamStats = async () => {
      if (!teamId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const teamData = await footballAPI.getTeamStats(teamId, season);
        setData(teamData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching team stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamStats();
  }, [teamId, season]);

  return { data, loading, error };
};