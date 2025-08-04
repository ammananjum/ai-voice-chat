// hooks/useWhisper.ts
import { useRef, useState, useEffect } from 'react';

export function useWhisper() {
  const [transcript, setTranscript] = useState<string>('');
  const [isReady, setIsReady] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker('/whisper/whisper.worker.js');
    workerRef.current = worker;

    worker.onmessage = (event) => {
      const { type, text } = event.data;

      if (type === 'ready') {
        console.log('✅ Whisper worker ready');
        setIsReady(true);
      }

      if (type === 'result') {
        setTranscript(text);
      }

      if (type === 'error') {
        setTranscript('❌ Error occurred');
        console.error('Whisper error:', event.data.message);
      }
    };

    worker.postMessage({ type: 'init' });

    return () => {
      worker.terminate();
    };
  }, []);

  const transcribeAudio = (audioBlob: Blob) => {
    if (!workerRef.current || !isReady) return;
    workerRef.current.postMessage({ type: 'transcribe', audioBlob });
  };

  return { transcript, transcribeAudio };
}
