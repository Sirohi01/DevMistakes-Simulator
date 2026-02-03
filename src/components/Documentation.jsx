import React from 'react';
import {
    BookOpen, CheckCircle, ShieldAlert, Code, Zap, Layers,
    Search, Terminal, Cpu, Globe, Heart, Award, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Documentation = () => {
    const containerVars = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const sectionVars = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            variants={containerVars}
            initial="hidden"
            animate="visible"
            className="docs-container"
            style={{ padding: '0 2rem 4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}
        >
            {/* 🏅 HEADER SECTION */}
            <section style={{ textAlign: 'center', padding: '4rem 0' }}>
                <motion.div variants={sectionVars}>
                    <span style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--accent-primary)',
                        padding: '6px 16px',
                        borderRadius: '30px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                    }}>
                        Official Knowledge Base v2.0
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                        fontWeight: 900,
                        marginTop: '1.5rem',
                        marginBottom: '1rem',
                        background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.04em'
                    }}>
                        Mastering Modern Web Development
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                        A section-wise deep dive into the architecture, simulation logic, and developer best practices.
                    </p>
                </motion.div>
            </section>

            <div style={{ display: 'grid', gap: '6rem' }}>

                {/* 📘 SECTION 1: CORE PHILOSOPHY */}
                <motion.section variants={sectionVars}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2.5rem' }}>
                        <div style={{ background: 'var(--accent-gradient)', padding: '12px', borderRadius: '16px' }}>
                            <Cpu color="white" size={28} />
                        </div>
                        <h3 className="docs-section-title" style={{ fontSize: '2.25rem', fontWeight: 800 }}>01. Simulation Philosophy</h3>
                    </div>
                    <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-2xl)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Most tutorials tell you <strong>what</strong> to do, but we believe you learn best by seeing <strong>what not to do</strong>. This project is built on the
                            "Failure-First Learning" methodology.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Terminal size={18} className="text-accent" /> Dual Runtime
                                </h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>We render the bug and the fix side-by-side using the exact same state machine to highlight logical divergence.</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Globe size={18} className="text-secondary" /> Visual Proof
                                </h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Every React mistake includes an interactive demo (e.g., input forms, counters) to show state corruption in real-time.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ⚛️ SECTION 2: REACT MASTERCLASS */}
                <motion.section variants={sectionVars}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2.5rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #2dd4bf 100%)', padding: '12px', borderRadius: '16px' }}>
                            <Code color="white" size={28} />
                        </div>
                        <h3 className="docs-section-title" style={{ fontSize: '2.25rem', fontWeight: 800 }}>02. React Pitfalls & Antipatterns</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { title: 'Reconciliation & Keys', content: 'Missing keys force React to destroy and recreate DOM nodes. This is the #1 cause of lost input focus and animation glitches.' },
                            { title: 'State Immutability', content: 'Directly modifying objects (mutation) hides changes from React\'s virtual DOM comparison, resulting in "ghost fixes" that never render.' },
                            { title: 'Stale Closures', content: 'Function components capture variables at render time. Without proper dependency tracking, your functions effectively live in the past.' },
                        ].map((card, i) => (
                            <div key={i} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid rgba(255,255,255,0.03)' }}>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--accent-secondary)' }}>{card.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{card.content}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* 🎨 SECTION 3: CSS ARCHITECTURE */}
                <motion.section variants={sectionVars}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2.5rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)', padding: '12px', borderRadius: '16px' }}>
                            <Layers color="white" size={28} />
                        </div>
                        <h3 className="docs-section-title" style={{ fontSize: '2.25rem', fontWeight: 800 }}>03. Scalable CSS Principles</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>Writing CSS that doesn't break at 2 AM requires more than just knowing properties; it requires understanding <strong>The Box Model</strong> and <strong>Stacking Contexts</strong>.</p>
                    <div className="glass" style={{ overflow: 'hidden', borderRadius: 'var(--radius-2xl)' }}>
                        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
                            <h4 style={{ fontSize: '1.25rem' }}>The Golden Rules of Layout</h4>
                        </div>
                        <div className="rules-grid" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '12px' }}><CheckCircle className="text-success" size={20} /> Use Clamp() for Fluid Typography</li>
                                <li style={{ display: 'flex', gap: '12px' }}><CheckCircle className="text-success" size={20} /> Prefer Flex Gap over Margins</li>
                                <li style={{ display: 'flex', gap: '12px' }}><CheckCircle className="text-success" size={20} /> Always define Box-Sizing: Border-Box</li>
                            </ul>
                            <ul style={{ listStyle: 'none', display: 'grid', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '12px' }}><ShieldAlert className="text-error" size={20} /> Never use !important as a shortcut</li>
                                <li style={{ display: 'flex', gap: '12px' }}><ShieldAlert className="text-error" size={20} /> Avoid Fixed Heights on flexible cards</li>
                                <li style={{ display: 'flex', gap: '12px' }}><ShieldAlert className="text-error" size={20} /> Don't overlap Z-Index without context</li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* 🏆 BOTTOM CTA: FOR LINKEDIN LIKES */}

            </div>

            <style>{`
        .text-accent { color: var(--accent-primary); }
        .text-secondary { color: var(--accent-secondary); }
        .text-success { color: var(--color-success); }
        .text-error { color: var(--color-error); }
                @media (max-width: 768px) {
                    .docs-container { padding: 0 var(--main-padding) 4rem !important; }
                    .docs-section-title { font-size: 1.75rem !important; }
                    .rules-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
                }
            `}</style>
        </motion.div>
    );
};

export default Documentation;
