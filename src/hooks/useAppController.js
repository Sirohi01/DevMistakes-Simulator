import { useSimulatorState } from './useSimulatorState';
import { useProjectManager } from './useProjectManager';

export const useAppController = () => {
    const simulatorState = useSimulatorState();

    const projectManager = useProjectManager(
        simulatorState.addXp,
        simulatorState.setMainView
    );

    return {
        simulatorState,
        projectManager
    };
};
