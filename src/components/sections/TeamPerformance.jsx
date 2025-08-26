import {KPICards} from "../charts/KPICards";
import {RadarChart} from "../charts/RadarChart";
import SimpleD3Test from "../charts/SimpleD3Test";
import CountriesTest from "../test/CountriesTest";
import CountriesList from "./CountriesList";

export default function TeamPerformance({ selectedLeague, selectedSeason, selectedTeam }) {
  if (!selectedTeam) {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-center">Please select a team to view performance data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <KPICards 
        league={selectedLeague} 
        season={selectedSeason} 
        team={selectedTeam} 
      />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends Card */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">Performance Trends</h3>
          <div className="h-64 bg-gray-900/30 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Line Chart: Goals scored/conceded over time</span>
          </div>
        </div>

        {/* Radar Chart Card */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-300 mb-4">Strength Radar</h3>
          <RadarChart 
            league={selectedLeague} 
            season={selectedSeason} 
            team={selectedTeam} 
          />
        </div>
      </div>

      {/* Additional Team Stats */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-cyan-300 mb-4">Match Statistics</h3>
        <div className="h-48 bg-gray-900/30 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Match history table and statistics</span>
            <CountriesTest />
        </div>
      </div>
    </div>
  );
}