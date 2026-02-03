import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap, Play, Code, Eye, AlertCircle, CheckCircle2,
    Terminal as TerminalIcon, ShieldCheck, Rocket, MessageSquare,
    User, HardHat, Cpu, ExternalLink
} from 'lucide-react';
import PreviewFrame from './PreviewFrame';

const SimulatorLayout = ({ mistake, isFixed, toggleFix, viewMode }) => {
    const [deploying, setDeploying] = useState(false);
    const [deployStatus, setDeployStatus] = useState(null); // 'success', 'fail'
    const [terminalLogs, setTerminalLogs] = useState([]);

    // Simulate logs when toggling
    useEffect(() => {
        const newLog = isFixed
            ? `[INFO] Optimized pattern for ${mistake.id} detected.`
            : `[WARN] Anti-pattern in ${mistake.title}. Re-render leak potential.`;
        setTerminalLogs(prev => [newLog, ...prev].slice(0, 5));
    }, [isFixed, mistake]);

    const handleShip = () => {
        setDeploying(true);
        setDeployStatus(null);
        setTimeout(() => {
            setDeploying(false);
            setDeployStatus(isFixed ? 'success' : 'fail');
        }, 2000);
    };

    const AIPeerReview = () => {
        const reviews = [
            { role: 'Junior', comment: isFixed ? 'This is clean, I can understand it!' : 'It works for me, I dont see the issue.', icon: User, color: '#94a3b8' },
            { role: 'Senior', comment: isFixed ? 'Solid production pattern. Approved.' : 'Memory leak risk. Rejected.', icon: HardHat, color: '#f59e0b' },
            { role: 'Architect', comment: isFixed ? 'Standardized & Scalable. Good job.' : 'Breaks core reconciliation. Critical fail.', icon: Cpu, color: '#ef4444' }
        ];

        return (
            <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <MessageSquare size={14} className="text-accent" />
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Peer Review</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {reviews.map((rev, i) => (
                        <div key={i} className="glass" style={{ padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                                <rev.icon size={14} style={{ color: rev.color }} />
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: rev.color }}>{rev.role}</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>"{rev.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="simulator-layout">
            {/* Header with Ship Logic */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                            {mistake.category}
                        </span>
                    </div>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{mistake.title}</h2>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={toggleFix}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            background: isFixed ? 'var(--color-success)' : 'var(--color-error)',
                            border: 'none',
                            color: 'white',
                            boxShadow: isFixed ? '0 8px 20px -5px rgba(34, 197, 94, 0.4)' : '0 8px 20px -5px rgba(239, 68, 68, 0.4)'
                        }}
                    >
                        {isFixed ? <ShieldCheck size={18} /> : <AlertCircle size={18} />}
                        {isFixed ? 'Stable' : 'Unstable'}
                    </button>

                    <button
                        onClick={handleShip}
                        disabled={deploying}
                        style={{
                            padding: '12px 20px', borderRadius: '12px', background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)', color: 'white',
                            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {deploying ? <Rocket size={18} className="animate-spin" /> : <Rocket size={18} />}
                        Ship to Prod
                    </button>
                </div>
            </div>

            {/* Display Area */}
            <div style={{ position: 'relative' }}>
                <AnimatePresence mode="wait">
                    {viewMode === 'preview' ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="glass"
                            style={{ padding: '2.5rem', borderRadius: '24px', minHeight: '350px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
                        >
                            <PreviewFrame mistakeId={mistake.id} isFixed={isFixed} />

                            {/* Pipeline Overlay */}
                            <AnimatePresence>
                                {deployStatus && (
                                    <motion.div
                                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                                        animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            position: 'absolute', inset: 0, zIndex: 100,
                                            background: 'rgba(5, 6, 15, 0.85)',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                                        }}
                                    >
                                        <div style={{
                                            padding: '3rem', borderRadius: '30px', background: 'var(--bg-card)',
                                            border: `2px solid ${deployStatus === 'success' ? 'var(--color-success)' : 'var(--color-error)'}`,
                                            textAlign: 'center', maxWidth: '400px'
                                        }}>
                                            {deployStatus === 'success' ? <CheckCircle2 size={64} color="var(--color-success)" style={{ margin: '0 auto 1.5rem' }} /> : <AlertCircle size={64} color="var(--color-error)" style={{ margin: '0 auto 1.5rem' }} />}
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>
                                                {deployStatus === 'success' ? 'CI/CD: PASSED' : 'CI/CD: FAILED'}
                                            </h3>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                                {deployStatus === 'success'
                                                    ? 'Your code passed all production safety benchmarks. Optimization is active.'
                                                    : 'Security/Performance breach detected in pre-flight checks. Build abandoned.'}
                                            </p>
                                            <button onClick={() => setDeployStatus(null)} style={{ padding: '10px 24px', borderRadius: '10px', background: 'var(--accent-primary)', color: 'white', fontWeight: 700 }}>Dismiss Report</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="code"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="glass"
                            style={{ padding: '2rem', borderRadius: '24px', background: '#05060f', border: '1px solid var(--border-color)', height: '350px', overflow: 'auto' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                                </div>
                                <span>{mistake.type === 'react' ? 'React.jsx' : 'Style.css'}</span>
                            </div>
                            <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: 1.6, color: '#a5b4fc' }}>
                                {isFixed ? mistake.fixedCode : mistake.brokenCode}
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom God-Tier Panels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '2rem', marginTop: '2.5rem' }}>
                <AIPeerReview />

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                        <TerminalIcon size={14} className="text-accent" />
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Debug Terminal</span>
                    </div>
                    <div style={{
                        background: '#000', borderRadius: '16px', padding: '1.25rem', height: '180px',
                        overflowY: 'auto', border: '1px solid #111', fontFamily: 'var(--font-mono)', fontSize: '0.75rem'
                    }} className="custom-scrollbar">
                        {terminalLogs.map((log, i) => (
                            <div key={i} style={{ color: log.includes('WARN') ? '#fbbf24' : '#10b981', marginBottom: '6px', whiteSpace: 'nowrap' }}>
                                <span style={{ opacity: 0.4 }}>$</span> {log}
                            </div>
                        ))}
                        <div style={{ display: 'inline-block', width: '8px', height: '15px', background: 'var(--accent-primary)', verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes blink { 50% { opacity: 0; } }
                .text-accent { color: var(--accent-primary); }
            `}} />
        </div>
    );
};

export default SimulatorLayout;
