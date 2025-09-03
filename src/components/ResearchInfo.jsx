import { useProject } from './ProjectContext';

const ResearchInfo = () => {
    const project = useProject();

    return (
        <div className=" bottom-6 left-6 z-50">
            <div className="bg-gray-800/90 border border-cyan-500 rounded-xl p-6 w-auto text-sm shadow-lg">
                <div className="font-bold text-cyan-300 mb-2">Research Project</div>
                <div className="text-gray-200 leading-snug">{project.projectTitle}</div>
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