import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Code, Play, CheckCircle, AlertTriangle, RefreshCw, Zap,
    Box, Cpu, Globe, Terminal as TerminalIcon
} from 'lucide-react';

const LivePlayground = ({ mistake }) => {
    const [framework, setFramework] = useState('React');
    const [code, setCode] = useState('');
    const [status, setStatus] = useState('idle');
    const [feedback, setFeedback] = useState('');

    const getFrameworkCode = (fw) => {
        if (fw === 'Vue') return `// Vue 3 Composition API\n<script setup>\nconst state = reactive({ data: [] });\n\n// Mutation Bug: \nconst add = () => {\n  state.data.push(item);\n};\n</script>`;
        if (fw === 'Svelte') return `// Svelte 5 Stores\n<script>\nlet data = [];\n\n// Mutation Bug:\nfunction add() {\n  data.push(item);\n  data = data;\n}\n</script>`;
        return mistake.brokenCode;
    };

    useEffect(() => {
        setCode(getFrameworkCode(framework));
    }, [framework, mistake]);

    const runCode = () => {
        setStatus('testing');
        setTimeout(() => {
            const isFixed = code.toLowerCase().includes(mistake.fixedCode.toLowerCase().replace(/\s/g, '')) ||
                (code.includes('...') && framework === 'React') ||
                (code.includes('reactive') && framework === 'Vue');

            if (isFixed) {
                setStatus('success');
                setFeedback('Brilliant! Your optimization pattern is compatible with the target runtime.');
            } else {
                setStatus('fail');
                setFeedback('Runtime Alert: Reference integrity check failed. Source mutation detected.');
            }
        }, 1200);
    };

    return (
        <div className="animate-slide-up" style={{ padding: '1rem', maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                        <TerminalIcon size={14} />
                        <span style={{ fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Unified Lab Environment</span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Standardized Playground</h2>
                </div>

                <div className="glass" style={{ display: 'flex', padding: '4px', borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}>
                    {['React', 'Vue', 'Svelte'].map(fw => (
                        <button
                            key={fw}
                            onClick={() => setFramework(fw)}
                            style={{
                                padding: '8px 16px', borderRadius: '8px', border: 'none',
                                background: framework === fw ? 'var(--accent-gradient)' : 'transparent',
                                color: framework === fw ? 'white' : 'var(--text-muted)',
                                fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {fw}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2.5rem' }}>
                <div className="glass" style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: '12px', fontFamily: 'var(--font-mono)' }}>playground.{framework.toLowerCase()}</span>
                        </div>
                        <button onClick={() => setCode(getFrameworkCode(framework))} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <RefreshCw size={12} /> Reset Source
                        </button>
                    </div>

                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="custom-scrollbar"
                        style={{
                            width: '100%', height: '450px', background: '#05060f', color: '#a5b4fc', border: 'none',
                            padding: '2.5rem', fontFamily: 'var(--font-mono)', fontSize: '1rem', resize: 'none',
                            outline: 'none', lineHeight: 1.7
                        }}
                    />

                    <div style={{ padding: '1.5rem', background: 'rgba(5, 6, 15, 0.5)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            onClick={runCode}
                            disabled={status === 'testing'}
                            style={{
                                background: 'white', color: 'black', padding: '12px 32px', borderRadius: '12px',
                                fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
                                transition: 'all 0.2s ease', border: 'none'
                            }}
                        >
                            {status === 'testing' ? <RefreshCw className="animate-spin" size={18} /> : <Play size={18} fill="black" />}
                            Execute Runtime
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '24px', flex: 1, border: '1px solid var(--border-color)' }}>
                        <h4 style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '2rem', letterSpacing: '0.1em' }}>Execution Report</h4>

                        <AnimatePresence mode="wait">
                            {status === 'idle' ? (
                                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', paddingTop: '4rem' }}>
                                    <Cpu size={48} style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', opacity: 0.15 }} />
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Kernel IDLE. Awaiting stack execution.</p>
                                </motion.div>
                            ) : status === 'testing' ? (
                                <motion.div key="testing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', paddingTop: '4rem' }}>
                                    <div style={{ width: '40px', height: '40px', border: '4px solid var(--accent-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
                                    <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 600 }}>Analyzing References...</p>
                                </motion.div>
                            ) : (
                                <motion.div key="result" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
                                    {status === 'success' ? (
                                        <CheckCircle size={56} color="var(--color-success)" style={{ marginBottom: '1.5rem' }} />
                                    ) : (
                                        <AlertTriangle size={56} color="var(--color-error)" style={{ marginBottom: '1.5rem' }} />
                                    )}
                                    <h5 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: status === 'success' ? 'var(--color-success)' : 'var(--color-error)' }}>
                                        {status === 'success' ? 'Optimization Validated' : 'Validation Error'}
                                    </h5>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{feedback}</p>

                                    <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '12px' }}>
                                            <span style={{ color: 'var(--text-dim)' }}>Memory Safety</span>
                                            <span style={{ color: status === 'success' ? 'var(--color-success)' : 'var(--color-error)' }}>{status === 'success' ? '98%' : '24%'}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                            <span style={{ color: 'var(--text-dim)' }}>Runtime Overhead</span>
                                            <span style={{ color: status === 'success' ? 'var(--color-success)' : '#ef4444' }}>{status === 'success' ? 'Low' : 'Critical'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                            <Globe size={14} className="text-accent" />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>REAL-WORLD IMPLICATION</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            In {framework}, this pattern directly impacts the {framework === 'React' ? 'Fiber tree reconciliation' : 'Proxy-based reactivity system'}.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                .text-accent { color: var(--accent-primary); }
            `}</style>
        </div>
    );
};

export default LivePlayground;
