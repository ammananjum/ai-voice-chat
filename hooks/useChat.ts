// hooks/useChat.ts
import { useState } from 'react';

export function useChat() {
  const [response, setResponse] = useState<string>('🤖 Waiting...');

  const chatWithAI = async (text: string) => {
    console.log('📨 Sending to fake OpenAI:', text);
    setResponse('⌛ Thinking...');

    // Simulate API delay
    setTimeout(() => {
      const fakeReply = `🤖 You said: "${text}". How can I help?`;
      setResponse(fakeReply);
      console.log('💬 Simulated AI response:', fakeReply);
    }, 1500);
  };

  return { response, chatWithAI };
}
