'use client';

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { SpeechRecognitionContextInterface } from './speech-widget-types';

const SpeechRecognitionContext = createContext<SpeechRecognitionContextInterface | null>(null);

export function useSpeechRecognition() {
  const ctx = useContext(SpeechRecognitionContext);

  if (!ctx) {
    throw new Error(
      'useSpeechRecognition must be used within a SpeechRecognitionProvider'
    );
  }

  return ctx;
}

export function SpeechRecognitionProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const onResultCallbackRef = useRef<(text: string) => void>(() => {});
  const transcriptRef = useRef<string>('');

  useEffect(() => {
    // Initialize Web Speech API
    if (typeof window !== 'undefined') {
        // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
          setInterimTranscript('');
        };

        recognition.onresult = (event: any) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;

            if (event.results[i].isFinal) {
              final += transcript + ' ';
            } else {
              interim += transcript;
            }
          }

          setInterimTranscript(interim);
          if (final) {
            setTranscript((prev) => {
              const newTranscript = prev + final;
              transcriptRef.current = newTranscript;
              return newTranscript;
            });
          }
        };

        recognition.onerror = (event: any) => {
            console.log('error', event);
          setError(event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          // Call the callback with final transcript
          const finalTranscript = transcriptRef.current.trim();
          console.log('onend - finalTranscript:', finalTranscript);
          if (finalTranscript) {
            onResultCallbackRef.current(finalTranscript);
          }
        };

        recognitionRef.current = recognition;
      } else {
        setIsSupported(false);
      }
    }
  }, [transcript]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      transcriptRef.current = '';
      setInterimTranscript('');
      setError(null);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
    transcriptRef.current = '';
    setInterimTranscript('');
    setError(null);
  };

  const setOnResult = (callback: (text: string) => void) => {
    onResultCallbackRef.current = callback;
  };

  return (
    <SpeechRecognitionContext.Provider
      value={{
        isListening,
        transcript,
        interimTranscript,
        isSupported,
        error,
        startListening,
        stopListening,
        resetTranscript,
        setOnResult
      }}
    >
      {children}
    </SpeechRecognitionContext.Provider>
  );
}
