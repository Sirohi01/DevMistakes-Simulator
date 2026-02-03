import { useState, useCallback } from 'react';
import { MISTAKES } from '../data/mistakes.config';

export const useSimulatorState = () => {
    const [mainView, setMainView] = useState('simulator');
    const [selectedId, setSelectedId] = useState(MISTAKES[0].id);
    const [isFixed, setIsFixed] = useState(false);
    const [viewMode, setViewMode] = useState('preview');
    const [score, setScore] = useState(0);

    const selectedMistake = MISTAKES.find(m => m.id === selectedId) || MISTAKES[0];

    const selectMistake = useCallback((id) => {
        setSelectedId(id);
        setIsFixed(false);
        setMainView(prev => prev === 'docs' || prev === 'analyzer' ? 'simulator' : prev);
    }, []);

    const toggleFix = useCallback(() => setIsFixed(prev => !prev), []);
    const setView = useCallback((mode) => setViewMode(mode), []);
    const updateScore = useCallback((pts) => setScore(s => s + pts), []);

    return {
        mainView,
        setMainView,
        selectedMistake,
        isFixed,
        viewMode,
        score,
        updateScore,
        selectMistake,
        toggleFix,
        setView,
        mistakes: MISTAKES
    };
};
