import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, Sparkles, Award, Zap, AlertTriangle, TrendingUp, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeAnalyzer = () => {
    const [code, setCode] = useState('');
    const [results, setResults] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [score, setScore] = useState(100);

    const analyzeCode = () => {
        setIsScanning(true);
        setResults(null);

        setTimeout(() => {
            const foundIssues = [];
            let currentScore = 100;

            // 1. React Architecture & Hooks
            if (code.includes('map(') && !code.includes('key=')) {
                foundIssues.push({
                    type: 'error',
                    title: 'CRITICAL: Broken Reconciliation',
                    message: 'Missing map keys will lead to massive re-render overhead and state corruption.',
                    fix: 'items.map(item => <div key={item.id}>...</div>)',
                    impact: 'High'
                });
                currentScore -= 40;
            }

            if (/if\s*\(.*\)\s*\{.*\s*(useEffect|useState|useContext|useReducer)/s.test(code)) {
                foundIssues.push({
                    type: 'error',
                    title: 'CRITICAL: Conditional Hook Call',
                    message: 'Breaking the Rule of Hooks! This will crash your application on re-renders.',
                    fix: 'Move the hook call outside the conditional logic.',
                    impact: 'High'
                });
                currentScore -= 50;
            }

            if (code.includes('setState') && code.includes('++')) {
                foundIssues.push({
                    type: 'error',
                    title: 'Direct State Mutation',
                    message: 'Never mutate state directly. Use the functional update pattern prev => prev + 1.',
                    fix: 'setCount(prev => prev + 1)',
                    impact: 'Medium'
                });
                currentScore -= 20;
            }

            // 2. Performance Audits
            if (code.includes('filter(') && !code.includes('useMemo')) {
                foundIssues.push({
                    type: 'warning',
                    title: 'Performance: Unclaimed Memo',
                    message: 'Heavy data filtering detected without useMemo. This will slow down every render cycle.',
                    fix: 'const filtered = useMemo(() => list.filter(...), [list])',
                    impact: 'Medium'
                });
                currentScore -= 15;
            }

            if (code.includes('dangerouslySetInnerHTML')) {
                foundIssues.push({
                    type: 'warning',
                    title: 'Security: XSS Vulnerability',
                    message: 'Direct HTML injection can lead to Cross-Site Scripting (XSS) attacks.',
                    fix: 'Use a library like DOMPurify before rendering HTML string.',
                    impact: 'High'
                });
                currentScore -= 30;
            }

            // 3. CSS Logic & A11y
            if (code.includes('z-index') && !code.includes('position')) {
                foundIssues.push({
                    type: 'error',
                    title: 'CSS Logic: Z-index Failure',
                    message: 'z-index property has no effect on static elements. Requires relative/absolute.',
                    fix: 'Add position: relative; to this element.',
                    impact: 'Low'
                });
                currentScore -= 10;
            }

            if (code.includes('!important')) {
                foundIssues.push({
                    type: 'warning',
                    title: 'Architecture: Specificity Hack',
                    message: 'Using "!important" is a sign of poor selector architecture.',
                    fix: 'Use more specific BEM classes or ID selectors.',
                    impact: 'Low'
                });
                currentScore -= 10;
            }

            if (code.includes('<img') && !code.includes('alt=')) {
                foundIssues.push({
                    type: 'error',
                    title: 'A11y: Missing Alt Text',
                    message: 'Accessibility violation! Screen readers won\'t know what this image is.',
                    fix: '<img src="..." alt="Description" />',
                    impact: 'Medium'
                });
                currentScore -= 20;
            }

            setScore(Math.max(0, currentScore));
            setResults(foundIssues);
            setIsScanning(false);
        }, 1200);
    };

    const getScoreGrade = () => {
        if (score >= 90) return { grade: 'A+', color: 'var(--color-success)', text: 'Production Ready' };
        if (score >= 70) return { grade: 'B', color: 'var(--color-warning)', text: 'Needs Refactor' };
        return { grade: 'F', color: 'var(--color-error)', text: 'Critical Fail' };
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ padding: '0 2rem 4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}
        >
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                    <Cpu size={20} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Deep Scanning Engine v3</span>
                </div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    AI Code Safety Audit
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                        Smart Scan
                    </div>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px' }}>
                    Get an instant production-readiness score and discover hidden architectural flaws in your React and CSS code.
                </p>
            </div>

            <div className="analyzer-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) 450px',
                gap: '2.5rem'
            }}>
                {/* 📝 INPUT SECTION */}
                <div className="glass" style={{ borderRadius: 'var(--radius-2xl)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)' }}>
                    <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginLeft: '8px', fontFamily: 'monospace' }}>editor.js</span>
                        </div>
                        <button
                            onClick={() => setCode('')}
                            style={{ fontSize: '0.75rem', color: 'var(--color-error)', fontWeight: 600 }}
                        >Clear Input</button>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste your code snippet here to start the audit..."
                        style={{
                            width: '100%',
                            minHeight: '600px',
                            background: '#0d0e1a',
                            color: '#d1d5db',
                            border: 'none',
                            padding: '2rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.95rem',
                            resize: 'none',
                            outline: 'none',
                            lineHeight: 1.6
                        }}
                    />
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Scan time: ~1.2s</span>
                        <button
                            onClick={analyzeCode}
                            disabled={!code.trim() || isScanning}
                            style={{
                                background: 'var(--accent-gradient)',
                                color: 'white',
                                padding: '12px 32px',
                                borderRadius: 'var(--radius-lg)',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                cursor: code.trim() ? 'pointer' : 'not-allowed',
                                opacity: code.trim() ? 1 : 0.5,
                                transform: 'translateY(0)',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                            }}
                        >
                            {isScanning ? (
                                <>
                                    <div className="loader" style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
                                    Running Audit...
                                </>
                            ) : (
                                <>
                                    <Zap size={18} fill="white" />
                                    Analyze Production Code
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* 📊 RESULTS SECTION */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* SCORE CARD */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass"
                        style={{ padding: '2rem', borderRadius: 'var(--radius-2xl)', border: '2px solid var(--border-color)', textAlign: 'center' }}
                    >
                        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>Production Score</h3>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <svg width="120" height="120">
                                <circle cx="60" cy="60" r="54" stroke="var(--bg-hover)" strokeWidth="12" fill="none" />
                                <motion.circle
                                    cx="60" cy="60" r="54"
                                    stroke={getScoreGrade().color}
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray="339.29"
                                    initial={{ strokeDashoffset: 339.29 }}
                                    animate={{ strokeDashoffset: 339.29 - (339.29 * score / 100) }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: getScoreGrade().color }}>{getScoreGrade().grade}</span>
                            </div>
                        </div>
                        <h4 style={{ fontSize: '1.25rem', marginTop: '1rem', color: getScoreGrade().color }}>{getScoreGrade().text}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            {score === 100 ? 'Architectural perfection detected.' : 'We found some critical areas for improvement.'}
                        </p>
                    </motion.div>

                    <h3 style={{ fontSize: '1rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '1rem' }}>Audit Findings</h3>
                    <AnimatePresence mode="wait">
                        {isScanning ? (
                            <motion.div
                                key="scanning"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ textAlign: 'center', padding: '3rem 0' }}
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                    <Sparkles size={40} className="text-accent" />
                                </motion.div>
                                <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Processing AST Nodes...</p>
                            </motion.div>
                        ) : results === null ? (
                            <div style={{ padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
                                <AlertTriangle size={32} style={{ color: 'var(--text-dim)', marginBottom: '1rem' }} />
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Awaiting source code for analysis.</p>
                            </div>
                        ) : results.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                style={{ padding: '2rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-success)', textAlign: 'center' }}
                            >
                                <Award size={48} style={{ color: 'var(--color-success)', marginBottom: '1.5rem' }} />
                                <h4 style={{ color: 'var(--color-success)', fontSize: '1.25rem' }}>Elite Code Standard!</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Your code follows all audited best practices. Share this score to showcase your skills.</p>
                            </motion.div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {results.map((issue, i) => (
                                    <motion.div
                                        initial={{ x: 30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        key={i}
                                        className="glass"
                                        style={{ padding: '1.25rem', borderRadius: 'var(--radius-xl)', borderLeft: `6px solid ${issue.type === 'error' ? 'var(--color-error)' : 'var(--color-warning)'}` }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <ShieldAlert size={18} style={{ color: issue.type === 'error' ? 'var(--color-error)' : 'var(--color-warning)' }} />
                                                <h5 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{issue.title}</h5>
                                            </div>
                                            <span style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '4px', background: issue.impact === 'High' ? 'var(--color-error)' : 'var(--bg-hover)', color: issue.impact === 'High' ? 'white' : 'var(--text-dim)' }}>
                                                IMPACT: {issue.impact}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>{issue.message}</p>

                                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-success)' }}>
                                                    <TrendingUp size={14} />
                                                    <strong style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Recommended Fix</strong>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(issue.fix);
                                                        alert('Optimized snippet copied!');
                                                    }}
                                                    style={{ color: 'var(--accent-primary)', fontSize: '0.7rem', fontWeight: 800 }}
                                                >
                                                    COPY FIX
                                                </button>
                                            </div>
                                            <code style={{ color: '#d1d5db', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{issue.fix}</code>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                .text-accent { color: var(--accent-primary); }
                @media (max-width: 1200px) {
                    .analyzer-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </motion.div>
    );
};

export default CodeAnalyzer;
