import { apiRequest, ENDPOINTS } from './index';
import { mockCountries } from './mockData';
import { mockStandings, mockTeamStats, mockPlayerStats } from './mockData';

export const footballAPI = {
  // Get all available leagues
  getLeagues: async () => {
    const { data, error } = await apiRequest(ENDPOINTS.LEAGUES);
    if (error) {
      console.warn('Using mock leagues data due to error:', error);
      return mockLeagues;
    }
    return data;
  },

  // Get league standings
  getLeagueStandings: async (leagueCode, season = '2023') => {
    const endpoint = `${ENDPOINTS.LEAGUE_STANDINGS(leagueCode)}?season=${season}`;
    const { data, error } = await apiRequest(endpoint);
    
    if (error) {
      console.warn('Using mock standings data due to error:', error);
      return mockStandings[leagueCode] || mockStandings.PL;
    }
    return data;
  },


  // Get team statistics
  getTeamStats: async (teamId, season = '2023') => {
    const endpoint = `${ENDPOINTS.TEAM_STATS(teamId)}?season=${season}`;
    const { data, error } = await apiRequest(endpoint);
    
    if (error) {
      console.warn('Using mock team stats data due to error:', error);
      return mockTeamStats[teamId] || mockTeamStats.TOT;
    }
    return data;
  },

  // Get team matches
  getTeamMatches: async (teamId, season = '2023') => {
    const endpoint = `${ENDPOINTS.TEAM_MATCHES(teamId)}?season=${season}`;
    const { data, error } = await apiRequest(endpoint);
    
    if (error) {
      console.warn('Using mock matches data due to error:', error);
      return mockMatches[teamId] || [];
    }
    return data;
  },

  // Get player statistics
  getPlayerStats: async (playerId) => {
    const { data, error } = await apiRequest(ENDPOINTS.PLAYER_STATS(playerId));
    
    if (error) {
      console.warn('Using mock player data due to error:', error);
      return mockPlayerStats[playerId] || mockPlayerStats.default;
    }
    return data;
  },

  getCountries: async () => {
    const { data, error } = await apiRequest(ENDPOINTS.COUNTRIES);
    
    if (error) {
      console.warn('Using mock countries data due to error:', error);
      return mockCountries;
    }
    return data;
  },
};