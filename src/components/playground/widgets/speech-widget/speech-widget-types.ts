export interface SpeechRecognitionContextInterface {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  isSupported: boolean;
  error: string | null;
  
  startListening(): void;
  stopListening(): void;
  resetTranscript(): void;
  setOnResult(callback: (text: string) => void): void;
}
