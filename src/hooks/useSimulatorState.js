import { useState, useCallback, useEffect } from 'react';
import { MISTAKES } from '../data/mistakes.config';

export const useSimulatorState = () => {
    const [mainView, setMainView] = useState(() => localStorage.getItem('sim_mainView') || 'simulator');
    const [selectedId, setSelectedId] = useState(() => localStorage.getItem('sim_selectedId') || MISTAKES[0].id);
    const [isFixed, setIsFixed] = useState(false);
    const [viewMode, setViewMode] = useState('preview');
    const [score, setScore] = useState(() => parseInt(localStorage.getItem('sim_score')) || 0);
    const [theme, setTheme] = useState(() => localStorage.getItem('sim_theme') || 'midnight');
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('sim_xp')) || 0);
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('sim_apiKey') || '');
    const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('sim_soundEnabled') !== 'false'); // Default true
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const level = Math.floor(xp / 500) + 1;
    const selectedMistake = MISTAKES.find(m => m.id === selectedId) || MISTAKES[0];

    // Apply theme to document element
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('sim_mainView', mainView);
        localStorage.setItem('sim_selectedId', selectedId);
        localStorage.setItem('sim_score', score.toString());
        localStorage.setItem('sim_theme', theme);
        localStorage.setItem('sim_xp', xp.toString());
        localStorage.setItem('sim_apiKey', apiKey);
        localStorage.setItem('sim_soundEnabled', soundEnabled.toString());
    }, [mainView, selectedId, score, theme, xp, apiKey, soundEnabled]);

    const selectMistake = useCallback((id) => {
        setSelectedId(id);
        setIsFixed(false);
        setMainView(prev => prev === 'docs' || prev === 'analyzer' ? 'simulator' : prev);
    }, []);

    const toggleFix = useCallback(() => setIsFixed(prev => !prev), []);
    const setView = useCallback((mode) => setViewMode(mode), []);
    const updateScore = useCallback((pts) => {
        setScore(s => s + pts);
        setXp(x => x + (pts > 0 ? pts : 0)); // Only add positive points to XP
    }, []);

    const addXp = useCallback((amount) => setXp(prev => prev + amount), []);

    return {
        mainView,
        setMainView,
        selectedMistake,
        isFixed,
        viewMode,
        score,
        theme,
        setTheme,
        xp,
        level,
        addXp,
        updateScore,
        selectMistake,
        toggleFix,
        setView,
        apiKey,
        setApiKey,
        soundEnabled,
        setSoundEnabled,
        isSettingsOpen,
        setIsSettingsOpen,
        mistakes: MISTAKES
    };
};
