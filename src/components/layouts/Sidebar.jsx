export default function Sidebar({ 
  user, 
  onLogout, 
  activeSection, 
  setActiveSection, 
  navItems, 
  filterConfig 
}) {
  const {
    selectedLeague,
    setSelectedLeague,
    selectedSeason,
    setSelectedSeason,
    selectedTeam,
    setSelectedTeam
  } = filterConfig;

  return (
    <aside className="w-72 bg-gray-900/95 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-700">
        <h1 className="text-2xl font-extrabold text-cyan-400 tracking-wide mb-2">
          Football Analytics Pro
        </h1>
        <p className="text-sm text-gray-400">Coach's Intelligence Platform</p>
      </div>

      {/* Global Filters */}
      <div className="p-4 border-b border-gray-700 space-y-3">
        <h3 className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">Data Context</h3>
        
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">League</label>
          <select
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="PL">Premier League</option>
            <option value="LaLiga">La Liga</option>
            <option value="Bundesliga">Bundesliga</option>
            <option value="SerieA">Serie A</option>
            <option value="Ligue1">Ligue 1</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Season</label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="2023">2023/24</option>
            <option value="2022">2022/23</option>
            <option value="2021">2021/22</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Team</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="w-full text-sm px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="">Select Team</option>
            <option value="TOT">Tottenham Hotspur</option>
            <option value="ARS">Arsenal</option>
            <option value="MCI">Manchester City</option>
            <option value="LIV">Liverpool</option>
            <option value="CHE">Chelsea</option>
            <option value="MU">Manchester United</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveSection(item.label)}
            className={`w-full text-left flex items-start gap-3 py-3 px-4 rounded-lg transition-all ${
              activeSection === item.label
                ? "bg-cyan-600/20 border-l-4 border-cyan-400 text-cyan-200"
                : "hover:bg-gray-800/50 hover:text-cyan-300 text-gray-400 border-l-4 border-transparent"
            }`}
          >
            <span className="text-lg mt-0.5">{item.icon}</span>
            <div className="flex-1">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs opacity-70 mt-1">{item.description}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-200">{user.username}</div>
            <div className="text-xs text-gray-500">Head Coach</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-red-600/20 hover:text-red-300 transition text-gray-400 text-sm"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}