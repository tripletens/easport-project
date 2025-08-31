// src/hooks/useTeamPlayers.jsx
import { useState, useEffect } from 'react';
import { footballAPI } from '../services/api/footballApi';

export const useTeamPlayers = (teamId, season = '2023') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      if (!teamId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const playersData = await footballAPI.getTeamPlayers(teamId, season);
        setData(playersData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [teamId, season]);

  return { data, loading, error };
};