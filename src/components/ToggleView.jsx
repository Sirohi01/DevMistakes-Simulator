import React from 'react';
import { Eye, Code } from 'lucide-react';

const ToggleView = ({ activeMode, onChange }) => {
    return (
        <div style={{
            display: 'inline-flex',
            gap: '4px',
            background: 'var(--bg-card)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem'
        }}>
            <button
                onClick={() => onChange('preview')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    background: activeMode === 'preview' ? 'var(--bg-hover)' : 'transparent',
                    color: activeMode === 'preview' ? 'var(--text-main)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                }}
            >
                <Eye size={16} />
                Preview
            </button>
            <button
                onClick={() => onChange('code')}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    background: activeMode === 'code' ? 'var(--bg-hover)' : 'transparent',
                    color: activeMode === 'code' ? 'var(--text-main)' : 'var(--text-muted)',
                    transition: 'all 0.2s ease'
                }}
            >
                <Code size={16} />
                Code
            </button>
        </div>
    );
};

export default ToggleView;
