import { useState } from 'react';

export const useProjectManager = (addXp, setMainView) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [completedProjects, setCompletedProjects] = useState([]);

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setMainView('project-debug');
    };

    const handleProjectComplete = (result) => {
        if (result.perfectScore && selectedProject) {
            setCompletedProjects(prev => [...prev, selectedProject.id]);
            addXp(result.xpEarned);
        }
        setSelectedProject(null);
        setMainView('projects');
    };

    return {
        selectedProject,
        completedProjects,
        handleProjectSelect,
        handleProjectComplete
    };
};
