import { useProject } from '../ProjectContext';

const EsportsModeToggle = () => {
  const { researchMode, setResearchMode } = useProject();

  return (
    // this place we will add the bottom right project details 
    <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-800/50 rounded-lg">
      <span className="text-sm text-gray-400">Research Mode:</span>
      <button
        onClick={() => setResearchMode('prototype')}
        className={`px-3 py-1 rounded text-xs ${
          researchMode === 'prototype'
            ? 'bg-cyan-600 text-white'
            : 'bg-gray-700 text-gray-300'
        }`}
      >
        Football Prototype
      </button>
      <button
        onClick={() => setResearchMode('esports')}
        className={`px-3 py-1 rounded text-xs ${
          researchMode === 'esports'
            ? 'bg-cyan-600 text-white'
            : 'bg-gray-700 text-gray-300'
        }`}
      >
        eSports Visualization
      </button>
    </div>
  );
};

export default EsportsModeToggle;