// src/components/ProjectContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Academic project context to document research connections
const ProjectContext = createContext();

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [researchMode, setResearchMode] = useState('prototype'); // 'prototype' or 'esports'
  
  const projectData = {
    // Academic project metadata
    projectTitle: "Interactive Data Visualization Model for eSports Data Analysis",
    student: "Emeka Umezuruike",
    studentId: "240156853",
    supervisor: "Ming Jiang",
    programme: "MSc Computing",
    year: "2024/25",
    
    // Research objectives
    objectives: [
      "Data collection and pre-processing from multiple sources",
      "JavaScript-based interactive visualization model",
      "User-friendly dashboard with key performance indicators",
      "Usability evaluation with stakeholders",
      "Actionable insights and recommendations"
    ],
    
    // Current status
    currentPhase: "Prototype Development",
    researchMode,
    setResearchMode,
    
    // Connection between prototype and final product
    prototypePurpose: `
      This football analytics dashboard serves as a technical prototype 
      demonstrating the visualization architecture, data integration patterns, 
      and user interface design that will be applied to eSports data analysis.
      All visualization components and data processing patterns are designed
      for adaptation to eSports metrics including K/D ratios, win rates, and
      strategy efficiency analysis.
    `
  };

  return (
    <ProjectContext.Provider value={projectData}>
      {children}
    </ProjectContext.Provider>
  );
};