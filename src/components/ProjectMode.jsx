import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Trophy, Zap, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const ProjectMode = ({ onSelectProject, completedProjects = [] }) => {
    const projects = [
        {
            id: 'todo-bugs',
            title: 'Todo App with Bugs',
            difficulty: 'Beginner',
            bugCount: 5,
            xpReward: 250,
            description: 'Classic todo app with common React mistakes',
            issues: ['Missing keys', 'State mutation', 'Memory leaks'],
            color: '#10b981',
            unlocked: true
        },
        {
            id: 'cart-issues',
            title: 'Shopping Cart Issues',
            difficulty: 'Intermediate',
            bugCount: 6,
            xpReward: 400,
            description: 'E-commerce cart with calculation and sync bugs',
            issues: ['Price bugs', 'State sync', 'Performance'],
            color: '#f59e0b',
            unlocked: true // Temporarily unlocked for testing
        },
        {
            id: 'dashboard-perf',
            title: 'Dashboard Performance',
            difficulty: 'Advanced',
            bugCount: 8,
            xpReward: 600,
            description: 'Analytics dashboard with severe performance issues',
            issues: ['Re-render hell', 'Data fetching', 'Layout thrashing'],
            color: '#ef4444',
            unlocked: true // Temporarily unlocked for testing
        }
    ];

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return '#10b981';
            case 'Intermediate': return '#f59e0b';
            case 'Advanced': return '#ef4444';
            default: return '#6366f1';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '2rem 0' }}
        >
            {/* Header */}
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1.5rem',
                        borderRadius: '20px',
                        background: 'var(--accent-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                    }}
                >
                    <Code2 size={40} color="white" />
                </motion.div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>
                    Project Mode
                </h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '1rem' }}>
                    Debug complete mini-apps with multiple interconnected bugs
                </p>
            </div>

            {/* Projects Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {projects.map((project, idx) => {
                    const isCompleted = completedProjects.includes(project.id);
                    const isLocked = !project.unlocked;

                    return (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
                            className="glass"
                            style={{
                                padding: '2rem',
                                borderRadius: '24px',
                                border: `2px solid ${isCompleted ? project.color : 'var(--border-color)'}`,
                                background: isLocked ? 'rgba(0,0,0,0.3)' : 'var(--bg-card)',
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                opacity: isLocked ? 0.6 : 1
                            }}
                            onClick={() => !isLocked && onSelectProject(project)}
                        >
                            {/* Status Badge */}
                            {isCompleted && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: project.color,
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    <CheckCircle size={14} />
                                    Completed
                                </div>
                            )}

                            {isLocked && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '6px 12px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    <Lock size={14} />
                                    Locked
                                </div>
                            )}

                            {/* Difficulty Badge */}
                            <div style={{
                                display: 'inline-block',
                                background: getDifficultyColor(project.difficulty),
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                marginBottom: '1rem'
                            }}>
                                {project.difficulty}
                            </div>

                            {/* Title */}
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 900,
                                marginBottom: '0.5rem'
                            }}>
                                {project.title}
                            </h3>

                            {/* Description */}
                            <p style={{
                                color: 'var(--text-dim)',
                                fontSize: '0.9rem',
                                marginBottom: '1.5rem',
                                lineHeight: 1.5
                            }}>
                                {project.description}
                            </p>

                            {/* Stats */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    textAlign: 'center'
                                }}>
                                    <AlertCircle size={20} style={{ color: project.color, marginBottom: '6px' }} />
                                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{project.bugCount}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Bugs</div>
                                </div>
                                <div style={{
                                    flex: 1,
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    textAlign: 'center'
                                }}>
                                    <Zap size={20} style={{ color: '#fbbf24', marginBottom: '6px' }} />
                                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{project.xpReward}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>XP</div>
                                </div>
                            </div>

                            {/* Issues List */}
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: 'var(--text-dim)',
                                    marginBottom: '8px'
                                }}>
                                    Issues to find:
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {project.issues.map((issue, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                background: 'rgba(255,255,255,0.05)',
                                                padding: '4px 10px',
                                                borderRadius: '8px',
                                                fontSize: '0.75rem',
                                                color: 'var(--text-dim)'
                                            }}
                                        >
                                            {issue}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            {!isLocked && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectProject(project);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        background: isCompleted ? 'rgba(255,255,255,0.1)' : 'var(--accent-gradient)',
                                        border: 'none',
                                        color: 'white',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isCompleted ? 'Play Again' : 'Start Debugging'}
                                </motion.button>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Info Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass"
                style={{
                    marginTop: '3rem',
                    padding: '2rem',
                    borderRadius: '20px',
                    maxWidth: '800px',
                    margin: '3rem auto 0',
                    textAlign: 'center'
                }}
            >
                <Trophy size={32} style={{ color: '#fbbf24', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    How Project Mode Works
                </h3>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.6 }}>
                    Each project contains multiple interconnected bugs. Find all bugs, run tests, and ship to production to earn XP.
                    Use the AI Assistant for hints, but try to solve them yourself for maximum learning!
                </p>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    .projects-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </motion.div>
    );
};

export default ProjectMode;
