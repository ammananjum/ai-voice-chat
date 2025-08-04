import { useRef, useState } from 'react';

export function useMicrophone() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log('🎙️ Data available:', event.data);
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('❌ Microphone error:', error);
    }
  };

  const stopRecording = (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      const stream = streamRef.current;

      if (!recorder || !stream) {
        resolve(null);
        return;
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioChunks([...chunksRef.current]);
        resolve(audioBlob);
      };

      recorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    });
  };

  return {
    isRecording,
    audioChunks,
    startRecording,
    stopRecording,
  };
}
