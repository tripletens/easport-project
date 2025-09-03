import { useProject } from '../ProjectContext';

const MetricTranslation = () => {
  const { researchMode } = useProject();

  const metricMappings = {
    prototype: [
      { football: "Goals Scored", esports: "Eliminations/Kills", description: "Offensive performance metric" },
      { football: "Pass Accuracy", esports: "Accuracy/Headshot %", description: "Precision and skill metric" },
      { football: "Possession %", esports: "Map Control %", description: "Strategic dominance metric" },
      { football: "Clean Sheets", esports: "Flawless Rounds", description: "Defensive performance metric" }
    ],
    esports: [
      { football: "Goals Scored", esports: "Eliminations/Kills", description: "Offensive performance metric" },
      { football: "Pass Accuracy", esports: "Accuracy/Headshot %", description: "Precision and skill metric" },
      { football: "Possession %", esports: "Map Control %", description: "Strategic dominance metric" },
      { football: "Clean Sheets", esports: "Flawless Rounds", description: "Defensive performance metric" }
    ]
  };

  const currentMetrics = metricMappings[researchMode];

  return (
    <div className="p-4 bg-gray-800/30 rounded-lg mt-4">
      <h4 className="text-md font-semibold text-cyan-300 mb-3">
        {researchMode === 'prototype' 
          ? "Prototype Metric Translation to eSports" 
          : "eSports Performance Metrics"
        }
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentMetrics.map((metric, index) => (
          <div key={index} className="p-3 bg-gray-700/40 rounded border border-gray-600">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-300">
                  {researchMode === 'prototype' ? metric.football : metric.esports}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {researchMode === 'prototype' 
                    ? `→ eSports: ${metric.esports}` 
                    : `← Football equivalent: ${metric.football}`
                  }
                </div>
              </div>
            </div>
            <div className="text-xs text-cyan-400 mt-2">{metric.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricTranslation;