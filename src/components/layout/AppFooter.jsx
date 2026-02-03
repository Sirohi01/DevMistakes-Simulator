import React from 'react';

const AppFooter = () => {
    return (
        <footer style={{
            padding: '2rem',
            textAlign: 'center',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-dim)',
            fontSize: '0.85rem',
            background: 'rgba(0,0,0,0.2)'
        }}>
            <p>Built for the Developer Community. Learn, Verify, and Ship Clean Code.</p>
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--accent-primary)' }}>#ReactJS</span>
                <span style={{ color: 'var(--accent-secondary)' }}>#CSSGrid</span>
                <span style={{ color: 'var(--color-success)' }}>#WebDev</span>
            </div>
        </footer>
    );
};

export default AppFooter;
