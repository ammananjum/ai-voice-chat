self.onmessage = async (event) => {
  const { type, audioBlob } = event.data;

  if (type === 'init') {
    console.log('🔧 Whisper Worker Initialized (Fake)');
    self.postMessage({ type: 'ready' });
  }

  if (type === 'transcribe') {
    console.log('📥 Received audioBlob (Fake):', audioBlob);

    // Simulate a short delay like real transcription
    setTimeout(() => {
      const fakeTranscript = '🧪 Simulated transcript: Hello from Whisper 👋';
      self.postMessage({ type: 'result', text: fakeTranscript });
    }, 1200);
  }
};
