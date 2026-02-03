import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle, Sparkles, Award, Zap, AlertTriangle, TrendingUp, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeAnalyzer = ({ onAddXp }) => {
    const [code, setCode] = useState('');
    const [results, setResults] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [score, setScore] = useState(100);
    const [roastMode, setRoastMode] = useState(false);

    const ROASTS = [
        "Bhai ye code likha hai ya chidiya ki tang? Safari me crash ho jayega.",
        "React Fiber dekh ke ro raha hoga tumhare code ko.",
        "Senior dev se ye code review mat karwana, resume wapas de dega.",
        "Key={index}? Seriously? 2015 me ji rahe ho kya?",
        "Z-index: 999999? CSS specificity ki maut hai ye.",
        "Clean code book padho bhai, bahut zarurat hai.",
        "ChatGPT se likhwaya hai na? Sach batana."
    ];

    const analyzeCode = () => {
        setIsScanning(true);
        setResults(null);
        if (onAddXp) onAddXp(50); // XP for using the auditor

        setTimeout(() => {
            const foundIssues = [];
            let currentScore = 100;
            const lines = code.split('\n');

            // --- 1. Line-by-Line Structural Analysis ---
            let openParens = 0;
            let openBrackets = 0;
            let openCurlys = 0;
            let openJSXTags = [];

            lines.forEach((line, index) => {
                const lineNum = index + 1;
                const trimmed = line.trim();
                if (!trimmed) return;

                // Check for unclosed strings
                const quotes = (line.match(/"/g) || []).length + (line.match(/'/g) || []).length;
                if (quotes % 2 !== 0 && !trimmed.endsWith('\\') && !trimmed.includes('`')) {
                    foundIssues.push({
                        type: 'error',
                        title: `L- ${lineNum}: Unclosed String Literal`,
                        message: 'Missing a closing double or single quote on this line.',
                        fix: 'Check your string declarations.',
                        impact: 'High'
                    });
                    currentScore -= 10;
                }

                // Balance tracking
                openParens += (line.match(/\(/g) || []).length - (line.match(/\)/g) || []).length;
                openBrackets += (line.match(/\[/g) || []).length - (line.match(/\]/g) || []).length;
                openCurlys += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;

                // JSX Tag Matching (Improved for broken tags)
                const openTagMatch = line.match(/<([a-zA-Z0-9]+)(?![^>]*\/>)/g);
                const closeTagMatch = line.match(/<\/([a-zA-Z0-9]*)/g);

                if (openTagMatch) {
                    openTagMatch.forEach(tag => {
                        const name = tag.slice(1);
                        if (!['img', 'br', 'hr', 'input'].includes(name.toLowerCase())) {
                            openJSXTags.push({ name, line: lineNum });
                        }
                    });
                }

                if (closeTagMatch) {
                    closeTagMatch.forEach(tag => {
                        const name = tag.slice(2);
                        if (openJSXTags.length > 0) {
                            const lastTag = openJSXTags[openJSXTags.length - 1].name;
                            if (lastTag === name || name === '') { // handle </li vs </li>
                                openJSXTags.pop();
                            } else {
                                foundIssues.push({
                                    type: 'error',
                                    title: `L- ${lineNum}: Mismatched JSX Tag`,
                                    message: `Closing tag </${name}> doesn't match open tag <${lastTag}>.`,
                                    fix: `Correct the tag structure at line ${lineNum}.`,
                                    impact: 'High'
                                });
                                currentScore -= 15;
                            }
                        }
                    });
                }

                // Extra check for unclosed tag without '>'
                if (trimmed.includes('</') && !trimmed.includes('>')) {
                    foundIssues.push({
                        type: 'error',
                        title: `L- ${lineNum}: Syntax - Broken Tag`,
                        message: 'Closing tag is missing the closing ">".',
                        fix: 'Ensure tags end with >.',
                        impact: 'High'
                    });
                    currentScore -= 10;
                }
            });

            // Global Structural Errors
            if (openParens !== 0) {
                foundIssues.push({ type: 'error', title: 'Global: Unbalanced Parentheses', message: `Found ${Math.abs(openParens)} unclosed parenthesis.`, fix: 'Check all ( ) pairs.', impact: 'High' });
                currentScore -= 20;
            }
            if (openCurlys !== 0) {
                foundIssues.push({ type: 'error', title: 'Global: Unbalanced Braces', message: `Found ${Math.abs(openCurlys)} unclosed curly braces.`, fix: 'Check all { } pairs.', impact: 'High' });
                currentScore -= 25;
            }
            if (openJSXTags.length > 0) {
                const tags = openJSXTags.map(t => t.name).join(', ');
                foundIssues.push({ type: 'error', title: 'Global: Unclosed JSX Tags', message: `Tags [${tags}] were never closed.`, fix: 'Ensure every opening tag has a corresponding closing tag.', impact: 'High' });
                currentScore -= 30;
            }

            // --- 2. Advanced React Performance Audits ---
            const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
            if (cleanCode.includes('.map(') && !cleanCode.includes('key={')) {
                foundIssues.push({ type: 'error', title: 'Performance: Missing Map Key', message: 'Reconciliation will be broken without unique keys.', fix: '.map(i => <div key={i.id}>)', impact: 'High' });
                currentScore -= 40;
            }

            if (roastMode && foundIssues.length > 0) {
                const randomRoast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
                foundIssues.unshift({
                    type: 'warning',
                    title: '🔥 CODE ROAST (AI Sarcasm)',
                    message: randomRoast,
                    fix: 'Write better code next time.',
                    impact: 'Emotional Damage'
                });
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
            style={{ padding: '0 var(--main-padding) 4rem', maxWidth: '1400px', margin: '0 auto' }}
        >
            <div className="analyzer-header" style={{ marginBottom: '3rem' }}>
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

            <div className="analyzer-grid">
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
                        className="analyzer-input-area"
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

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Audit Findings</h3>
                        <button
                            onClick={() => setRoastMode(!roastMode)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px',
                                borderRadius: '8px', border: roastMode ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                background: roastMode ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                color: roastMode ? 'var(--accent-primary)' : 'var(--text-dim)',
                                fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            {roastMode ? '🔥 ROAST ON' : '💬 NORMAL MODE'}
                        </button>
                    </div>
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
                .analyzer-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 450px;
                    gap: 2.5rem;
                }
                @media (max-width: 1200px) {
                    .analyzer-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
                }
                @media (max-width: 768px) {
                    .analyzer-header h2 { font-size: 1.75rem !important; }
                    .analyzer-input-area { min-height: 400px !important; }
                }
            `}</style>
        </motion.div>
    );
};

export default CodeAnalyzer;
