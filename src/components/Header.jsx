import React, { useState } from 'react';
import {
    Bug, FileText, Search, Menu, X, Layers,
    Trophy, Terminal, Activity, Bell, Settings,
    Sun, Moon, Palette, ShieldCheck, Zap as ZapIcon
} from 'lucide-react';

const Header = ({ currentView, onViewChange, xp, level, theme, setTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const THEMES = [
        { id: 'midnight', icon: Moon, label: 'Midnight' },
        { id: 'cyberpunk', icon: ZapIcon, label: 'Cyberpunk' },
        { id: 'dracula', icon: Search, label: 'Dracula' },
        { id: 'solarized', icon: Sun, label: 'Solarized' }
    ];

    const NavItem = ({ view, label, icon: Icon }) => (
        <button
            onClick={() => {
                onViewChange(view);
                setIsMenuOpen(false);
            }}
            className={`nav-item ${currentView === view ? 'active' : ''}`}
            style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
                borderRadius: '12px', color: currentView === view ? 'white' : 'var(--text-muted)',
                background: currentView === view ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                fontSize: '0.85rem', fontWeight: 700, transition: 'all 0.2s ease',
                border: '1px solid', borderColor: currentView === view ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                cursor: 'pointer'
            }}
        >
            <Icon size={16} />
            <span>{label}</span>
        </button>
    );

    return (
        <header className="glass" style={{
            padding: '1rem var(--main-padding)', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 1000,
            marginBottom: '2.5rem', borderBottom: '1px solid var(--border-color)',
            backdropFilter: 'blur(20px)'
        }}>
            {/* Brand Area */}
            <div
                onClick={() => onViewChange('simulator')}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
            >
                <div style={{
                    background: 'var(--accent-gradient)', padding: '10px', borderRadius: '14px',
                    boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.5)', display: 'flex'
                }}>
                    <Bug color="white" size={24} />
                </div>
                <div>
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>
                        Dev<span className="text-gradient">Mistakes</span>
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)' }} />
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>v2.0 Immersive Suite</span>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <NavItem view="simulator" label="Workbench" icon={Layers} />
                <NavItem view="challenge" label="Challenges" icon={Trophy} />
                <NavItem view="playground" label="Lab" icon={Terminal} />
                <NavItem view="analyzer" label="Auditor" icon={Search} />
                <NavItem view="docs" label="Masterclass" icon={FileText} />
            </nav>

            {/* System Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav system-area">
                {/* Theme Switcher */}
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '10px' }}>
                    {THEMES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            title={t.label}
                            style={{
                                width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                borderRadius: '8px', border: 'none', background: theme === t.id ? 'var(--accent-primary)' : 'transparent',
                                color: theme === t.id ? 'white' : 'var(--text-dim)', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <t.icon size={14} />
                        </button>
                    ))}
                </div>

                <div style={{ width: '1px', height: '20px', background: 'var(--border-color)' }} />

                {/* XP / Level Display */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-dim)' }}>LVL</span>
                            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{level}</span>
                        </div>
                        <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${(xp % 500) / 5}%`, height: '100%', background: 'var(--accent-gradient)' }} />
                        </div>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShieldCheck size={18} className="text-accent" />
                    </div>
                </div>
            </div>

            <div className="mobile-toggle" style={{ display: 'none' }}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: 'var(--text-main)', background: 'transparent', border: 'none' }}>
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="mobile-menu glass animate-slide-up" style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, padding: '1.5rem',
                    display: 'flex', flexDirection: 'column', gap: '20px', borderBottom: '1px solid var(--border-color)',
                    background: 'var(--bg-page)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <NavItem view="simulator" label="Workbench" icon={Layers} />
                        <NavItem view="challenge" label="Challenges" icon={Trophy} />
                        <NavItem view="playground" label="Lab" icon={Terminal} />
                        <NavItem view="analyzer" label="Auditor" icon={Search} />
                        <NavItem view="docs" label="Masterclass" icon={FileText} />
                    </div>

                    <div style={{ height: '1px', background: 'var(--border-color)', margin: '5px 0' }} />

                    {/* Mobile Theme Switcher */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Theme</span>
                        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '6px', borderRadius: '12px' }}>
                            {THEMES.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTheme(t.id)}
                                    style={{
                                        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '10px', border: 'none', background: theme === t.id ? 'var(--accent-primary)' : 'transparent',
                                        color: theme === t.id ? 'white' : 'var(--text-dim)', cursor: 'pointer'
                                    }}
                                >
                                    <t.icon size={16} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile XP Info */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldCheck size={20} className="text-accent" />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-dim)' }}>YOUR LEVEL</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: 'white' }}>Rank {level}</p>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{xp % 500} / 500 XP</p>
                            <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', marginTop: '6px', overflow: 'hidden' }}>
                                <div style={{ width: `${(xp % 500) / 5}%`, height: '100%', background: 'var(--accent-gradient)' }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .nav-item:hover { color: white !important; background: rgba(255,255,255,0.05) !important; }
                .text-gradient { background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .text-accent { color: var(--accent-primary); }
                @media (max-width: 1024px) {
                    .desktop-nav { display: none !important; }
                    .mobile-toggle { display: block !important; }
                    header { padding: 0.75rem 1rem !important; }
                }
            `}} />
        </header>
    );
};

export default Header;
