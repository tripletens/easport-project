// src/services/api/mockData.jsx
import { PREMIER_LEAGUE_CLUBS } from '../../config/premierLeagueClubs';

export const mockData = {
  teamStatistics: {
    get: "teams/statistics",
    parameters: {
      league: "39",
      season: "2023",
      team: "33"
    },
    errors: [],
    results: 11,
    paging: {
      current: 1,
      total: 1
    },
    response: {
      league: {
        id: 39,
        name: "Premier League",
        country: "England",
        logo: "https://media.api-sports.io/football/leagues/39.png",
        flag: "https://media.api-sports.io/flags/gb-eng.svg",
        season: 2023
      },
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png"
      },
      form: "WWDLW",
      fixtures: {
        played: {
          home: 19,
          away: 19,
          total: 38
        },
        wins: {
          home: 12,
          away: 9,
          total: 21
        },
        draws: {
          home: 4,
          away: 7,
          total: 11
        },
        loses: {
          home: 3,
          away: 3,
          total: 6
        }
      },
      goals: {
        for: {
          total: {
            home: 42,
            away: 35,
            total: 77
          },
          average: {
            home: "2.2",
            away: "1.8",
            total: "2.0"
          }
        },
        against: {
          total: {
            home: 22,
            away: 18,
            total: 40
          },
          average: {
            home: "1.2",
            away: "0.9",
            total: "1.1"
          }
        }
      },
      biggest: {
        streak: {
          wins: 5,
          draws: 2,
          loses: 1
        },
        wins: {
          home: "4-0",
          away: "1-3"
        },
        loses: {
          home: "1-3",
          away: "2-0"
        }
      },
      clean_sheet: {
        home: 8,
        away: 9,
        total: 17
      },
      failed_to_score: {
        home: 2,
        away: 4,
        total: 6
      },
      penalty: {
        scored: {
          total: 8,
          percentage: "88.9%"
        },
        missed: {
          total: 1,
          percentage: "11.1%"
        },
        total: 9
      },
      lineups: [
        {
          formation: "4-2-3-1",
          played: 32
        },
        {
          formation: "4-3-3",
          played: 6
        }
      ]
    }
  },
  
  // Keep other mock data the same but ensure structure matches API
  standings: {
    get: "standings",
    parameters: {
      league: "39",
      season: "2023"
    },
    errors: [],
    results: 1,
    paging: {
      current: 1,
      total: 1
    },
    response: [
      {
        league: {
          id: 39,
          name: "Premier League",
          country: "England",
          logo: "https://media.api-sports.io/football/leagues/39.png",
          flag: "https://media.api-sports.io/flags/gb.svg",
          season: 2023,
          standings: [
            PREMIER_LEAGUE_CLUBS.CLUBS.map((club, index) => ({
              rank: index + 1,
              team: {
                id: club.id,
                name: club.name,
                logo: club.logo
              },
              points: 90 - (index * 5),
              goalsDiff: 40 - (index * 5),
              form: "WWDLW".split(''),
              all: {
                played: 38,
                win: 25 - index,
                draw: 8 - index,
                lose: 5 + index,
                goals: {
                  for: 80 - (index * 5),
                  against: 30 + (index * 3)
                }
              }
            }))
          ]
        }
      }
    ]
  },
  
  players: {
    get: "players",
    parameters: {
      team: "33",
      season: "2023"
    },
    errors: [],
    results: 25,
    paging: {
      current: 1,
      total: 1
    },
    response: [
      {
        player: {
          id: 882,
          name: "Bruno Fernandes",
          firstname: "Bruno",
          lastname: "Fernandes",
          age: 28,
          nationality: "Portugal",
          height: "179 cm",
          weight: "69 kg",
          injured: false,
          photo: "https://media.api-sports.io/football/players/882.png"
        },
        statistics: [
          {
            team: {
              id: 33,
              name: "Manchester United",
              logo: "https://media.api-sports.io/football/teams/33.png"
            },
            league: {
              id: 39,
              name: "Premier League",
              country: "England",
              season: 2023
            },
            games: {
              appearences: 35,
              lineups: 35,
              minutes: 3105,
              number: null,
              position: "Midfielder",
              rating: "7.8",
              captain: true
            },
            substitutes: {
              in: 0,
              out: 5,
              bench: 0
            },
            shots: {
              total: 105,
              on: 42
            },
            goals: {
              total: 12,
              conceded: 0,
              assists: 14,
              saves: null
            },
            passes: {
              total: 2189,
              key: 95,
              accuracy: 84
            },
            tackles: {
              total: 52,
              blocks: 12,
              interceptions: 28
            },
            duels: {
              total: 385,
              won: 198
            },
            dribbles: {
              attempts: 68,
              success: 42,
              past: null
            },
            fouls: {
              drawn: 65,
              committed: 45
            },
            cards: {
              yellow: 8,
              yellowred: 0,
              red: 0
            },
            penalty: {
              won: null,
              commited: null,
              scored: 7,
              missed: 1,
              saved: null
            }
          }
        ]
      }
      // Add more players as needed
    ]
  }
};