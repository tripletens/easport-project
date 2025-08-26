import { useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import TeamPerformance from "../components/sections/TeamPerformance";
import PlayerPerformance from "../components/sections/PlayerPerformance";
import CountriesLeagues from "./CountriesLeagues";

export default function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState("Team Performance");
  const [selectedLeague, setSelectedLeague] = useState("PL");
  const [selectedSeason, setSelectedSeason] = useState("2023");
  const [selectedTeam, setSelectedTeam] = useState("");

  // Navigation items configuration
  const navItems = [
    { label: "Team Performance", icon: "📈", description: "Team KPIs and match analysis" },
    { label: "Player Analysis", icon: "👤", description: "Individual and squad performance" },
    { label: "League Context", icon: "🌍", description: "Compare across leagues" },
    { label: "Coach Insights", icon: "🎯", description: "Tactical efficiency analysis" },
    { label: "Live Dashboard", icon: "⚡", description: "Real-time match updates" },
  ];

  // Filter configuration
  const filterConfig = {
    selectedLeague,
    setSelectedLeague,
    selectedSeason,
    setSelectedSeason,
    selectedTeam,
    setSelectedTeam
  };

  // Render appropriate section based on active tab
  const renderActiveSection = () => {
    switch (activeSection) {
      case "Team Performance":
        return <TeamPerformance {...filterConfig} />;
      case "Player Analysis":
        return <PlayerPerformance {...filterConfig} />;
      case "League Context":
        return <CountriesLeagues {...filterConfig} />;
      case "Coach Insights":
        return <div className="p-6">Coach Insights content coming soon...</div>;
      case "Live Dashboard":
        return <div className="p-6">Live Dashboard content coming soon...</div>;
      default:
        return <TeamPerformance {...filterConfig} />;
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
              {selectedLeague} • {selectedSeason}
            </p>
            <p className="text-sm text-cyan-300">
              {selectedTeam || "Select a team to begin analysis"}
            </p>
          </div>
        </div>

        {/* Render Active Section */}
        {renderActiveSection()}
      </main>
    </div>
  );
}