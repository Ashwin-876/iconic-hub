const MOCK_ANSWERS = [
  {
    q: 'Review React performance optimization rules',
    ans: 'React optimizes rendering using 3 core concepts:\n1. useMemo & useCallback to cache values/functions.\n2. React.memo for component shallow comparison.\n3. Virtualization (e.g. react-window) for handling long lists efficiently.'
  },
  {
    q: 'Interview Prep: Explain database indexing B-Trees',
    ans: 'B-Trees keep data sorted and allow search, sequential access, insertion, and deletion in logarithmic O(log N) time. The database scans nodes hierarchically without scanning the entire disk block.'
  }
];

export async function callOpenRouter(messages, systemPrompt = '') {
  try {
    const formattedMessages = [];
    if (systemPrompt) {
      formattedMessages.push({ role: 'system', content: systemPrompt });
    }
    
    // Format messages for OpenRouter (make sure each message has role and content)
    messages.forEach(msg => {
      // Handle different input formats
      if (typeof msg === 'string') {
        formattedMessages.push({ role: 'user', content: msg });
      } else if (msg.role && (msg.text || msg.content)) {
        let apiRole = msg.role;
        if (apiRole === 'ai' || apiRole === 'bot') {
          apiRole = 'assistant';
        }
        formattedMessages.push({
          role: apiRole,
          content: msg.text || msg.content
        });
      }
    });

    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || '';

    // If API key is missing, return fallback or mock answers immediately
    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey.trim() === '') {
      const lastUserMessage = messages[messages.length - 1];
      const queryText = typeof lastUserMessage === 'string' ? lastUserMessage : (lastUserMessage?.content || lastUserMessage?.text || '');
      const match = MOCK_ANSWERS.find(m => queryText.toLowerCase().includes(m.q.toLowerCase()) || m.q.toLowerCase().includes(queryText.toLowerCase()));
      if (match) return match.ans;

      return "I am currently running in offline sandbox mode (OpenRouter API key is missing or invalid). Please configure your `OPENROUTER_API_KEY` in environment variables to enable real-time AI responses!";
    }

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
      'X-Title': 'Iconic Hub'
    };

    // 1. Try google/gemini-2.5-flash (Extremely low latency, fast, and high quality) with a tight token budget
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: formattedMessages,
          max_tokens: 250
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) return content;
      }
      console.warn(`Primary model failed with status ${response.status}. Attempting fallback...`);
    } catch (primaryErr) {
      console.warn('Primary model request failed, switching to fallback...', primaryErr);
    }

    // 2. Fallback: Use openrouter/free (which auto-routes to currently online free models)
    const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: formattedMessages,
        max_tokens: 300
      })
    });

    if (!fallbackResponse.ok) {
      const errorText = await fallbackResponse.text();
      console.error(`OpenRouter API error: ${fallbackResponse.status} - ${errorText}`);

      const lastUserMessage = messages[messages.length - 1];
      const queryText = typeof lastUserMessage === 'string' ? lastUserMessage : (lastUserMessage?.content || lastUserMessage?.text || '');
      const match = MOCK_ANSWERS.find(m => queryText.toLowerCase().includes(m.q.toLowerCase()) || m.q.toLowerCase().includes(queryText.toLowerCase()));
      if (match) return match.ans;

      return "I am currently running in offline sandbox mode (OpenRouter API key is missing or invalid). Please configure your `OPENROUTER_API_KEY` in environment variables to enable real-time AI responses!";
    }

    const data = await fallbackResponse.json();
    return data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error in callOpenRouter:', error);
    return "I am currently running in offline sandbox mode (OpenRouter API key is missing or invalid). Please configure your `OPENROUTER_API_KEY` in environment variables to enable real-time AI responses!";
  }
}
