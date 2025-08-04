// hooks/useLLM.ts

import { useState } from 'react';

export function useLLM() {
  const [response, setResponse] = useState<string>('');

  const generateReply = async (transcript: string) => {
    // Simulate delay like API call
    setResponse('🤖 Generating response...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate response
    const fakeReply = `🤖 You said: "${transcript}". How can I help?`;
    setResponse(fakeReply);
  };

  return { response, generateReply };
}
