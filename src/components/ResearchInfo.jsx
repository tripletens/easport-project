// src/components/ResearchInfo.jsx
import { useProject } from './ProjectContext';

const ResearchInfo = () => {
  const project = useProject();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-800/90 border border-cyan-500 rounded-lg p-4 max-w-xs text-xs">
        <div className="font-bold text-cyan-300 mb-2">Research Project</div>
        <div className="text-gray-300">{project.projectTitle}</div>
        <div className="text-gray-400 mt-1">
          {project.student} | {project.studentId} | {project.programme}
        </div>
        <div className="text-gray-400">Supervisor: {project.supervisor}</div>
        <div className="mt-2 text-gray-500">
          Current mode: <span className="text-cyan-400">{project.researchMode}</span>
        </div>
      </div>
    </div>
  );
};

export default ResearchInfo;