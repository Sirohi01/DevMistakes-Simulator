import React from 'react';
import Header from '../Header';
import SettingsModal from '../SettingsModal';
import AIAssistant from '../AIAssistant';
import AppFooter from './AppFooter';
import GlobalHUD from './GlobalHUD';

const MainLayout = ({
    children,
    simulatorState
}) => {
    const {
        mainView,
        setMainView,
        selectedMistake,
        isFixed,
        xp,
        level,
        theme,
        setTheme,
        apiKey,
        setApiKey,
        soundEnabled,
        setSoundEnabled,
        isSettingsOpen,
        setIsSettingsOpen
    } = simulatorState;

    return (
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>
            <Header
                currentView={mainView}
                onViewChange={setMainView}
                xp={xp}
                level={level}
                theme={theme}
                setTheme={setTheme}
                onOpenSettings={() => setIsSettingsOpen(true)}
            />

            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                apiKey={apiKey}
                setApiKey={setApiKey}
                soundEnabled={soundEnabled}
                setSoundEnabled={setSoundEnabled}
            />

            <main style={{
                maxWidth: '1440px',
                margin: '0 auto',
                width: '100%',
                padding: '0 var(--main-padding) var(--main-padding)',
                flex: 1
            }}>
                {/* Global Hub - Command Center Status */}
                {mainView === 'simulator' && <GlobalHUD isFixed={isFixed} />}

                {children}
            </main>

            <AppFooter />

            <AIAssistant
                apiKey={apiKey}
                currentMistake={selectedMistake}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
                body {
                    background-color: var(--bg-page) !important;
                    color: var(--text-main) !important;
                    transition: background-color var(--transition-speed), color var(--transition-speed);
                }

                .simulator-grid {
                    display: grid;
                    grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
                    gap: 2.5rem;
                    align-items: start;
                }

                @media (max-width: 1100px) {
                  .simulator-grid { grid-template-columns: 1fr !important; gap: 1.5rem; }
                  .selector-aside { 
                    width: 100% !important; 
                    order: -1; 
                    height: auto !important;
                    border-right: none !important;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 1rem !important;
                    position: static !important;
                  }
                }

                @media (max-width: 768px) {
                  .global-hud { padding: 1rem !important; gap: 1rem !important; }
                  .hud-divider { display: none !important; }
                  .hud-metrics { gap: 1rem !important; }
                }
              `}} />
        </div>
    );
};

export default MainLayout;
