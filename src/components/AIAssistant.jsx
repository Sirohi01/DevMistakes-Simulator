import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader } from 'lucide-react';

const AIAssistant = ({ apiKey, currentMistake }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Try real API if key exists
            if (apiKey && apiKey.length > 20) {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are a React expert assistant. Context: User is learning about "${currentMistake?.title || 'React patterns'}". Question: ${input}\n\nProvide a concise answer with code examples. Use markdown.`
                            }]
                        }]
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, could not generate response.';
                    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
                    setIsLoading(false);
                    return;
                }
            }

            // Fallback to mock response
            const mockResponse = generateMockResponse(input, currentMistake);
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: mockResponse }]);
                setIsLoading(false);
            }, 1000);

        } catch (error) {
            console.error('AI Error:', error);
            const mockResponse = generateMockResponse(input, currentMistake);
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'assistant', content: mockResponse }]);
                setIsLoading(false);
            }, 800);
        }
    };

    const generateMockResponse = (question, mistake) => {
        const lowerQ = question.toLowerCase();

        // Detailed response templates based on question type
        if (lowerQ.includes('why') || lowerQ.includes('cause') || lowerQ.includes('reason')) {
            return `**Why does this happen?**\n\nThe root cause of "${mistake?.title || 'this issue'}" is:\n\n${mistake?.rootCause || 'improper state management and component lifecycle handling'}.\n\nIn React, when you ${mistake?.id?.includes('key') ? 'use array indices as keys' : 'mutate state directly'}, the reconciliation algorithm can't properly track component identity. This leads to:\n\n• Unexpected re-renders\n• Lost component state\n• Performance degradation\n• UI inconsistencies\n\nThink of it like this: React needs stable references to know which components changed. Without proper ${mistake?.id?.includes('key') ? 'unique keys' : 'immutable state updates'}, it's like trying to track people in a crowd where everyone keeps swapping clothes!`;
        }

        if (lowerQ.includes('how') || lowerQ.includes('fix') || lowerQ.includes('solve')) {
            return `**How to fix this:**\n\n\`\`\`javascript\n// ❌ Wrong (Current Pattern)\n${mistake?.brokenCode || 'items.map((item, index) => <div key={index}>{item}</div>)'}\n\n// ✅ Correct (Fixed Pattern)\n${mistake?.fixedCode || 'items.map(item => <div key={item.id}>{item.name}</div>)'}\n\`\`\`\n\n**Step-by-step fix:**\n\n1. ${mistake?.id?.includes('key') ? 'Use unique, stable IDs from your data' : 'Create a new object/array instead of mutating'}\n2. ${mistake?.id?.includes('state') ? 'Use setState with a new reference' : 'Ensure keys remain consistent across re-renders'}\n3. Test with React DevTools to verify proper reconciliation\n\nThis ensures React can efficiently track and update only the components that actually changed!`;
        }

        if (lowerQ.includes('performance') || lowerQ.includes('impact') || lowerQ.includes('slow')) {
            return `**Performance Impact:**\n\n⚠️ **Severity:** ${mistake?.impact?.performance || 'Medium to High'}\n\n**What happens:**\n• Unnecessary full list re-renders (O(n) instead of O(1))\n• Lost input focus in form fields\n• Janky animations and transitions\n• Memory leaks in complex components\n\n**Real-world example:**\nImagine a list of 1000 items. With proper keys, React updates only changed items (~1ms). Without keys, React re-renders the entire list (~50-100ms). That's a **50-100x performance hit**!\n\n**Benchmark:**\n- Proper implementation: 14ms render time ✅\n- This anti-pattern: 142ms render time ❌\n\nOn mobile devices, this difference is even more noticeable!`;
        }

        if (lowerQ.includes('example') || lowerQ.includes('show me') || lowerQ.includes('demo')) {
            return `**Real-world example:**\n\nLet's say you have a todo list:\n\n\`\`\`javascript\nconst TodoList = ({ todos }) => {\n  return (\n    <ul>\n      {todos.map(todo => (\n        <li key={todo.id}> {/* ✅ Stable unique ID */}\n          <input type="checkbox" checked={todo.done} />\n          {todo.text}\n        </li>\n      ))}\n    </ul>\n  );\n};\n\`\`\`\n\n**Why this works:**\n- Each todo has a unique \`id\` from the database\n- When you reorder todos, React knows which is which\n- Checkbox state is preserved correctly\n- Smooth animations when adding/removing items\n\n**Try it yourself:**\n1. Go to the "Lab" tab\n2. Add items to the list\n3. Notice how the fixed version maintains input focus!`;
        }

        if (lowerQ.includes('best practice') || lowerQ.includes('recommend') || lowerQ.includes('should')) {
            return `**Best Practices:**\n\n✅ **DO:**\n• Use unique IDs from your data source (database IDs, UUIDs)\n• Keep keys stable across re-renders\n• Use libraries like \`uuid\` for client-side generated items\n• Avoid array indices unless list is truly static\n\n❌ **DON'T:**\n• Use array index as key for dynamic lists\n• Use random values (Math.random()) as keys\n• Use object references that change on every render\n• Concatenate multiple values that might not be unique\n\n**Pro tip:** If your data doesn't have IDs, add them when fetching:\n\`\`\`javascript\nconst itemsWithIds = rawData.map((item, i) => ({\n  ...item,\n  id: item.id || \`temp-\${Date.now()}-\${i}\`\n}));\n\`\`\``;
        }

        // Default comprehensive response
        return `**About "${mistake?.title || 'this pattern'}":**\n\n${mistake?.explanation || 'This is a common React anti-pattern that can cause serious issues in production.'}\n\n**Quick Summary:**\n• **Problem:** ${mistake?.rootCause || 'Improper component tracking'}\n• **Impact:** ${mistake?.impact?.performance || 'Medium'} performance hit\n• **Fix:** ${mistake?.id?.includes('key') ? 'Use stable unique IDs' : 'Follow React best practices'}\n\n**Want to know more?**\nAsk me:\n• "Why does this happen?"\n• "How do I fix this?"\n• "Show me an example"\n• "What's the performance impact?"\n\nI'm here to help you master React! 🚀`;
    };

    const formatMessage = (text, role) => {
        if (role === 'user') return text;

        // Convert markdown to HTML
        let formatted = text
            // Bold text
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Code blocks
            .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; overflow-x: auto; margin: 8px 0;"><code>$2</code></pre>')
            // Inline code
            .replace(/`(.+?)`/g, '<code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em;">$1</code>')
            // Line breaks
            .replace(/\n/g, '<br/>')
            // Bullet points
            .replace(/• /g, '<span style="color: var(--accent-primary); margin-right: 6px;">•</span> ');

        return formatted;
    };

    return (
        <>
            {/* Floating Action Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="ai-fab"
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'var(--accent-gradient)',
                            border: 'none',
                            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 999
                        }}
                    >
                        <Sparkles size={24} color="white" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="ai-chat-window glass"
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            width: '380px',
                            maxWidth: 'calc(100vw - 2rem)',
                            height: '500px',
                            maxHeight: 'calc(100vh - 4rem)',
                            borderRadius: '24px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            zIndex: 1000,
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.25rem',
                            borderBottom: '1px solid var(--border-color)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'rgba(99, 102, 241, 0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-gradient)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Sparkles size={16} color="white" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>AI Code Assistant</h4>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                                        {apiKey ? 'Ready to help' : 'Using mock AI'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-dim)',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }} className="custom-scrollbar">
                            {messages.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-dim)' }}>
                                    <Sparkles size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                    <p style={{ fontSize: '0.85rem' }}>
                                        Ask me anything about <strong>{currentMistake?.title || 'coding patterns'}</strong>!
                                    </p>
                                </div>
                            )}

                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '80%'
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: '0.75rem 1rem',
                                            borderRadius: '16px',
                                            background: msg.role === 'user'
                                                ? 'var(--accent-primary)'
                                                : 'rgba(255,255,255,0.05)',
                                            color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.6
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: formatMessage(msg.content, msg.role)
                                        }}
                                    />
                                </div>
                            ))}

                            {isLoading && (
                                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '6px', padding: '0.75rem' }}>
                                    <Loader size={16} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Thinking...</span>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div style={{
                            padding: '1rem',
                            borderTop: '1px solid var(--border-color)',
                            background: 'rgba(0,0,0,0.2)'
                        }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    placeholder={apiKey ? "Ask about this pattern..." : "Ask me anything (using mock AI)..."}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        background: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--border-color)',
                                        color: '#fff',
                                        fontSize: '0.85rem'
                                    }}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim()}
                                    style={{
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        background: input.trim() ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        cursor: input.trim() ? 'pointer' : 'not-allowed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Send size={18} color="white" />
                                </button>
                            </div>
                            {!apiKey && (
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '8px', textAlign: 'center' }}>
                                    💡 Add API key in Settings for real AI responses
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 600px) {
                    .ai-chat-window {
                        width: calc(100vw - 2rem) !important;
                        height: calc(100vh - 4rem) !important;
                        bottom: 1rem !important;
                        right: 1rem !important;
                    }
                    .ai-fab {
                        bottom: 1.5rem !important;
                        right: 1.5rem !important;
                        width: 56px !important;
                        height: 56px !important;
                    }
                }
            `}} />
        </>
    );
};

export default AIAssistant;
