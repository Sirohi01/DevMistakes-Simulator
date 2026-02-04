import React from 'react';
import { motion } from 'framer-motion';

const Taskbar = ({ windows, onWindowClick, onStartClick, onExit }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '48px',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 1rem',
            gap: '1rem',
            zIndex: 9999
        }}>
            <button
                onClick={onStartClick}
                style={{
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none',
                    borderRadius: '6px',
                    width: '36px', height: '36px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    fontWeight: 900, color: 'white'
                }}
            >
                DM
            </button>

            <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />

            <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
                {windows.filter(w => w.isOpen).map(win => (
                    <button
                        key={win.id}
                        onClick={() => onWindowClick(win.id)}
                        style={{
                            padding: '0 12px',
                            height: '36px',
                            borderRadius: '6px',
                            border: 'none',
                            background: win.isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                            color: 'var(--text-main)',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            maxWidth: '200px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: win.isActive ? '#22c55e' : 'var(--text-muted)' }} />
                        {win.title}
                    </button>
                ))}
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600, marginRight: '1rem' }}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>

            <button
                onClick={onExit}
                title="Exit Desktop (Power Off)"
                style={{
                    background: '#ef4444',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px', height: '32px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                }}
            >
                <PowerIcon />
            </button>
        </div>
    );
};

const PowerIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
        <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
);

export default Taskbar;
