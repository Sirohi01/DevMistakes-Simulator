import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2, Key, Speaker, Volume2, VolumeX, Save, ShieldAlert } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, apiKey, setApiKey, soundEnabled, setSoundEnabled }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="glass"
                        style={{
                            width: '100%',
                            maxWidth: '500px',
                            borderRadius: '32px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            overflow: 'hidden',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: 'var(--accent-gradient)', padding: '10px', borderRadius: '12px' }}>
                                    <Settings2 size={20} color="white" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Preferences</h3>
                            </div>
                            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* API Key Section */}
                            <section>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                    <Key size={16} className="text-accent" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>AI API Key</span>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="password"
                                        placeholder="Enter your Gemini/OpenAI key..."
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px 16px',
                                            borderRadius: '12px',
                                            background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid var(--border-color)',
                                            color: '#fff',
                                            fontSize: '0.9rem'
                                        }}
                                    />
                                    <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'start', gap: '8px', padding: '10px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '10px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                                        <ShieldAlert size={14} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
                                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                                            Key is stored strictly in your local browser storage. Never share your key.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Audio Section */}
                            <section>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                                    <Speaker size={16} className="text-secondary" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Audio Experience</span>
                                </div>
                                <div
                                    onClick={() => setSoundEnabled(!soundEnabled)}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        background: 'rgba(255,255,255,0.02)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--border-color)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        {soundEnabled ? <Volume2 size={20} className="text-accent" /> : <VolumeX size={20} style={{ color: 'var(--text-dim)' }} />}
                                        <span style={{ fontWeight: 600 }}>Enable Sound Effects</span>
                                    </div>
                                    <div style={{
                                        width: '40px', height: '20px', borderRadius: '20px',
                                        background: soundEnabled ? 'var(--accent-primary)' : '#333',
                                        position: 'relative', transition: 'all 0.3s ease'
                                    }}>
                                        <div style={{
                                            position: 'absolute', top: '2px', left: soundEnabled ? '22px' : '2px',
                                            width: '16px', height: '16px', borderRadius: '50%', background: '#fff',
                                            transition: 'all 0.3s ease'
                                        }} />
                                    </div>
                                </div>
                            </section>

                            <button
                                onClick={onClose}
                                style={{
                                    marginTop: '1rem',
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    background: 'var(--accent-gradient)',
                                    color: 'white',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    boxShadow: '0 8px 20px -6px rgba(99, 102, 241, 0.5)'
                                }}
                            >
                                <Save size={18} />
                                Save & Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;
