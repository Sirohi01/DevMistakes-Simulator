import React, { useState } from 'react';
import {
    BookOpen, Layers, Trophy, Terminal, Search, Rocket, FileText, Settings,
    ShieldCheck, Zap, Code, ChevronRight, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Documentation = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sections = [
        { id: 'intro', icon: BookOpen, title: 'Introduction', desc: 'Welcome to DevMistakes' },
        { id: 'workbench', icon: Layers, title: 'Workbench', desc: 'The Core Simulator' },
        { id: 'projects', icon: Rocket, title: 'Project Mode', desc: 'Real-world Bug Fixing' },
        { id: 'challenges', icon: Trophy, title: 'Challenges', desc: 'Time Trials & Speed' },
        { id: 'auditor', icon: Search, title: 'Code Auditor', desc: 'AI Code Analysis' },
        { id: 'lab', icon: Terminal, title: 'The Lab', desc: 'Experimental Playground' },
        { id: 'settings', icon: Settings, title: 'Settings & Profile', desc: 'Themes, API & Sound' },
    ];

    const content = {
        intro: (
            <div className="doc-content">
                <h1>Welcome to DevMistakes v3.0 Pro</h1>
                <p className="lead">The ultimate platform to master React debugging, fix CSS layout issues, and learn professional coding patterns.</p>

                <div className="feature-grid">
                    <div className="feature-card">
                        <h3>🚀 Learn by Fixing</h3>
                        <p>Don't just read about bugs. Fix them. Our simulator provides broken code that you need to repair.</p>
                    </div>
                    <div className="feature-card">
                        <h3>🤖 AI Powered</h3>
                        <p>Integrated with Google Gemini AI to provide context-aware hints, explanations, and code reviews.</p>
                    </div>
                    <div className="feature-card">
                        <h3>⚔️ Gamified Learning</h3>
                        <p>Earn XP, climb levels, and unlock achievements as you master difficult concepts.</p>
                    </div>
                </div>
            </div>
        ),
        workbench: (
            <div className="doc-content">
                <h1>The Workbench</h1>
                <p>The Workbench is your main dashboard for learning. It contains a categorized library of common React and CSS mistakes.</p>

                <h3>Key Features</h3>
                <ul>
                    <li><strong>Mistake Selector:</strong> Choose from categories like 'React Core', 'CSS Architecture', 'Hooks', and 'Performance'.</li>
                    <li><strong>Live Preview:</strong> See the bug in action. The preview renders the broken code in real-time.</li>
                    <li><strong>Code Inspector:</strong> View the problematic source code. Use the "Fix" toggle to act as a switch between broken and fixed states.</li>
                    <li><strong>AI Peer Review:</strong> Ask the AI Assistant "Why is this broken?" to get a deep-dive explanation.</li>
                </ul>

                <div className="info-box">
                    <strong>Tip:</strong> Use the "Show Solution" toggle to instantly see how the code *should* look, but try to figure it out yourself first!
                </div>
            </div>
        ),
        projects: (
            <div className="doc-content">
                <h1>Project Mode</h1>
                <p>Step up from isolated snippets to full application debugging. Project Mode places you in a realistic environment with mini-apps containing multiple hidden bugs.</p>

                <h3>Available Projects</h3>
                <div className="project-list">
                    <div className="project-item">
                        <h4>📝 Todo App (Beginner)</h4>
                        <p>A simple list app riddled with state mutation issues, missing keys, and memory leaks.</p>
                    </div>
                    <div className="project-item">
                        <h4>🛒 Shopping Cart (Intermediate)</h4>
                        <p>An e-commerce cart component with sync issues, floating point math errors, and performance drags.</p>
                    </div>
                    <div className="project-item">
                        <h4>📊 Dashboard (Advanced)</h4>
                        <p>A complex analytics dashboard suffering from infinite loops, layout thrashing, and unnecessary re-renders.</p>
                    </div>
                </div>

                <h3>Tools & Workflow</h3>
                <ul>
                    <li><strong>Bug Checklist:</strong> A list of reported issues you need to verify.</li>
                    <li><strong>Interactive Code Editor:</strong> Click "Fix Code" to open a VS Code-like editor where you apply the actual fix.</li>
                    <li><strong>God Mode:</strong> Use the "Visual Debugger" toggle in the header to see component layouts and find CSS bugs.</li>
                    <li><strong>Ship to Prod:</strong> Once all bugs are found and fixed, click "Ship" to complete the project and earn big XP rewards.</li>
                </ul>
            </div>
        ),
        challenges: (
            <div className="doc-content">
                <h1>Challenge Mode</h1>
                <p>Test your speed and accuracy under pressure. Challenges are timed events where you must find and fix bugs against the clock.</p>

                <h3>How it Works</h3>
                <ol>
                    <li>Select a challenge difficulty.</li>
                    <li>The timer starts immediately.</li>
                    <li>Identify the bug in the provided snippet.</li>
                    <li>Select the correct fix option or type the solution.</li>
                    <li>Score points based on speed and accuracy.</li>
                </ol>
            </div>
        ),
        auditor: (
            <div className="doc-content">
                <h1>Code Auditor</h1>
                <p>Have your own code that's acting up? The Auditor is an AI-powered static analysis tool.</p>

                <h3>Usage Guide</h3>
                <ol>
                    <li>Copy code from your real projects.</li>
                    <li>Paste it into the Auditor text area.</li>
                    <li>Click <strong>"Analyze Code"</strong>.</li>
                    <li>The AI will scan for anti-patterns, potential bugs, and performance bottlenecks.</li>
                    <li>Download a detailed <strong>Audit Report</strong> (JSON/Markdown) to share with your team.</li>
                </ol>
            </div>
        ),
        lab: (
            <div className="doc-content">
                <h1>The Lab</h1>
                <p>A sandbox environment for free experimentation. No goals, no timer, just code.</p>

                <ul>
                    <li>Test out new libraries.</li>
                    <li>Try reproducing a bug you found in the wild.</li>
                    <li>Prototype UI components quickly.</li>
                </ul>
            </div>
        ),
        settings: (
            <div className="doc-content">
                <h1>Settings & Profile</h1>
                <p>Customize your DevMistakes experience.</p>

                <h3>Configuration Options</h3>
                <ul>
                    <li><strong>API Key:</strong> Enter your own Google Gemini API key for unlimited AI usage. Keys are stored locally on your device.</li>
                    <li><strong>Themes:</strong> Switch between Midnight, Cyberpunk, Dracula, and Solarized color schemes.</li>
                    <li><strong>Sound Effects:</strong> Toggle UI sounds for XP gain and interactions.</li>
                    <li><strong>Data Management:</strong> Reset your progress or export your profile data.</li>
                </ul>
            </div>
        )
    };

    return (
        <div className="docs-layout" style={{ display: 'flex', gap: '2rem', maxWidth: '1400px', margin: '0 auto', padding: '0 1rem 4rem 1rem', minHeight: '80vh', position: 'relative' }}>
            {/* Mobile Menu Toggle */}
            <button
                className="mobile-docs-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                    display: 'none', // Hidden by default, shown in CSS
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px', // Moved to left to avoid AI Assistant overlap
                    zIndex: 100,
                    background: 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
                }}
            >
                {isMobileMenuOpen ? <ChevronRight size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div className={`docs-sidebar glass ${isMobileMenuOpen ? 'open' : ''}`} style={{
                width: '300px',
                padding: '1.5rem',
                borderRadius: '16px',
                height: 'fit-content',
                position: 'sticky',
                top: '100px', // Adjusted for Header
                alignSelf: 'start',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto'
            }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookOpen size={20} className="text-accent" /> Documentation
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sections.map(sec => (
                        <button
                            key={sec.id}
                            onClick={() => {
                                setActiveSection(sec.id);
                                setIsMobileMenuOpen(false); // Auto-close on mobile
                            }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px', borderRadius: '10px',
                                background: activeSection === sec.id ? 'var(--accent-primary)' : 'transparent',
                                color: activeSection === sec.id ? 'white' : 'var(--text-dim)',
                                border: 'none', cursor: 'pointer', textAlign: 'left',
                                transition: 'all 0.2s',
                                width: '100%'
                            }}
                        >
                            <sec.icon size={18} />
                            <div>
                                <span style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem' }}>{sec.title}</span>
                                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{sec.desc}</span>
                            </div>
                            {activeSection === sec.id && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="docs-main glass" style={{
                flex: 1,
                padding: '3rem',
                borderRadius: '16px'
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {content[activeSection]}
                    </motion.div>
                </AnimatePresence>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .doc-content h1 { font-size: clamp(2rem, 5vw, 2.5rem); font-weight: 900; margin-bottom: 1rem; color: white; line-height: 1.2; }
                .doc-content .lead { font-size: 1.2rem; color: var(--text-dim); margin-bottom: 2rem; max-width: 800px; }
                .doc-content h3 { font-size: 1.5rem; font-weight: 700; margin: 2rem 0 1rem 0; color: var(--accent-secondary); }
                .doc-content p { color: var(--text-muted); line-height: 1.7; font-size: 1.05rem; margin-bottom: 1rem; }
                .doc-content ul, .doc-content ol { padding-left: 1.5rem; color: var(--text-muted); margin-bottom: 1.5rem; }
                .doc-content li { margin-bottom: 0.5rem; line-height: 1.6; }
                .doc-content strong { color: white; }
                
                .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 2rem; }
                
                @media (max-width: 600px) {
                    .feature-grid { grid-template-columns: 1fr; }
                    .docs-layout { padding: 0 1rem 6rem 1rem !important; }
                }

                .feature-card { background: rgba(255,255,255,0.05); padding: 1.5rem; borderRadius: 16px; border: 1px solid var(--border-color); }
                .feature-card h3 { margin-top: 0; font-size: 1.3rem; color: white; margin-bottom: 0.8rem; }
                .feature-card p { font-size: 0.9rem; margin-bottom: 0; }

                .info-box { background: rgba(99, 102, 241, 0.1); border-left: 4px solid var(--accent-primary); padding: 1rem; border-radius: 8px; margin: 1.5rem 0; }
                
                .project-item { margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); }
                .project-item h4 { color: white; font-size: 1.2rem; margin-bottom: 0.5rem; }
                
                @media (max-width: 900px) {
                    .docs-layout { flexDirection: column; padding: 0 1rem 5rem 1rem; }
                    .mobile-docs-toggle { display: flex !important; }
                    
                    /* Typography Adjustments */
                    .doc-content h1 { font-size: 1.8rem !important; margin-top: 0; }
                    .doc-content p.lead { font-size: 1rem !important; }
                    .doc-content h3 { font-size: 1.3rem !important; margin-top: 1.5rem !important; }
                    
                    /* Sidebar Styling */
                    .docs-sidebar {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        height: 100vh !important;
                        width: 280px !important;
                        z-index: 90;
                        background: #0f172a !important;
                        transform: translateX(-100%);
                        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        margin: 0 !important;
                        border-radius: 0 !important;
                        border-right: 1px solid var(--border-color);
                        box-shadow: none;
                    }
                    
                    .docs-sidebar.open {
                        transform: translateX(0);
                        box-shadow: 10px 0 50px rgba(0,0,0,0.5);
                    }

                    .docs-main { 
                        padding: 1.5rem !important; 
                        width: 100%;
                        border-radius: 12px;
                    }
                    
                    /* Overlay */
                    .docs-layout::before {
                        content: '';
                        position: fixed;
                        inset: 0;
                        background: rgba(0,0,0,0.7);
                        backdrop-filter: blur(4px);
                        z-index: 80;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.3s;
                    }
                }
                
                body.menu-open .docs-layout::before {
                    opacity: 1;
                    pointer-events: all;
                }
            `}} />

            {/* Overlay Click Handler */}
            {isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 85 }}
                />
            )}
        </div>
    );
};

export default Documentation;
