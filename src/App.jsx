import MainLayout from './components/layout/MainLayout';
import ViewManager from './components/layout/ViewManager';
import { useAppController } from './hooks/useAppController';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { simulatorState, projectManager } = useAppController();

  return (
    <MainLayout simulatorState={simulatorState}>
      <AnimatePresence mode="wait">
        <motion.div
          key={simulatorState.mainView}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <ViewManager
            {...simulatorState}
            {...projectManager}
          />
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
