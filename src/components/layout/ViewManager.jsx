import React from 'react';
import MistakeSelector from '../MistakeSelector';
import SimulatorLayout from '../SimulatorLayout';
import ExplanationPanel from '../ExplanationPanel';
import ToggleView from '../ToggleView';
import ChallengeMode from '../ChallengeMode';
import LivePlayground from '../LivePlayground';
import Documentation from '../Documentation';
import CodeAnalyzer from '../CodeAnalyzer';
import ProgressDashboard from '../ProgressDashboard';
import ProjectMode from '../ProjectMode';
import TodoProject from '../projects/TodoProject';
import CartProject from '../projects/CartProject';
import DashboardProject from '../projects/DashboardProject';

import Desktop from '../os/Desktop';

const ViewManager = ({
    mainView,
    setMainView,
    selectedMistake,
    mistakes,
    selectMistake,
    isFixed,
    toggleFix,
    viewMode,
    setView,
    soundEnabled,
    xp,
    level,
    addXp,
    selectedProject,
    handleProjectSelect,
    completedProjects,
    handleProjectComplete,
    chaos,
    apiKey
}) => {

    switch (mainView) {
        case 'desktop':
            return <Desktop simulatorState={{
                mainView, setMainView, selectedMistake, mistakes, selectMistake,
                isFixed, toggleFix, viewMode, setView, soundEnabled, xp, level, addXp, chaos, apiKey
            }} />;
        case 'docs':
            return <Documentation key="docs-view" />;
        case 'analyzer':
            return <CodeAnalyzer key="analyzer-view" onAddXp={addXp} apiKey={apiKey} />;
        case 'challenge':
            return <ChallengeMode key="challenge-view" mistakes={mistakes} onAddXp={addXp} />;
        case 'playground':
            return <LivePlayground key="playground-view" mistake={selectedMistake} apiKey={apiKey} />;
        case 'progress':
            return <ProgressDashboard key="progress-view" xp={xp} level={level} />;
        case 'projects':
            return <ProjectMode
                key="projects-view"
                onSelectProject={handleProjectSelect}
                completedProjects={completedProjects}
            />;
        case 'project-debug':
            if (selectedProject?.id === 'todo-bugs') {
                return <TodoProject
                    key="todo-project"
                    onComplete={handleProjectComplete}
                    onBack={() => setMainView('projects')}
                />;
            }
            if (selectedProject?.id === 'cart-issues') {
                return <CartProject
                    key="cart-project"
                    onComplete={handleProjectComplete}
                    onBack={() => setMainView('projects')}
                />;
            }
            if (selectedProject?.id === 'dashboard-perf') {
                return <DashboardProject
                    key="dashboard-project"
                    onComplete={handleProjectComplete}
                    onBack={() => setMainView('projects')}
                />;
            }
            return <ProjectMode onSelectProject={handleProjectSelect} completedProjects={completedProjects} />;
        default:
            return (
                <div className="simulator-grid" key="simulator-main">
                    <MistakeSelector
                        mistakes={mistakes}
                        selectedId={selectedMistake.id}
                        onSelect={selectMistake}
                    />

                    <div className="main-content-area" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <ToggleView activeMode={viewMode} onChange={setView} />

                        <SimulatorLayout
                            mistake={selectedMistake}
                            isFixed={isFixed}
                            toggleFix={toggleFix}
                            viewMode={viewMode}
                            soundEnabled={soundEnabled}
                        />

                        <ExplanationPanel mistake={selectedMistake} />
                    </div>
                </div>
            );
    }
};

export default ViewManager;
