import React, { useState } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import MistakeSelector from '../MistakeSelector';
import SimulatorLayout from '../SimulatorLayout';
import Documentation from '../Documentation';
import { motion } from 'framer-motion';

const Desktop = ({ simulatorState }) => {
    const [windows, setWindows] = useState([
        { id: 'mission', title: 'Mission Control', isOpen: true, isMinimized: false, zIndex: 1, pos: { x: 50, y: 50 }, size: { width: 400, height: 600 } },
        { id: 'studio', title: 'DevMistakes Studio', isOpen: true, isMinimized: false, zIndex: 2, pos: { x: 480, y: 50 }, size: { width: 900, height: 700 } },
        { id: 'docs', title: 'Documentation', isOpen: false, isMinimized: false, zIndex: 3, pos: { x: 100, y: 100 }, size: { width: 800, height: 600 } }
    ]);

    const bringToFront = (id) => {
        const maxZ = Math.max(...windows.map(w => w.zIndex));
        setWindows(windows.map(w =>
            w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
        ));
    };

    const toggleWindow = (id) => {
        setWindows(windows.map(w => {
            if (w.id === id) {
                if (w.isMinimized) return { ...w, isMinimized: false, zIndex: Math.max(...windows.map(win => win.zIndex)) + 1 };
                return { ...w, isMinimized: true };
            }
            return w;
        }));
    };

    const closeWindow = (id) => {
        setWindows(windows.map(w => w.id === id ? { ...w, isOpen: false } : w));
    };

    const openWindow = (id) => {
        setWindows(windows.map(w =>
            w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: Math.max(...windows.map(win => win.zIndex)) + 1 } : w
        ));
    };

    const renderWindowContent = (id) => {
        switch (id) {
            case 'mission':
                return (
                    <div style={{ padding: '1rem', height: '100%', overflowY: 'auto' }}>
                        <MistakeSelector
                            mistakes={simulatorState.mistakes}
                            selectedId={simulatorState.selectedMistake.id}
                            onSelect={simulatorState.selectMistake}
                        />
                    </div>
                );
            case 'studio':
                return (
                    <div style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                        <SimulatorLayout
                            mistake={simulatorState.selectedMistake}
                            isFixed={simulatorState.isFixed}
                            toggleFix={simulatorState.toggleFix}
                            viewMode={simulatorState.viewMode}
                            soundEnabled={simulatorState.soundEnabled}
                        />
                    </div>
                );
            case 'docs':
                return <Documentation />;
            default: return null;
        }
    };

    // Derived state for Taskbar
    const taskbarWindows = windows.map(w => ({
        id: w.id,
        title: w.title,
        isOpen: w.isOpen,
        isActive: !w.isMinimized && w.zIndex === Math.max(...windows.map(ww => ww.zIndex))
    }));

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
        }}>
            {/* Overlay for readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />

            {/* Application Windows */}
            {windows.map(win => (
                <Window
                    key={win.id}
                    id={win.id}
                    title={win.title}
                    isOpen={win.isOpen}
                    isMinimized={win.isMinimized}
                    zIndex={win.zIndex}
                    initialPos={win.pos}
                    initialSize={win.size}
                    onClose={closeWindow}
                    onMinimize={toggleWindow}
                    onFocus={bringToFront}
                >
                    {renderWindowContent(win.id)}
                </Window>
            ))}

            <Taskbar
                windows={taskbarWindows}
                onWindowClick={toggleWindow}
                onStartClick={() => openWindow('docs')}
                onExit={() => simulatorState.setMainView('simulator')}
            />
        </div>
    );
};

export default Desktop;
