// API base configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fbrapi.com',
  apiKey: import.meta.env.VITE_API_KEY || 'fs_sMRVksqSf0ArbUQPp6T1jjj47Y4iwbDqcYqWTSOU',
  timeout: 10000,
};

// Update headers to match your API requirements
export const getHeaders = () => ({
  'X-API-Key': API_CONFIG.apiKey,
  'Content-Type': 'application/json',
  timeout: 10000,
  useCorsProxy: true, // Add this flag
});
// Generic fetch wrapper with error handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  const config = {
    headers: getHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };

  } catch (error) {
    console.error('API Request failed:', error);
    return { data: null, error: error.message };
  }
};

// API endpoints configuration
export const ENDPOINTS = {
    COUNTRIES: '/countries',
    LEAGUES: '/competitions',
    LEAGUE_STANDINGS: (leagueCode) => `/competitions/${leagueCode}/standings`,
    TEAM_STATS: (teamId) => `/teams/${teamId}`,
    TEAM_MATCHES: (teamId) => `/teams/${teamId}/matches`,
    PLAYER_STATS: (playerId) => `/players/${playerId}`,
    MATCH_DETAILS: (matchId) => `/matches/${matchId}`,
};