import { useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import TeamPerformance from "../components/sections/TeamPerformance";
import PlayerPerformance from "../components/sections/PlayerPerformance";
import PlayerComparison from "../components/sections/PlayerComparison";
import PremierLeagueStandings from "../components/sections/PremierLeagueStandings";
import { PREMIER_LEAGUE_CLUBS } from "../config/premierLeagueClubs";

export default function Dashboard({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState("Team Performance");
  const [selectedSeason, setSelectedSeason] = useState("2023");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items configuration goes here 
  const navItems = [
    { label: "Team Performance", icon: "📈", description: "Team KPIs and match analysis" },
    { label: "Player Analysis", icon: "👤", description: "Individual and squad performance" },
    { label: "Player Comparison", icon: "⚖️", description: "Compare player statistics and attributes" },
    { label: "League Standings", icon: "🏆", description: "Premier League table and stats" },
  ];

  const filterConfig = {
    selectedSeason,
    setSelectedSeason,
    selectedTeam,
    setSelectedTeam
  };

  // get the selected team details for display
  const getSelectedTeamDetails = () => {
    if (!selectedTeam) return null;
    return PREMIER_LEAGUE_CLUBS.CLUBS.find(club => club.id === parseInt(selectedTeam));
  };

  const selectedTeamDetails = getSelectedTeamDetails();

  // let's render appropriate section based on active tab
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
      case "Player Comparison":
        return <PlayerComparison 
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
      {/* hide the side component */}
      <div className={`fixed lg:relative z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <Sidebar
          user={user}
          onLogout={onLogout}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          navItems={navItems}
          filterConfig={filterConfig}
          premierLeagueClubs={PREMIER_LEAGUE_CLUBS.CLUBS}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 lg:p-8 overflow-y-auto relative">
        {/* Mobile Header goes here */}
        <div className="lg:hidden flex items-center justify-between mb-4 p-4 bg-gray-800/50 rounded-lg">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-cyan-400 truncate max-w-xs mx-auto">
              {activeSection}
            </h2>
          </div>
          
          <div className="w-10"></div>
        </div>

        {/* header for the desktop mode */}
        <div className="hidden lg:flex justify-between items-center mb-6 lg:mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-cyan-400">{activeSection}</h2>
            <p className="text-gray-400 mt-1 text-sm lg:text-base">
              {navItems.find(item => item.label === activeSection)?.description}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-300 text-sm lg:text-base">
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
                  <span className="hidden sm:inline">{selectedTeamDetails.name}</span>
                  <span className="sm:hidden">{selectedTeamDetails.shortName || selectedTeamDetails.name}</span>
                </span>
              ) : (
                "Select a team to begin analysis"
              )}
            </p>
          </div>
        </div>

        {/* header for the mobile mode  */}
        <div className="lg:hidden bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Season</label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="2023">2023/24</option>
                <option value="2022">2022/23</option>
                <option value="2021">2021/22</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Team</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">All Teams</option>
                {PREMIER_LEAGUE_CLUBS.CLUBS.map(club => (
                  <option key={club.id} value={club.id}>{club.shortName || club.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {renderActiveSection()}
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-30">
          <div className="grid grid-cols-4 gap-1 p-2">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveSection(item.label);
                  window.scrollTo(0, 0);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-md text-xs ${
                  activeSection === item.label
                    ? "text-cyan-400 bg-cyan-900/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="truncate max-w-full">{item.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden h-16"></div>
      </main>
    </div>
  );
}