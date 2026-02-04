import { useState, useEffect, useCallback } from 'react';

export const useChaos = (isEnabled = false, intensity = 0.1) => {
    const [chaosError, setChaosError] = useState(null);
    const [isOffline, setIsOffline] = useState(false);

    const injectChaos = useCallback(() => {
        if (!isEnabled) return;

        const roll = Math.random();

        // 1. Network Failure (30% chance of rolled chaos)
        if (roll < intensity * 0.3) {
            setIsOffline(true);
            setTimeout(() => setIsOffline(false), 3000); // 3s outage
            return 'Network Interrupted';
        }

        // 2. Random Exception (10% chance)
        if (roll < intensity * 0.1) {
            const error = new Error("🔥 CAUGHT IN CHAOS: Random Runtime Failure injected!");
            setChaosError(error);
            return 'Critical Failure';
        }

        // 3. Latency Spike (Simulated via Promise delay helper)
        if (roll < intensity * 0.5) {
            return 'High Latency';
        }

        return null;
    }, [isEnabled, intensity]);

    // Reset error when user acknowledges
    const clearChaos = () => setChaosError(null);

    return {
        chaosError,
        isOffline,
        injectChaos,
        clearChaos
    };
};

// Helper for delaying promises
export const chaosDelay = (ms, isChaosMode) => {
    if (!isChaosMode) return new Promise(r => setTimeout(r, ms));

    // In chaos mode, delay is random 0-2000ms extra, or throws error
    return new Promise((resolve, reject) => {
        if (Math.random() < 0.1) {
            setTimeout(() => reject(new Error("Timeout: Server took too long")), 2000);
        } else {
            const delay = ms + Math.random() * 2000;
            setTimeout(resolve, delay);
        }
    });
};
