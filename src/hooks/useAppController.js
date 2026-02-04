import { useSimulatorState } from './useSimulatorState';
import { useProjectManager } from './useProjectManager';
import { useChaos } from './useChaos';

export const useAppController = () => {
    const simulatorState = useSimulatorState();
    const chaosState = useChaos(true, 0.5); // Default enabled for Phase 7 testing

    const projectManager = useProjectManager(
        simulatorState.addXp,
        simulatorState.setMainView
    );

    return {
        simulatorState: { ...simulatorState, chaos: chaosState },
        projectManager
    };
};
