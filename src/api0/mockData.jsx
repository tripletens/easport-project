// Mock data for development and fallback
export const mockLeagues = {
  competitions: [
    { code: 'PL', name: 'Premier League', area: { name: 'England' } },
    { code: 'LaLiga', name: 'La Liga', area: { name: 'Spain' } },
    { code: 'Bundesliga', name: 'Bundesliga', area: { name: 'Germany' } },
    { code: 'SerieA', name: 'Serie A', area: { name: 'Italy' } },
    { code: 'Ligue1', name: 'Ligue 1', area: { name: 'France' } },
  ]
};

export const mockStandings = {
  PL: {
    standings: [
      {
        type: 'TOTAL',
        table: [
          { position: 1, team: { name: 'Arsenal', id: 57 }, playedGames: 38, won: 26, draw: 6, lost: 6, points: 84, goalsFor: 88, goalsAgainst: 43 },
          { position: 2, team: { name: 'Manchester City', id: 65 }, playedGames: 38, won: 25, draw: 7, lost: 6, points: 82, goalsFor: 87, goalsAgainst: 42 },
          { position: 3, team: { name: 'Liverpool', id: 64 }, playedGames: 38, won: 24, draw: 8, lost: 6, points: 80, goalsFor: 86, goalsAgainst: 41 },
          { position: 4, team: { name: 'Tottenham', id: 73 }, playedGames: 38, won: 22, draw: 6, lost: 10, points: 72, goalsFor: 78, goalsAgainst: 47 },
        ]
      }
    ]
  }
};

export const mockTeamStats = {
  TOT: {
    id: 73,
    name: 'Tottenham Hotspur',
    venue: 'Tottenham Hotspur Stadium',
    squad: [
      { id: 1, name: 'Player One', position: 'Forward', nationality: 'England' },
      { id: 2, name: 'Player Two', position: 'Midfielder', nationality: 'France' },
    ],
    runningCompetitions: [{ name: 'Premier League', code: 'PL' }]
  }
};

export const mockPlayerStats = {
  default: {
    id: 1,
    name: 'Sample Player',
    position: 'Forward',
    nationality: 'England',
    statistics: [
      {
        goals: { total: 15 },
        shots: { total: 45, on: 30 },
        passes: { total: 320, accuracy: 85 },
        games: { appearences: 25 }
      }
    ]
  }
};

export const mockMatches = {
  TOT: {
    matches: [
      {
        id: 1,
        homeTeam: { name: 'Tottenham', id: 73 },
        awayTeam: { name: 'Arsenal', id: 57 },
        score: { fullTime: { home: 2, away: 2 } },
        status: 'FINISHED',
        date: '2023-09-24'
      }
    ]
  }
};

export const mockCountries = {
  data: [
    {
      country: "England",
      country_code: "ENG",
      governing_body: "UEFA",
      "#_clubs": 1065,
      "#_players": 11199,
      national_teams: ["M", "F"]
    },
    {
      country: "Spain",
      country_code: "ESP", 
      governing_body: "UEFA",
      "#_clubs": 372,
      "#_players": 10205,
      national_teams: ["M", "F"]
    },
    {
      country: "Germany",
      country_code: "GER",
      governing_body: "UEFA",
      "#_clubs": 466,
      "#_players": 17606,
      national_teams: ["M", "F"]
    }
  ]
};