import React, { useState } from 'react';
import {
    Bug, FileText, Search, Menu, X, Layers,
    Trophy, Terminal, Activity, Bell, Settings
} from 'lucide-react';

const Header = ({ currentView, onViewChange }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>v3.5 Enterprise Suite</span>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-nav">
                <button title="Notifications" style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                    <Bell size={20} />
                </button>
                <div style={{ width: '1px', height: '20px', background: 'var(--border-color)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white', lineHeight: 1 }}>Pro Dev</p>
                        <p style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', fontWeight: 700 }}>Rank #124</p>
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Activity size={18} className="text-accent" />
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
                    display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '1px solid var(--border-color)'
                }}>
                    <NavItem view="simulator" label="Workbench" icon={Layers} />
                    <NavItem view="challenge" label="Challenges" icon={Trophy} />
                    <NavItem view="playground" label="Lab" icon={Terminal} />
                    <NavItem view="analyzer" label="Auditor" icon={Search} />
                    <NavItem view="docs" label="Masterclass" icon={FileText} />
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
                }
            `}} />
        </header>
    );
};

export default Header;
