// whisperManager.ts
import { createWhisperWorker } from './workers/whisperWorker';

let worker: Worker | null = null;

export function initWhisper() {
  if (!worker) {
    worker = createWhisperWorker();
    console.log("Whisper Worker initialized.");
  }
}

export function transcribe(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!worker) {
      reject('Worker not initialized');
      return;
    }

    const listener = (event: MessageEvent) => {
      if (event.data?.type === 'transcription') {
        worker?.removeEventListener('message', listener);
        resolve(event.data.text);
      }
    };

    worker.addEventListener('message', listener);
    worker.postMessage({ type: 'transcribe', blob });
  });
}
