// src/services/api/footballApi.jsx
import { apiRequest, ENDPOINTS } from './index';
import { mockData } from './mockData';
import { PREMIER_LEAGUE_CLUBS } from '../../config/premierLeagueClubs';

export const footballAPI = {
  // Get team statistics with the exact API structure
  getTeamStatistics: async (teamId, leagueId, season = '2023') => {
    const params = { 
      team: teamId, 
      league: leagueId, 
      season: season 
    };
    
    const { data, error } = await apiRequest(ENDPOINTS.TEAM_STATISTICS, params);
    
    if (error) {
      console.warn('Using mock team statistics due to error:', error);
      // Return mock data that matches the API structure
      return mockData.teamStatistics;
    }
    return data;
  },
  
  // Keep other methods the same
  getPremierLeagueStandings: async (season = '2023') => {
    const params = { league: PREMIER_LEAGUE_CLUBS.LEAGUE_ID, season };
    const { data, error } = await apiRequest(ENDPOINTS.STANDINGS, params);
    
    if (error) {
      console.warn('Using mock standings data due to error:', error);
      return mockData.standings;
    }
    return data;
  },
  
  getTeamPlayers: async (teamId, season = '2023') => {
    const params = { team: teamId, season };
    const { data, error } = await apiRequest(ENDPOINTS.PLAYERS, params);
    
    if (error) {
      console.warn('Using mock player data due to error:', error);
      return mockData.players;
    }
    return data;
  }
};

export default footballAPI;