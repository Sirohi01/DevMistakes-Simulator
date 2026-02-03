import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, AlertCircle, CheckCircle2, Lightbulb, Rocket, X, TrendingUp } from 'lucide-react';

const CartProject = ({ onComplete, onBack }) => {
    const [items, setItems] = useState([
        { id: 1, name: 'React Book', price: 29.99, quantity: 1 },
        { id: 2, name: 'JavaScript Course', price: 49.99, quantity: 2 }
    ]);
    const [bugsFound, setBugsFound] = useState([]);
    const [showHint, setShowHint] = useState(null);

    const bugs = [
        {
            id: 'floating-point',
            title: 'Floating Point Arithmetic Bug',
            hint: 'Look at the total calculation. JavaScript floating point math can be imprecise.',
            line: 28,
            severity: 'critical'
        },
        {
            id: 'sort-mutation',
            title: 'Array.sort() Mutates Original',
            hint: 'The sort() method mutates the array in place. This causes unnecessary re-renders.',
            line: 35,
            severity: 'high'
        },
        {
            id: 'missing-dependency',
            title: 'Missing useEffect Dependency',
            hint: 'The useEffect should include items in the dependency array.',
            line: 42,
            severity: 'medium'
        },
        {
            id: 'expensive-render',
            title: 'Expensive Calculation in Render',
            hint: 'Sorting happens on every render. Use useMemo to optimize.',
            line: 35,
            severity: 'high'
        },
        {
            id: 'object-reference',
            title: 'New Object Reference on Every Render',
            hint: 'Creating new objects in render causes child components to re-render unnecessarily.',
            line: 52,
            severity: 'medium'
        },
        {
            id: 'no-key-optimization',
            title: 'Missing React.memo Optimization',
            hint: 'CartItem component re-renders even when props haven\'t changed.',
            line: 60,
            severity: 'medium'
        }
    ];

    // BUG #1: Floating point arithmetic
    const total = items.reduce((sum, item) =>
        sum + item.price * item.quantity, 0
    ); // Should use: (sum + item.price * item.quantity * 100) / 100 or toFixed(2)

    // BUG #2 & #4: Expensive operation + mutation
    const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name));
    // Should use: const sortedItems = useMemo(() => [...items].sort(...), [items]);

    // BUG #3: Missing dependency
    React.useEffect(() => {
        console.log('Syncing cart to backend...');
        // Simulated backend sync
    }, []); // Should include [items]

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: newQty } : item
        ));
    };

    // BUG #5: New object on every render
    const cartConfig = { theme: 'dark', currency: 'USD' };
    // Should use: const cartConfig = useMemo(() => ({ ... }), []);

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
                xpEarned: 400,
                perfectScore: true
            });
        } else {
            alert(`Found ${bugsFound.length}/${bugs.length} bugs. Find all bugs before shipping!`);
        }
    };

    // BUG #6: Component not memoized
    const CartItem = ({ item, onUpdate }) => (
        <div style={{
            padding: '1rem',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{item.name}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                    ${item.price.toFixed(2)} each
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={() => onUpdate(item.id, item.quantity - 1)}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--border-color)',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    -
                </button>
                <span style={{ fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>
                    {item.quantity}
                </span>
                <button
                    onClick={() => onUpdate(item.id, item.quantity + 1)}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid var(--border-color)',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    +
                </button>
            </div>
        </div>
    );

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
                        🛒 Shopping Cart Issues
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
                        Live Shopping Cart
                    </h3>

                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '2rem',
                        borderRadius: '16px',
                        minHeight: '300px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
                            {sortedItems.map(item => (
                                <CartItem key={item.id} item={item} onUpdate={updateQuantity} />
                            ))}
                        </div>

                        <div style={{
                            borderTop: '2px solid var(--border-color)',
                            paddingTop: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Total:</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-primary)' }}>
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <div style={{
                            marginTop: '1rem',
                            padding: '12px',
                            background: 'rgba(251, 191, 36, 0.1)',
                            borderRadius: '10px',
                            fontSize: '0.85rem',
                            color: '#fbbf24'
                        }}>
                            💡 Try changing quantities and watch the console for performance issues
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

export default CartProject;
