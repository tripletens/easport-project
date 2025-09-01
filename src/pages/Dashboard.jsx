// src/pages/Dashboard.jsx
import { useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import TeamPerformance from "../components/sections/TeamPerformance";
import PlayerPerformance from "../components/sections/PlayerPerformance";
import PremierLeagueStandings from "../components/sections/PremierLeagueStandings";
import { PREMIER_LEAGUE_CLUBS } from "../config/premierLeagueClubs";

export default function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState("Team Performance");
  const [selectedSeason, setSelectedSeason] = useState("2023");
  const [selectedTeam, setSelectedTeam] = useState("");

  // Navigation items configuration
  const navItems = [
    { label: "Team Performance", icon: "📈", description: "Team KPIs and match analysis" },
    { label: "Player Analysis", icon: "👤", description: "Individual and squad performance" },
    { label: "League Standings", icon: "🏆", description: "Premier League table and stats" },
    // { label: "Coach Insights", icon: "🎯", description: "Tactical efficiency analysis" },
    // { label: "Live Dashboard", icon: "⚡", description: "Real-time match updates" },
  ];

  // Filter configuration
  const filterConfig = {
    selectedSeason,
    setSelectedSeason,
    selectedTeam,
    setSelectedTeam
  };

  // Get the selected team details for display
  const getSelectedTeamDetails = () => {
    if (!selectedTeam) return null;
    return PREMIER_LEAGUE_CLUBS.CLUBS.find(club => club.id === parseInt(selectedTeam));
  };

  const selectedTeamDetails = getSelectedTeamDetails();

  // Render appropriate section based on active tab
  const renderActiveSection = () => {
    switch (activeSection) {
      case "Team Performance":
        return <TeamPerformance 
          selectedSeason={selectedSeason}
          selectedTeam={selectedTeam}
        />;
      case "Player Analysis":
        return <PlayerPerformance 
          selectedSeason={selectedSeason}
          selectedTeam={selectedTeam}
        />;
      case "League Standings":
        return <PremierLeagueStandings season={selectedSeason} />;
      case "Coach Insights":
        return <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">Coach Insights content coming soon...</div>;
      case "Live Dashboard":
        return <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">Live Dashboard content coming soon...</div>;
      default:
        return <TeamPerformance 
          selectedSeason={selectedSeason}
          selectedTeam={selectedTeam}
        />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-black via-gray-900 to-gray-800 text-white">
      {/* Sidebar Component */}
      <Sidebar
        user={user}
        onLogout={onLogout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        navItems={navItems}
        filterConfig={filterConfig}
        premierLeagueClubs={PREMIER_LEAGUE_CLUBS.CLUBS}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">{activeSection}</h2>
            <p className="text-gray-400 mt-1">
              {navItems.find(item => item.label === activeSection)?.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-300">
              Premier League • {selectedSeason}
            </p>
            <p className="text-sm text-cyan-300">
              {selectedTeamDetails ? (
                <span className="flex items-center justify-end">
                  <img 
                    src={selectedTeamDetails.logo} 
                    alt={selectedTeamDetails.name}
                    className="w-5 h-5 mr-2 object-contain"
                  />
                  {selectedTeamDetails.name}
                </span>
              ) : (
                "Select a team to begin analysis"
              )}
            </p>
          </div>
        </div>

        {/* Render Active Section */}
        {renderActiveSection()}
      </main>
    </div>
  );
}