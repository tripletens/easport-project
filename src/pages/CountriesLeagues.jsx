export default function CountriesLeagues() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-500 mb-6">🌍 Countries & Leagues</h1>
      <p className="text-gray-600 mb-4">Select a country or league to filter performance stats.</p>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Select Country</label>
          <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-400">
            <option>England</option>
            <option>Spain</option>
            <option>Germany</option>
            <option>France</option>
            <option>Italy</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Select League</label>
          <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-cyan-400">
            <option>Premier League</option>
            <option>La Liga</option>
            <option>Bundesliga</option>
            <option>Ligue 1</option>
            <option>Serie A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
