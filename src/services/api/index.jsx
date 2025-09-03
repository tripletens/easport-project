const API_CONFIG = {
  RAPID_API: {
    baseURL: import.meta.env.VITE_RAPID_API_BASE_URL || 'https://api-football-v1.p.rapidapi.com/v3',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    },
  },
  timeout: 10000,
};

export const getHeaders = () => API_CONFIG.RAPID_API.headers;

export const apiRequest = async (endpoint, params = {}) => {
  const url = `${API_CONFIG.RAPID_API.baseURL}${endpoint}`;
  
  const queryParams = new URLSearchParams(params).toString();
  const fullUrl = queryParams ? `${url}?${queryParams}` : url;
  
  console.log('API Request URL:', fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API Request failed:', error);
    return { data: null, error: error.message };
  }
};

export const ENDPOINTS = {
  LEAGUES: '/leagues',
  STANDINGS: '/standings',
  TEAMS: '/teams',
  TEAM_STATISTICS: '/teams/statistics',
  PLAYERS: '/players',
  FIXTURES: '/fixtures',
};