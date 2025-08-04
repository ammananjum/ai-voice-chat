// hooks/useTTS.ts

export function useTTS() {
  const speak = (text: string) => {
    if (!text || typeof window === 'undefined') return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  return { speak };
}
