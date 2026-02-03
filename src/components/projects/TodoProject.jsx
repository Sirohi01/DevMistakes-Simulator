import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, AlertCircle, CheckCircle2, Lightbulb, Rocket, X } from 'lucide-react';

const TodoProject = ({ onComplete, onBack }) => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', done: false },
        { id: 2, text: 'Build a project', done: false }
    ]);
    const [input, setInput] = useState('');
    const [bugsFound, setBugsFound] = useState([]);
    const [showHint, setShowHint] = useState(null);

    const bugs = [
        {
            id: 'missing-key',
            title: 'Missing Key Prop',
            hint: 'Look at the list rendering. Are you using proper unique keys?',
            line: 45,
            severity: 'high'
        },
        {
            id: 'state-mutation',
            title: 'Direct State Mutation',
            hint: 'Check the addTodo function. Are you mutating state directly?',
            line: 28,
            severity: 'critical'
        },
        {
            id: 'memory-leak',
            title: 'Memory Leak (Event Listener)',
            hint: 'useEffect is adding an event listener. Is it being cleaned up?',
            line: 35,
            severity: 'medium'
        },
        {
            id: 'missing-dependency',
            title: 'Missing useEffect Dependency',
            hint: 'The useEffect has an empty dependency array. Should it include todos?',
            line: 36,
            severity: 'medium'
        },
        {
            id: 'index-key',
            title: 'Using Index as Key',
            hint: 'Even if you add keys, using array index is an anti-pattern for dynamic lists.',
            line: 45,
            severity: 'high'
        }
    ];

    // BUG #2: Memory leak - no cleanup
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' && input) {
                addTodo();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        // Missing: return () => document.removeEventListener('keydown', handleKeyPress);
    }, []); // BUG #4: Missing dependency [input]

    // BUG #1: Direct state mutation
    const addTodo = () => {
        if (!input.trim()) return;

        // WRONG: Direct mutation
        const newTodo = { id: Date.now(), text: input, done: false };
        todos.push(newTodo); // This mutates state!
        setTodos(todos); // React won't detect the change

        // CORRECT would be:
        // setTodos([...todos, newTodo]);

        setInput('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        ));
    };

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
                xpEarned: 250,
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
                        🐛 Todo App with Bugs
                    </h2>
                    <p style={{ color: 'var(--text-dim)' }}>
                        Find all {bugs.length} bugs to ship to production
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
                        Live Preview
                    </h3>

                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '2rem',
                        borderRadius: '16px',
                        minHeight: '300px'
                    }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Add a new todo..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border-color)',
                                    color: '#fff',
                                    marginBottom: '10px'
                                }}
                            />
                            <button
                                onClick={addTodo}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    background: 'var(--accent-primary)',
                                    border: 'none',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                Add Todo
                            </button>
                        </div>

                        {/* BUG #5 & #1: Using index as key, and list won't update due to mutation */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {todos.map((todo, index) => (
                                <div
                                    key={index} // BUG: Should use todo.id
                                    onClick={() => toggleTodo(todo.id)}
                                    style={{
                                        padding: '12px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        textDecoration: todo.done ? 'line-through' : 'none',
                                        opacity: todo.done ? 0.6 : 1
                                    }}
                                >
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid var(--accent-primary)',
                                        background: todo.done ? 'var(--accent-primary)' : 'transparent'
                                    }} />
                                    {todo.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bug Checklist */}
                <div className="glass" style={{
                    padding: '2rem',
                    borderRadius: '20px'
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
                                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                                                {bug.title}
                                            </span>
                                        </div>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            background: bug.severity === 'critical' ? '#ef4444' :
                                                bug.severity === 'high' ? '#f59e0b' : '#6366f1'
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

export default TodoProject;
