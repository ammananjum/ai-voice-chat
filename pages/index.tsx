import { useState } from 'react';
import { useMicrophone } from '../hooks/useMicrophone';
import { useWhisper } from '../hooks/useWhisper';
import { useLLM } from '../hooks/useLLM';
import { useTTS } from '../hooks/useTTS';
import Image from 'next/image';

export default function Home() {
  const { isRecording, audioChunks, startRecording, stopRecording } = useMicrophone();
  const { transcript, transcribeAudio } = useWhisper();
  const { response, generateReply } = useLLM();
  const { speak } = useTTS();

  const [sessions, setSessions] = useState<
    { transcript: string; response: string }[]
  >([]);

  const handleStart = () => {
    startRecording();
  };

  const handleStop = async () => {
    stopRecording();
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      transcribeAudio(audioBlob);

      setTimeout(() => {
        generateReply(transcript);
      }, 2000);

      setTimeout(() => {
        const sentence ="You said: ${transcript}. How can I help?";
        speak(sentence);

        // Save session to history
        setSessions(prev => [...prev, { transcript, response: sentence }]);
      }, 4000);
    }
  };

  const handleNewTranscript = () => {
    window.location.reload(); // Simple reset
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-gray-800 p-4">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        {/* Avatar image */}
        <div className="flex justify-center mb-4">
          <Image src="/avatarAI.jpg" alt="AI Avatar" width={96} height={96} className="rounded-full border-4 border-purple-600" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">AI Voice Chat</h1>
        <p className="text-sm text-center text-gray-300 mb-6">Say "Hello Whisper" to begin — if nothing happens, try again.</p>

        <div className="mb-4 text-center">
          <p className="text-lg">
            Status:{" "}
            <span className={isRecording ? "text-red-400" : "text-green-400"}>
              {isRecording ? 'Recording...' : 'Idle'}
            </span>
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleStart}
            disabled={isRecording}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            Start Recording
          </button>
          <button
            onClick={handleStop}
            disabled={!isRecording}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            Stop Recording
          </button>
          <button
            onClick={handleNewTranscript}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
          >
            New Transcript
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-4 text-center">
        Chunks captured: {audioChunks.length}
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-1">Current Transcript</h3>
          <div className="bg-zinc-800 rounded p-3 min-h-[60px]">
            {transcript || 'No transcript yet.'}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-1">Current AI Response</h3>
          <div className="bg-zinc-800 rounded p-3 min-h-[60px]">
            {response || 'No response yet.'}
          </div>
        </div>

        {sessions.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2"> Previous Sessions</h3>
            <div className="space-y-3">
              {sessions.map((s, i) => (
                <div key={i} className="bg-zinc-800 rounded p-3">
                  <p><strong>You:</strong> {s.transcript}</p>
                  <p><strong>AI:</strong> {s.response}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
