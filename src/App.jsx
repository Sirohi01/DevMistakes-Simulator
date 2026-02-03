import React from 'react';
import Header from './components/Header';
import MistakeSelector from './components/MistakeSelector';
import SimulatorLayout from './components/SimulatorLayout';
import ExplanationPanel from './components/ExplanationPanel';
import ToggleView from './components/ToggleView';
import ChallengeMode from './components/ChallengeMode';
import LivePlayground from './components/LivePlayground';
import Documentation from './components/Documentation';
import CodeAnalyzer from './components/CodeAnalyzer';
import { useSimulatorState } from './hooks/useSimulatorState';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const {
    mainView,
    setMainView,
    selectedMistake,
    isFixed,
    viewMode,
    selectMistake,
    toggleFix,
    setView,
    mistakes
  } = useSimulatorState();

  const renderContent = () => {
    switch (mainView) {
      case 'docs':
        return <Documentation key="docs-view" />;
      case 'analyzer':
        return <CodeAnalyzer key="analyzer-view" />;
      case 'challenge':
        return <ChallengeMode key="challenge-view" mistakes={mistakes} />;
      case 'playground':
        return <LivePlayground key="playground-view" mistake={selectedMistake} />;
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
              />

              <ExplanationPanel mistake={selectedMistake} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>
      <Header
        currentView={mainView}
        onViewChange={setMainView}
      />

      <main style={{
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        padding: '0 var(--main-padding) var(--main-padding)',
        flex: 1
      }}>
        {/* Global Hub - Command Center Status */}
        {mainView === 'simulator' && (
          <div className="animate-slide-up" style={{
            display: 'flex', gap: '1.5rem', marginBottom: '2.5rem',
            padding: '1.25rem 2rem', background: 'rgba(99, 102, 241, 0.03)',
            borderRadius: '24px', border: '1px solid var(--border-color)',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isFixed ? 'var(--color-success)' : 'var(--color-error)', boxShadow: `0 0 10px ${isFixed ? 'var(--color-success)' : 'var(--color-error)'}` }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Project Health: {isFixed ? 'Optimized' : 'Degraded'}</span>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', gap: '2rem' }}>
              <StatusMetric label="Audit Coverage" value="84%" />
              <StatusMetric label="Security Flaws" value={isFixed ? '0' : '2'} color={isFixed ? 'white' : 'var(--color-error)'} />
              <StatusMetric label="Render Latency" value={isFixed ? '14ms' : '142ms'} color={isFixed ? 'var(--color-success)' : 'var(--color-error)'} />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={mainView}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-dim)',
        fontSize: '0.85rem',
        background: 'rgba(0,0,0,0.2)'
      }}>
        <p>Built with ❤️ for the Developer Community. Learn, Verify, and Ship Clean Code.</p>
        <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--accent-primary)' }}>#ReactJS</span>
          <span style={{ color: 'var(--accent-secondary)' }}>#CSSGrid</span>
          <span style={{ color: 'var(--color-success)' }}>#WebDev</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
            --main-padding: 2rem;
            --sidebar-width: 320px;
            --bg-page: #05060f;
            --bg-card: rgba(13, 14, 28, 0.7);
            --text-main: #ffffff;
            --text-muted: #94a3b8;
            --text-dim: #64748b;
            --border-color: rgba(255, 255, 255, 0.08);
            --accent-primary: #6366f1;
            --accent-secondary: #a855f7;
            --color-success: #22c55e;
            --color-error: #ef4444;
            --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        }

        body {
            background-color: var(--bg-page) !important;
            color: var(--text-main) !important;
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
        @media (max-width: 640px) {
          :root { --main-padding: 1rem; }
          header { padding: 0.75rem 1rem !important; }
        }
      `}} />
    </div>
  );
}

export default App;

const StatusMetric = ({ label, value, color = 'var(--text-muted)' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{label}:</span>
    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: color }}>{value}</span>
  </div>
);
