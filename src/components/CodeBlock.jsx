import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';

const CodeBlock = ({ code, label, type = 'broken' }) => {
    const isError = type === 'broken';

    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    return (
        <div style={{
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: '#0d0e1a',
            marginTop: '1rem',
            flex: 1
        }}>
            <div style={{
                padding: '8px 16px',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                color: isError ? 'var(--color-error)' : 'var(--color-success)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <span>{label}</span>
                <span>{isError ? '❌' : '✅'}</span>
            </div>
            <pre className="line-numbers" style={{
                padding: '16px',
                margin: 0,
                fontSize: '0.85rem',
                lineHeight: '1.5',
                overflowX: 'auto',
                background: 'transparent'
            }}>
                <code className={`language-jsx`}>
                    {code.trim()}
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;

