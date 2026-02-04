import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

const Window = ({
    id,
    title,
    children,
    isOpen,
    isMinimized,
    zIndex,
    onClose,
    onMinimize,
    onFocus,
    initialPos = { x: 50, y: 50 },
    initialSize = { width: 800, height: 600 }
}) => {
    const [isMaximized, setIsMaximized] = useState(false);

    if (!isOpen) return null;

    return (
        <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            dragConstraints={{ left: 0, top: 0, right: window.innerWidth - 100, bottom: window.innerHeight - 100 }}
            initial={{
                x: initialPos.x,
                y: initialPos.y,
                width: initialSize.width,
                height: initialSize.height,
                scale: 0.9,
                opacity: 0
            }}
            animate={{
                x: isMaximized ? 0 : undefined,
                y: isMaximized ? 0 : undefined,
                width: isMaximized ? '100vw' : initialSize.width,
                height: isMaximized ? 'calc(100vh - 48px)' : initialSize.height, // 48px for Taskbar
                scale: isMinimized ? 0 : 1,
                opacity: isMinimized ? 0 : 1,
                zIndex: zIndex
            }}
            onMouseDown={() => onFocus(id)}
            style={{
                position: isMaximized ? 'fixed' : 'absolute',
                top: 0,
                left: 0,
                background: 'var(--bg-card)',
                borderRadius: isMaximized ? 0 : '12px',
                border: isMaximized ? 'none' : '1px solid var(--border-color)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
        >
            {/* Title Bar */}
            <div
                className="window-header"
                onDoubleClick={() => setIsMaximized(!isMaximized)}
                style={{
                    padding: '0.75rem 1rem',
                    background: 'var(--bg-page)', // Slightly darker
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: isMaximized ? 'default' : 'grab',
                    userSelect: 'none'
                }}
            >
                <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {title}
                </span>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={(e) => { e.stopPropagation(); onMinimize(id); }} className="win-btn min"><Minus size={14} /></button>
                    <button onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }} className="win-btn max">
                        {isMaximized ? <MinimizeIcon /> : <Maximize2 size={12} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); onClose(id); }} className="win-btn close"><X size={14} /></button>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                {children}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .win-btn {
                    width: 28px;
                    height: 28px;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: var(--text-dim);
                    display: flex; alignItems: center; justifyContent: center;
                    cursor: pointer; transition: all 0.2s;
                }
                .win-btn:hover { background: rgba(255,255,255,0.1); color: white; }
                .win-btn.close:hover { background: #ef4444; }
            `}} />
        </motion.div>
    );
};

const MinimizeIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M15 3v18" />
        <path d="M3 15h18" />
    </svg>
); // Placeholder for unmaximize

export default Window;
