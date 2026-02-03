import React from 'react';

const StatusMetric = ({ label, value, color = 'var(--text-muted)' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{label}:</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: color }}>{value}</span>
    </div>
);

const GlobalHUD = ({ isFixed }) => {
    return (
        <div className="animate-slide-up global-hud" style={{
            display: 'flex', gap: '1.5rem', marginBottom: '2.5rem',
            padding: '1.25rem 2rem', background: 'rgba(99, 102, 241, 0.03)',
            borderRadius: '24px', border: '1px solid var(--border-color)',
            alignItems: 'center', flexWrap: 'wrap'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isFixed ? 'var(--color-success)' : 'var(--color-error)', boxShadow: `0 0 10px ${isFixed ? 'var(--color-success)' : 'var(--color-error)'}` }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Project Health: {isFixed ? 'Optimized' : 'Degraded'}</span>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} className="hud-divider" />
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }} className="hud-metrics">
                <StatusMetric label="Audit Coverage" value="84%" />
                <StatusMetric label="Security Flaws" value={isFixed ? '0' : '2'} color={isFixed ? 'white' : 'var(--color-error)'} />
                <StatusMetric label="Render Latency" value={isFixed ? '14ms' : '142ms'} color={isFixed ? 'var(--color-success)' : 'var(--color-error)'} />
            </div>
        </div>
    );
};

export default GlobalHUD;
