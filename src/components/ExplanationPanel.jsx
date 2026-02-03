import React from 'react';
import {
    Info, Lightbulb, Zap, ExternalLink, Activity,
    ShieldAlert, Eye, BarChart3, TrendingDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const ExplanationPanel = ({ mistake }) => {
    if (!mistake) return null;

    // Simulate Impact Scores based on category
    const getImpactScores = () => {
        const cat = mistake.category.toLowerCase();
        if (cat.includes('perf')) return { performance: 'High', security: 'Low', a11y: 'Medium' };
        if (cat.includes('security')) return { performance: 'Low', security: 'Critical', a11y: 'Low' };
        if (cat.includes('a11y')) return { performance: 'Low', security: 'Low', a11y: 'Critical' };
        return { performance: 'Medium', security: 'Low', a11y: 'Low' };
    };

    const scores = getImpactScores();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass"
            style={{ borderRadius: '30px', padding: '2.5rem', marginTop: '2.5rem', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}
        >
            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'var(--accent-gradient)', opacity: 0.03, filter: 'blur(100px)', zIndex: 0 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', position: 'relative', zIndex: 1 }}>

                {/* Main Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff6b6b', marginBottom: '1rem' }}>
                                <ShieldAlert size={20} />
                                <h4 style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>The Anti-Pattern</h4>
                            </div>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>{mistake.description}</p>
                        </section>

                        <section>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fcc419', marginBottom: '1rem' }}>
                                <Lightbulb size={20} />
                                <h4 style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Technical Root Cause</h4>
                            </div>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>{mistake.why}</p>
                        </section>
                    </div>

                    <section style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-success)', marginBottom: '1rem' }}>
                            <Zap size={20} />
                            <h4 style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>Resolution Strategy</h4>
                        </div>
                        <p style={{ color: 'var(--text-main)', lineHeight: 1.7, fontSize: '1rem', fontWeight: 500 }}>{mistake.howToFix}</p>
                    </section>
                </div>

                {/* Impact & Benchmarks Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)' }}>

                    <div>
                        <h5 style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.1em' }}>Audit Scorecard</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <ImpactMeter label="Performance" value={scores.performance} color="var(--accent-primary)" />
                            <ImpactMeter label="Security" value={scores.security} color="#ef4444" />
                            <ImpactMeter label="Accessibility" value={scores.a11y} color="#10b981" />
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                            <BarChart3 size={14} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Benchmark (Avg)</span>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                                <span>Broken</span>
                                <span style={{ color: '#ef4444' }}>142ms</span>
                            </div>
                            <div style={{ height: '4px', background: '#333', borderRadius: '2px' }}>
                                <div style={{ height: '100%', width: '85%', background: '#ef4444', borderRadius: '2px' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                                <span>Fixed</span>
                                <span style={{ color: '#10b981' }}>14ms</span>
                            </div>
                            <div style={{ height: '4px', background: '#333', borderRadius: '2px' }}>
                                <div style={{ height: '100%', width: '12%', background: '#10b981', borderRadius: '2px' }} />
                            </div>
                        </div>
                    </div>

                    <button style={{
                        marginTop: 'auto', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)',
                        background: 'transparent', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
                    }}>
                        Deep Dive Docs <ExternalLink size={14} />
                    </button>
                </div>

            </div>
        </motion.div>
    );
};

const ImpactMeter = ({ label, value, color }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{label}</span>
        <span style={{
            fontSize: '0.65rem', fontWeight: 900, padding: '2px 8px', borderRadius: '100px',
            background: `${color}15`, color: color, border: `1px solid ${color}30`
        }}>{value}</span>
    </div>
);

export default ExplanationPanel;
