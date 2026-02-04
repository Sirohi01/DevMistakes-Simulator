export const generateAIContent = async (apiKey, prompt) => {
    if (!apiKey || apiKey.length < 20) {
        throw new Error('Invalid or missing API Key');
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error?.message || 'Failed to fetch from Gemini');
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    } catch (error) {
        console.error('AI Service Error:', error);
        throw error;
    }
};
