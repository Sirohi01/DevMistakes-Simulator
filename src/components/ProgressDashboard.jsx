import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Zap, Target, Code, Shield, Palette, Cpu } from 'lucide-react';

const ProgressDashboard = ({ xp, level }) => {
    // Calculate category mastery (mock data for now)
    const categories = [
        { name: 'React Patterns', icon: Code, mastery: 75, color: '#6366f1' },
        { name: 'Performance', icon: Zap, mastery: 60, color: '#f59e0b' },
        { name: 'Security', icon: Shield, mastery: 45, color: '#ef4444' },
        { name: 'CSS/Layout', icon: Palette, mastery: 80, color: '#8b5cf6' },
        { name: 'Architecture', icon: Cpu, mastery: 55, color: '#10b981' }
    ];

    const stats = [
        { label: 'Total XP', value: xp, icon: Zap, color: 'var(--accent-primary)' },
        { label: 'Current Level', value: level, icon: Award, color: 'var(--color-success)' },
        { label: 'Mistakes Fixed', value: Math.floor(xp / 50), icon: Target, color: '#f59e0b' },
        { label: 'Avg Score', value: '78%', icon: TrendingUp, color: '#8b5cf6' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '2rem 0' }}
        >
            {/* Header */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 className="responsive-h2" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                    Your Progress
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Track your mastery across different coding categories
                </p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass"
                        style={{
                            padding: '1.5rem',
                            borderRadius: '20px',
                            border: '1px solid var(--border-color)',
                            textAlign: 'center'
                        }}
                    >
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: `${stat.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                        }}>
                            <stat.icon size={24} style={{ color: stat.color }} />
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: stat.color, marginBottom: '0.5rem' }}>
                            {stat.value}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mastery Radar */}
            <div className="glass" style={{
                padding: '2rem',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                marginBottom: '2rem'
            }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Target size={20} className="text-accent" />
                    Category Mastery
                </h3>

                <div className="mastery-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: `${cat.color}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <cat.icon size={18} style={{ color: cat.color }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{cat.name}</span>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: cat.color }}>{cat.mastery}%</span>
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${cat.mastery}%` }}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                            style={{
                                                height: '100%',
                                                background: cat.color,
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* XP Breakdown */}
            <div className="glass" style={{
                padding: '2rem',
                borderRadius: '24px',
                border: '1px solid var(--border-color)'
            }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                    XP Breakdown
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <XPSource label="Challenges Completed" xp={Math.floor(xp * 0.4)} total={xp} color="#6366f1" />
                    <XPSource label="Code Audits" xp={Math.floor(xp * 0.3)} total={xp} color="#f59e0b" />
                    <XPSource label="Playground Experiments" xp={Math.floor(xp * 0.2)} total={xp} color="#8b5cf6" />
                    <XPSource label="Bonus Achievements" xp={Math.floor(xp * 0.1)} total={xp} color="#10b981" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .mastery-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 480px) {
                    .stats-grid { grid-template-columns: 1fr !important; }
                }
            `}} />
        </motion.div>
    );
};

const XPSource = ({ label, xp, total, color }) => {
    const percentage = total > 0 ? (xp / total) * 100 : 0;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color }}>{xp} XP</span>
            </div>
            <div style={{
                height: '6px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8 }}
                    style={{
                        height: '100%',
                        background: color,
                        borderRadius: '3px'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressDashboard;
