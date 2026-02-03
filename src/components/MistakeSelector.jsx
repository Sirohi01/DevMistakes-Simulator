import React, { useState } from 'react';
import { CATEGORIES } from '../data/mistakes.config';
import {
    ChevronRight, Code, Layout, Blocks, Zap,
    ShieldCheck, Smartphone, Eye, Server, Award,
    BarChart
} from 'lucide-react';
import { motion } from 'framer-motion';

const MistakeSelector = ({ mistakes, selectedId, onSelect }) => {
    const categories = Object.keys(CATEGORIES);

    const CategoryIcon = ({ name }) => {
        const icons = {
            REACT: Blocks,
            CSS: Layout,
            HOOKS: Zap,
            PERF: BarChart,
            SECURITY: ShieldCheck
        };
        const Icn = icons[name] || Code;
        return <Icn size={16} />;
    };

    const CategoryBadge = ({ name }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <CategoryIcon name={name} />
            {CATEGORIES[name]}
        </div>
    );

    return (
        <aside style={{
            padding: '0 0.5rem',
            borderRight: '1px solid var(--border-color)',
            height: 'calc(100vh - 120px)',
            overflowY: 'auto',
            position: 'sticky',
            top: '100px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }} className="selector-aside custom-scrollbar">

            {/* Mastery HUD */}
            <div className="glass" style={{ margin: '0 1rem 1rem 1rem', padding: '1.25rem', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)' }}>SIMULATION PROGRESS</span>
                    <Award size={14} color="var(--accent-primary)" />
                </div>
                <div style={{ height: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '45%', background: 'var(--accent-gradient)' }} />
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.65rem', color: 'var(--text-dim)', textAlign: 'right' }}>45% Mastery reached</div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {categories.map(cat => (
                    <div key={cat} style={{ marginBottom: '1.5rem' }}>
                        <CategoryBadge name={cat} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {mistakes.filter(m => m.category === CATEGORIES[cat]).map(mistake => (
                                <button
                                    key={mistake.id}
                                    onClick={() => onSelect(mistake.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                                        width: '100%', textAlign: 'left', border: 'none', background: 'transparent',
                                        color: selectedId === mistake.id ? 'var(--text-main)' : 'var(--text-muted)',
                                        fontSize: '0.9rem', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s ease',
                                        position: 'relative', overflow: 'hidden'
                                    }}
                                    className={selectedId === mistake.id ? 'selected-mistake' : 'mistake-item'}
                                >
                                    {selectedId === mistake.id && (
                                        <motion.div layoutId="bg" className="glass" style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }} />
                                    )}
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        background: selectedId === mistake.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)'
                                    }} />
                                    <span style={{ flex: 1, fontWeight: selectedId === mistake.id ? 700 : 500 }}>{mistake.title}</span>
                                    {selectedId === mistake.id && <ChevronRight size={14} className="text-accent" />}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </motion.div>

            <style>{`
                .selected-mistake { background: rgba(99, 102, 241, 0.05) !important; color: white !important; }
                .mistake-item:hover { background: rgba(255,255,255,0.02); color: white; }
                .text-accent { color: var(--accent-primary); }
            `}</style>
        </aside>
    );
};

export default MistakeSelector;
