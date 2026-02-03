import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreviewFrame = ({ mistakeId, isFixed }) => {
    // Standard Shared States
    const [items, setItems] = useState([
        { id: 1, label: 'Item A' },
        { id: 2, label: 'Item B' },
        { id: 3, label: 'Item C' }
    ]);
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');
    const [user, setUser] = useState({ name: 'John', age: 25 });
    const [parentVal, setParentVal] = useState(1);

    // Dynamic Logic for each mistake
    const renderContent = () => {
        switch (mistakeId) {
            case 'react-missing-key':
                return (
                    <div style={{ padding: '20px' }}>
                        <button onClick={() => setItems(prev => [{ id: Date.now(), label: 'New Item' }, ...prev])}
                            style={{ background: 'var(--accent-primary)', padding: '8px 16px', borderRadius: '6px', color: 'white', marginBottom: '1rem' }}>Add Item (Top)</button>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {items.map((item, idx) => (
                                <motion.li layout key={isFixed ? item.id : idx} style={{ padding: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', marginBottom: '8px', borderRadius: '8px' }}>
                                    {item.label} (Try typing: <input type="text" style={{ background: '#000', color: '#fff' }} />)
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                );

            case 'react-object-state':
                return (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <p>Current Age: {user.age}</p>
                        <button onClick={() => {
                            if (isFixed) {
                                setUser(prev => ({ ...prev, age: prev.age + 1 }));
                            } else {
                                user.age = user.age + 1; // Mutation
                                setUser(user); // Same reference
                            }
                        }} style={{ background: 'var(--accent-primary)', padding: '10px 20px', borderRadius: '8px' }}>Update Age</button>
                        <p style={{ marginTop: '10px', color: isFixed ? 'var(--color-success)' : 'var(--color-error)' }}>
                            {isFixed ? "State updated correctly ✓" : "UI stuck (Mutation detected) ❌"}
                        </p>
                    </div>
                );

            case 'react-props-mirroring':
                return <ChildMirror initial={parentVal} isFixed={isFixed} />;

            case 'hooks-stale-closure':
                return <StaleCounter isFixed={isFixed} />;

            case 'css-box-sizing':
                return (
                    <div style={{ width: '100%', padding: '20px', border: '1px dashed #444' }}>
                        <div style={{ width: '100%', padding: '40px', border: '10px solid var(--accent-primary)', boxSizing: isFixed ? 'border-box' : 'content-box', background: 'var(--bg-card)' }}>
                            {isFixed ? "I fit inside ✓" : "I overflow ❌"}
                        </div>
                    </div>
                );

            case 'css-aspect-ratio':
                return (
                    <div style={{ width: '100%', padding: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', position: 'relative' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                                    alt="Demo"
                                    style={{ width: '100%', height: '150px', objectFit: isFixed ? 'cover' : 'fill' }}
                                />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '5px', fontSize: '10px', textAlign: 'center' }}>
                                    Mode: {isFixed ? 'object-fit: cover' : 'object-fit: fill (Bad)'}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5px' }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{isFixed ? '✓ Natural Aspect Ratio' : '❌ Distorted/Squashed'}</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                                    {isFixed ? 'Image maintains its internal ratio while covering the area.' : 'Image is forced to stretch to fill the exact height/width.'}
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'perf-heavy-filtering':
                return <HeavyFilter isFixed={isFixed} />;

            case 'security-danger-html':
                return (
                    <div style={{ padding: '20px' }}>
                        <div style={{ background: isFixed ? 'transparent' : 'rgba(239, 68, 68, 0.1)', padding: '15px', borderRadius: '8px', border: isFixed ? 'none' : '1px solid var(--color-error)' }}>
                            <div dangerouslySetInnerHTML={{ __html: isFixed ? "<b>Safe Text (Rendered Securely)</b>" : "<img src=x onerror=\"this.parentElement.innerHTML += '<div style=\'color:#ef4444;margin-top:10px\'>⚠️ XSS PAYLOAD EXECUTED!</div>'\"> Unsafe Input Rendered" }} />
                        </div>
                        <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                            {isFixed ? "Success: HTML was sanitized before rendering." : "Warning: Malicious script executed! This is why dangerouslySetInnerHTML is dangerous."}
                        </p>
                    </div>
                );

            case 'a11y-missing-alt':
                return (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/100" alt={isFixed ? "A meaningful description" : undefined} style={{ borderRadius: '50%' }} />
                        <p style={{ marginTop: '10px' }}>{isFixed ? "Accessible ✓" : "Invisible to Screen Readers ❌"}</p>
                    </div>
                );

            default:
                return (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: `4px solid ${isFixed ? 'var(--color-success)' : 'var(--color-error)'}`, margin: '0 auto 1rem' }} />
                        <p style={{ fontWeight: 600 }}>{isFixed ? "Optimized Implementation" : "Buggy Pattern Active"}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>Interactive simulator for {mistakeId} is ready.</p>
                    </div>
                );
        }
    };

    return <div style={{ height: '100%', minHeight: '300px' }}>{renderContent()}</div>;
};

// --- SUPPORTING COMPONENTS ---

const ChildMirror = ({ initial, isFixed }) => {
    const [val, setVal] = useState(initial);
    // Fixed logic: Sync if necessary or just use props.initial directly?
    // Here we show the bug: Parent updates but child state stays frozen.
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Parent Value: {initial}</p>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', marginTop: '10px' }}>
                <p>Child State: {isFixed ? initial : val}</p>
            </div>
            {!isFixed && <p style={{ color: 'var(--color-error)', fontSize: '11px', marginTop: '10px' }}>Wait... Parent changed but child state didn't!</p>}
        </div>
    );
};

const StaleCounter = ({ isFixed }) => {
    const [c, setC] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            if (isFixed) {
                setC(prev => prev + 1);
            } else {
                setC(c + 1); // Stale reference to 'c'
            }
        }, 1000);
        return () => clearInterval(id);
    }, [isFixed]); // Note: Intentional bug in broken side - missing 'c' dependency

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800 }}>{c}</div>
            <p>{isFixed ? "Stable Update ✓" : "Stale (Stuck at 1) ❌"}</p>
        </div>
    );
};

const HeavyFilter = ({ isFixed }) => {
    const [search, setSearch] = useState('');
    const data = useMemo(() => Array.from({ length: 50 }, (_, i) => `Item ${i}`), []);

    // In broken mode, we might do heavy work every render
    const filtered = isFixed
        ? data.filter(i => i.toLowerCase().includes(search.toLowerCase()))
        : data.filter(i => {
            // Artificial delay to simulate heavy work
            const start = performance.now();
            while (performance.now() - start < 1) { }
            return i.toLowerCase().includes(search.toLowerCase());
        });

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Search (Lag test)..."
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff' }}
            />
            <ul style={{ maxHeight: '150px', overflowY: 'auto', marginTop: '10px', listStyle: 'none', padding: 0 }}>
                {filtered.map(f => <li key={f} style={{ fontSize: '0.8rem', padding: '4px' }}>{f}</li>)}
            </ul>
        </div>
    );
};

export default PreviewFrame;
