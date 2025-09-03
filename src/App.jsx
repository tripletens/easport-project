import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ProjectProvider, useProject } from "./components/ProjectContext";
import ResearchInfo from "./components/ResearchInfo";

function AppContent() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const project = useProject();

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div className="h-screen w-screen">
      <ResearchInfo />
      {loggedInUser ? (
        <Dashboard 
          user={loggedInUser} 
          onLogout={handleLogout} 
          researchMode={project.researchMode}
        />
      ) : (
        <Login onLogin={setLoggedInUser} />
      )}
    </div>
  );
}

function App() {
  return (
    <ProjectProvider>
      <AppContent />
    </ProjectProvider>
  );
}

export default App;