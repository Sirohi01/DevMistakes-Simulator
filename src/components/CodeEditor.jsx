import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, onChange, language = 'javascript', readOnly = false }) => {
    return (
        <div className="code-editor-container" style={{ height: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#1e1e1e' }}>
            <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={code}
                onChange={(value) => onChange(value || '')}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: 'Fira Code, monospace',
                    readOnly: readOnly,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    lineNumbers: 'on',
                    renderLineHighlight: 'all',
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on'
                }}
            />
        </div>
    );
};

export default CodeEditor;
