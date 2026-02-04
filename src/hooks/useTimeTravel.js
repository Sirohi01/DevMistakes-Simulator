import { useState, useCallback } from 'react';

export const useTimeTravel = (initialState) => {
    const [history, setHistory] = useState([{ code: initialState, timestamp: Date.now() }]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const updateState = useCallback((newState) => {
        setHistory(prev => {
            const newHistory = prev.slice(0, currentIndex + 1);
            return [...newHistory, { code: newState, timestamp: Date.now() }];
        });
        setCurrentIndex(prev => prev + 1);
    }, [currentIndex]);

    const goBack = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const goForward = () => {
        if (currentIndex < history.length - 1) setCurrentIndex(prev => prev + 1);
    };

    const goToIndex = (index) => {
        if (index >= 0 && index < history.length) setCurrentIndex(index);
    };

    return {
        currentState: history[currentIndex]?.code || initialState,
        history,
        currentIndex,
        updateState,
        goBack,
        goForward,
        goToIndex,
        canUndo: currentIndex > 0,
        canRedo: currentIndex < history.length - 1
    };
};
