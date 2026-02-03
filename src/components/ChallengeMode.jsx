import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Zap, Award, Target, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

const ChallengeMode = ({ mistakes, onComplete, onAddXp }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [gameStatus, setGameStatus] = useState('playing'); // playing, finished

    const currentMistake = mistakes[currentStep % mistakes.length];

    // Generate answers (1 correct, 2 distractors)
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const distractors = mistakes
            .filter(m => m.id !== currentMistake.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2)
            .map(m => m.fixedCode);

        const allOptions = [...distractors, currentMistake.fixedCode].sort(() => 0.5 - Math.random());
        setOptions(allOptions);
        setSelectedAnswer(null);
        setIsCorrect(null);
    }, [currentStep, mistakes, currentMistake]);

    const handleAnswer = (answer) => {
        if (selectedAnswer) return;
        setSelectedAnswer(answer);
        const correct = answer === currentMistake.fixedCode;
        setIsCorrect(correct);
        if (correct) {
            setScore(s => s + 100);
            if (onAddXp) onAddXp(20); // Small bonus per correct answer
        }
    };

    const nextQuestion = () => {
        if (currentStep >= 4) {
            setGameStatus('finished');
            if (onAddXp) onAddXp(100); // Big bonus for finishing
        } else {
            setCurrentStep(s => s + 1);
        }
    };

    if (gameStatus === 'finished') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ position: 'relative', overflow: 'hidden' }}
            >
                {/* Simple CSS Confetti */}
                <div className="confetti-container">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="confetti-piece" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            backgroundColor: ['#6366f1', '#a855f7', '#22c55e', '#ef4444'][Math.floor(Math.random() * 4)]
                        }} />
                    ))}
                </div>

                <div className="glass" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', margin: '4rem auto', borderRadius: '24px', position: 'relative', zIndex: 1 }}>
                    <Trophy size={80} color="var(--accent-primary)" style={{ marginBottom: '2rem' }} />
                    <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Challenge Complete!</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Final Score: <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{score}</span></p>
                    <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => { setGameStatus('playing'); setCurrentStep(0); setScore(0); }}
                            style={{ padding: '12px 24px', borderRadius: '12px', background: 'var(--accent-gradient)', color: 'white', fontWeight: 700 }}
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`I just scored ${score} points on DevMistakes Simulator! Can you beat me?`);
                                alert('Challenge results copied to clipboard!');
                            }}
                            style={{ padding: '12px 24px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'white' }}
                        >
                            Share Score
                        </button>
                    </div>
                </div>

                <style>{`
                    .confetti-container { position: absolute; inset: 0; pointer-events: none; }
                    .confetti-piece {
                        position: absolute; width: 10px; height: 10px; top: -10px;
                        opacity: 0; animation: fall 3s linear infinite;
                    }
                    @keyframes fall {
                        0% { transform: translateY(0) rotate(0); opacity: 1; }
                        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                    }
                `}</style>
            </motion.div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Level {currentStep + 1}/5</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Identify the correct fix for the following anti-pattern.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Score</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-secondary)' }}>{score}</div>
                </div>
            </div>

            <div className="challenge-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-error)', marginBottom: '1rem' }}>
                        <ShieldAlert size={18} />
                        <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>BROKEN IMPLEMENTATION</span>
                    </div>
                    <div style={{ background: '#0d0e1a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #222' }}>
                        <code style={{ fontSize: '0.9rem', color: '#d1d5db', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>
                            {currentMistake.brokenCode}
                        </code>
                    </div>
                    <div style={{ marginTop: '2rem' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>The Issue:</h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{currentMistake.description}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Target size={18} className="text-accent" /> Select Correct Fix:
                    </h4>
                    {options.map((opt, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(opt)}
                            style={{
                                padding: '1.5rem',
                                borderRadius: '16px',
                                background: selectedAnswer === opt
                                    ? (idx === options.findIndex(o => o === currentMistake.fixedCode) ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)')
                                    : 'var(--bg-card)',
                                border: '1px solid',
                                borderColor: selectedAnswer === opt
                                    ? (idx === options.findIndex(o => o === currentMistake.fixedCode) ? 'var(--color-success)' : 'var(--color-error)')
                                    : 'var(--border-color)',
                                textAlign: 'left',
                                cursor: selectedAnswer ? 'default' : 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <code style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{opt}</code>
                            {selectedAnswer === opt && (
                                <div style={{ position: 'absolute', top: 8, right: 8 }}>
                                    {opt === currentMistake.fixedCode ? <ShieldCheck color="var(--color-success)" size={20} /> : <ShieldAlert color="var(--color-error)" size={20} />}
                                </div>
                            )}
                        </motion.button>
                    ))}

                    <AnimatePresence>
                        {selectedAnswer && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ marginTop: '1rem' }}
                            >
                                <div style={{
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    background: isCorrect ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: isCorrect ? 'var(--color-success)' : 'var(--color-error)',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    marginBottom: '1rem'
                                }}>
                                    {isCorrect ? '✅ Excellent! You found the fix.' : '❌ Oops! That code actually causes more issues.'}
                                </div>
                                <button
                                    onClick={nextQuestion}
                                    style={{
                                        width: '100%', padding: '14px', borderRadius: '12px',
                                        background: 'var(--text-main)', color: 'black', fontWeight: 800,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}
                                >
                                    Next Level <ArrowRight size={18} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    .challenge-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default ChallengeMode;
