export const PREMIER_LEAGUE_CLUBS = {
  // this is premier league ID
  LEAGUE_ID: 39,
  
  // okay, we will add the selected clubs with their API IDs
  CLUBS: [
    {
      id: 42,
      name: "Arsenal",
      code: "ARS",
      logo: "https://media.api-sports.io/football/teams/42.png"
    },
    {
      id: 50,
      name: "Manchester City",
      code: "MCI",
      logo: "https://media.api-sports.io/football/teams/50.png"
    },
    {
      id: 40,
      name: "Liverpool",
      code: "LIV",
      logo: "https://media.api-sports.io/football/teams/40.png"
    },
    {
      id: 47,
      name: "Tottenham",
      code: "TOT",
      logo: "https://media.api-sports.io/football/teams/47.png"
    },
    {
      id: 33,
      name: "Manchester United",
      code: "MU",
      logo: "https://media.api-sports.io/football/teams/33.png"
    }
  ]
};

// we will have to get club by ID here 
export const getClubById = (id) => {
  if (!id) return null;
  return PREMIER_LEAGUE_CLUBS.CLUBS.find(club => club.id === parseInt(id));
};