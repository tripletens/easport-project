// src/components/ResearchMethodology.jsx
const ResearchMethodology = () => {
  return (
    <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <h3 className="text-lg font-semibold text-cyan-300 mb-4">Research Methodology</h3>
      
      <div className="prose prose-invert prose-sm">
        <h4 className="text-cyan-200">Prototype Development Approach</h4>
        <p className="text-gray-300">
          This football analytics dashboard serves as a technical prototype for the eSports 
          data visualization research. The architecture, components, and data processing 
          patterns demonstrated here are designed for adaptation to eSports analytics.
        </p>

        <h4 className="text-cyan-200 mt-6">Visualization Techniques Under Study</h4>
        <ul className="text-gray-300">
          <li>Radar charts for multi-dimensional performance comparison</li>
          <li>Time-series analysis for performance trends</li>
          <li>Interactive filtering for dynamic data exploration</li>
          <li>Real-time data integration patterns</li>
          <li>User interface designs for coach/analyst stakeholders</li>
        </ul>

        <h4 className="text-cyan-200 mt-6">Evaluation Methodology</h4>
        <p className="text-gray-300">
          The usability evaluation will involve 20+ eSports stakeholders testing 
          the adapted version of these visualization patterns with actual eSports data. 
          Feedback will be collected on effectiveness, usability, and actionable insights.
        </p>
      </div>
    </div>
  );
};

export default ResearchMethodology;