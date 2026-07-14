/* ================================================================
   PORTFOLIO — GEMINI SERVICE
   File:    src/services/gemini.js
   Purpose: Handles Gemini API communication and maintains chat
            history. Optimized for React modular imports.
================================================================ */

export class GeminiService {
  constructor(apiKey, systemPrompt, ackMessage = 'Understood.') {
    this.apiKey = apiKey;
    this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    this.history = [
      { role: 'user',  parts: [{ text: systemPrompt }] },
      { role: 'model', parts: [{ text: ackMessage }] }
    ];
  }

  async sendMessage(message) {
    if (!this.apiKey || this.apiKey === 'YOUR_API_KEY_HERE') {
      const err = new Error('API key not configured.');
      err.code = 'MISSING_API_KEY';
      throw err;
    }

    /* Add user message to history */
    this.history.push({ role: 'user', parts: [{ text: message }] });

    try {
      const response = await fetch(this.apiUrl, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          contents: this.history,
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      let reply = "I'm not sure about that. Try asking something else!";
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply = data.candidates[0].content.parts[0].text;
      }

      /* Add bot reply to history */
      this.history.push({ role: 'model', parts: [{ text: reply }] });
      return reply;

    } catch (error) {
      /* Revert the optimistic history push on failure */
      this.history.pop();
      throw error;
    }
  }
}
