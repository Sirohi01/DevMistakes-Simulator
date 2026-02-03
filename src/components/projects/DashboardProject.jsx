import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, AlertCircle, CheckCircle2, Lightbulb, Rocket, X, Activity } from 'lucide-react';

const DashboardProject = ({ onComplete, onBack }) => {
    const [data, setData] = useState([]);
    const [bugsFound, setBugsFound] = useState([]);
    const [showHint, setShowHint] = useState(null);
    const [renderCount, setRenderCount] = useState(0);

    const bugs = [
        {
            id: 'fetch-in-render',
            title: 'Data Fetching in Render',
            hint: 'Never call fetch() directly in the component body. Use useEffect instead.',
            line: 45,
            severity: 'critical'
        },
        {
            id: 'infinite-loop',
            title: 'Infinite Re-render Loop',
            hint: 'Setting state in render causes infinite loop. The fetch triggers setState which triggers re-render.',
            line: 46,
            severity: 'critical'
        },
        {
            id: 'inline-object',
            title: 'Inline Object Creation',
            hint: 'Creating new objects in JSX causes child components to re-render unnecessarily.',
            line: 58,
            severity: 'high'
        },
        {
            id: 'expensive-calc',
            title: 'Expensive Calculation Without Memoization',
            hint: 'calculateStats runs on every render. Use useMemo to cache the result.',
            line: 52,
            severity: 'high'
        },
        {
            id: 'layout-thrashing',
            title: 'Layout Thrashing (Read-Write-Read)',
            hint: 'Reading offsetHeight then setting style causes forced reflow. Batch DOM operations.',
            line: 72,
            severity: 'medium'
        },
        {
            id: 'missing-cleanup',
            title: 'Missing Interval Cleanup',
            hint: 'setInterval without cleanup causes memory leaks when component unmounts.',
            line: 80,
            severity: 'high'
        },
        {
            id: 'unnecessary-effect',
            title: 'useEffect Running on Every Render',
            hint: 'Missing dependency array causes effect to run after every render.',
            line: 85,
            severity: 'medium'
        },
        {
            id: 'console-in-prod',
            title: 'Console.log in Production',
            hint: 'Excessive console logging impacts performance. Remove or use conditional logging.',
            line: 90,
            severity: 'low'
        }
    ];

    // Track render count for demonstration
    React.useEffect(() => {
        setRenderCount(prev => prev + 1);
    });

    // BUG #1 & #2: Fetching in render + infinite loop
    if (data.length === 0) {
        // This causes infinite re-renders!
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(r => r.json())
            .then(d => setData(d.slice(0, 5)));
    }

    // BUG #4: Expensive calculation without memoization
    const calculateStats = (data) => {
        console.log('Calculating stats...'); // BUG #8: Console in production
        let total = 0;
        for (let i = 0; i < 100000; i++) {
            total += i; // Simulated expensive operation
        }
        return {
            users: data.length,
            active: Math.floor(data.length * 0.7),
            revenue: total % 10000
        };
    };
    const stats = calculateStats(data);

    // BUG #3: Inline object creation
    const chartConfig = { theme: 'dark', animate: true };

    // BUG #5: Layout thrashing
    React.useEffect(() => {
        const element = document.getElementById('dashboard-chart');
        if (element) {
            const height = element.offsetHeight; // Read
            element.style.minHeight = '200px'; // Write
            const newHeight = element.offsetHeight; // Read again - causes reflow
        }
    });

    // BUG #6: Missing cleanup
    React.useEffect(() => {
        const interval = setInterval(() => {
            console.log('Polling for updates...');
        }, 5000);
        // Missing: return () => clearInterval(interval);
    }, []);

    // BUG #7: Effect running on every render
    React.useEffect(() => {
        console.log('Dashboard updated');
    }); // Missing dependency array

    const markBugFound = (bugId) => {
        if (!bugsFound.includes(bugId)) {
            setBugsFound([...bugsFound, bugId]);
        }
    };

    const shipToProduction = () => {
        if (bugsFound.length === bugs.length) {
            onComplete({
                bugsFound: bugs.length,
                totalBugs: bugs.length,
                xpEarned: 600,
                perfectScore: true
            });
        } else {
            alert(`Found ${bugsFound.length}/${bugs.length} bugs. Find all bugs before shipping!`);
        }
    };

    return (
        <div style={{ padding: '2rem 0' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                        📊 Dashboard Performance Hell
                    </h2>
                    <p style={{ color: 'var(--text-dim)' }}>
                        Find all {bugs.length} critical performance bugs
                    </p>
                </div>
                <button
                    onClick={onBack}
                    style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--border-color)',
                        padding: '8px 16px',
                        borderRadius: '10px',
                        color: 'var(--text-main)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                >
                    <X size={16} />
                    Back
                </button>
            </div>

            {/* Progress Bar */}
            <div className="glass" style={{
                padding: '1.5rem',
                borderRadius: '16px',
                marginBottom: '2rem'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem'
                }}>
                    <span style={{ fontWeight: 700 }}>Progress</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>
                        {bugsFound.length}/{bugs.length} Bugs Found
                    </span>
                </div>
                <div style={{
                    width: '100%',
                    height: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '6px',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(bugsFound.length / bugs.length) * 100}%` }}
                        style={{
                            height: '100%',
                            background: 'var(--accent-gradient)',
                            borderRadius: '6px'
                        }}
                    />
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem'
            }} className="project-layout">
                {/* Live Preview */}
                <div className="glass" style={{
                    padding: '2rem',
                    borderRadius: '20px'
                }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                        Analytics Dashboard
                    </h3>

                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '2rem',
                        borderRadius: '16px',
                        minHeight: '300px'
                    }}>
                        {/* Performance Warning */}
                        <div style={{
                            padding: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '2px solid #ef4444',
                            borderRadius: '10px',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <Activity size={20} style={{ color: '#ef4444' }} />
                            <div>
                                <div style={{ fontWeight: 700, color: '#ef4444', fontSize: '0.9rem' }}>
                                    ⚠️ Performance Warning
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                    Render count: {renderCount} (Should be ~3-5, not {renderCount}!)
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '1.5rem' }}>
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(99, 102, 241, 0.1)',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{stats.users}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Users</div>
                            </div>
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{stats.active}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Active</div>
                            </div>
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(251, 191, 36, 0.1)',
                                borderRadius: '12px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>${stats.revenue}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Revenue</div>
                            </div>
                        </div>

                        {/* Chart Placeholder */}
                        <div
                            id="dashboard-chart"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                padding: '2rem',
                                textAlign: 'center',
                                minHeight: '150px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <div>
                                <BarChart3 size={48} style={{ color: 'var(--text-dim)', margin: '0 auto 1rem' }} />
                                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                    Chart rendering with performance issues...
                                </div>
                            </div>
                        </div>

                        <div style={{
                            marginTop: '1rem',
                            padding: '12px',
                            background: 'rgba(251, 191, 36, 0.1)',
                            borderRadius: '10px',
                            fontSize: '0.85rem',
                            color: '#fbbf24'
                        }}>
                            💡 Open DevTools Console to see the performance chaos!
                        </div>
                    </div>
                </div>

                {/* Bug Checklist */}
                <div className="glass custom-scrollbar" style={{
                    padding: '2rem',
                    borderRadius: '20px',
                    maxHeight: '600px',
                    overflowY: 'auto'
                }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                        Bug Checklist
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {bugs.map((bug) => {
                            const isFound = bugsFound.includes(bug.id);
                            return (
                                <div
                                    key={bug.id}
                                    style={{
                                        padding: '1rem',
                                        background: isFound ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                                        border: `2px solid ${isFound ? '#10b981' : 'var(--border-color)'}`,
                                        borderRadius: '12px'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {isFound ? (
                                                <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                                            ) : (
                                                <AlertCircle size={20} style={{ color: '#ef4444' }} />
                                            )}
                                            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                                {bug.title}
                                            </span>
                                        </div>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            background: bug.severity === 'critical' ? '#ef4444' :
                                                bug.severity === 'high' ? '#f59e0b' :
                                                    bug.severity === 'medium' ? '#6366f1' : '#64748b'
                                        }}>
                                            {bug.severity}
                                        </span>
                                    </div>

                                    {!isFound && (
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                            <button
                                                onClick={() => setShowHint(bug.id)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    background: 'rgba(255,255,255,0.1)',
                                                    border: '1px solid var(--border-color)',
                                                    color: 'var(--text-main)',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '6px'
                                                }}
                                            >
                                                <Lightbulb size={14} />
                                                Hint
                                            </button>
                                            <button
                                                onClick={() => markBugFound(bug.id)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    borderRadius: '8px',
                                                    background: 'var(--accent-primary)',
                                                    border: 'none',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 700
                                                }}
                                            >
                                                Mark Found
                                            </button>
                                        </div>
                                    )}

                                    <AnimatePresence>
                                        {showHint === bug.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                style={{
                                                    marginTop: '10px',
                                                    padding: '10px',
                                                    background: 'rgba(251, 191, 36, 0.1)',
                                                    borderRadius: '8px',
                                                    fontSize: '0.85rem',
                                                    color: '#fbbf24'
                                                }}
                                            >
                                                💡 {bug.hint}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Ship Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={shipToProduction}
                        disabled={bugsFound.length < bugs.length}
                        style={{
                            width: '100%',
                            marginTop: '1.5rem',
                            padding: '14px',
                            borderRadius: '12px',
                            background: bugsFound.length === bugs.length ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: bugsFound.length === bugs.length ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            opacity: bugsFound.length === bugs.length ? 1 : 0.5
                        }}
                    >
                        <Rocket size={20} />
                        Ship to Production
                    </motion.button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 968px) {
                    .project-layout {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </div>
    );
};

export default DashboardProject;
