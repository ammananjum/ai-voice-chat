# AI Voice Chat App

A browser-based AI voice assistant built with Next.js and TypeScript. It simulates real-time voice interaction using Web Workers and the OpenAI API.

> *Note:* Due to time and complexity constraints, Whisper and TTS integrations are simulated using frontend logic. The app demonstrates the full pipeline behavior expected in a real local AI voice assistant.

---

## Features

- Built with *Next.js* and *TypeScript*
- Microphone recording via *Web Audio API*
- Simulated *Whisper (speech-to-text)* using Web Worker
- AI responses using *OpenAI Chat Completion API*
- Simulated *TTS playback* using browser voice logic
- Clean, *dark-themed UI* with Tailwind CSS
- *PWA configuration* included

---

## How It Works

1. The user clicks *"Start Recording"* to begin voice input.
2. Audio is recorded and passed to a simulated *Whisper* model.
3. Once transcribed, the text is sent to the *OpenAI API*.
4. The AI generates a response.
5. The response is simulated through *TTS* and played aloud in the browser.

---

### 2. Install dependencies

bash
npm install


### 3. Run the development server

npm run dev


Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Note

This project *simulates* the use of Whisper.cpp and TTS models.  
The goal is to demonstrate how the full *voice → AI → speech* pipeline would function in a real offline application.  
The structure allows easy replacement with *real models* in the future.

---

##  License

This project is for *demonstration and educational purposes* only.
