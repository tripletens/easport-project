import { useState, useEffect } from 'react';
import { footballAPI } from '../api/footballApi';

export const useCountries = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // we will fetch the countries here 
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      try {
        const countriesData = await footballAPI.getCountries();
        setData(countriesData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { data, loading, error };
};