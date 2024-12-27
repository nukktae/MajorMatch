/// <reference types="vite/client" />

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function explainChallenge(challenge: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a friendly teacher explaining programming concepts to beginners. Explain things as if talking to a 5-year-old, using simple analogies and friendly language."
        },
        {
          role: "user",
          content: `Can you explain this programming challenge in very simple terms? Challenge: ${challenge}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "Sorry, I couldn't explain this right now. Please try again later!";
  }
}