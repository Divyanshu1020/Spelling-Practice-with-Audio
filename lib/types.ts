export interface GameState {
  currentWordIndex: number;
  totalWords: number;
  currentWord: string;
  input: string;
  isCorrect: boolean | null;
  startTime: number | null;
  endTime: number | null;
  correctWords: number;
  mistakes: number;
  gameComplete: boolean;
  words: string[];
  score: number;
  showFeedback: boolean;
  isWordVisible: boolean;
}

export interface GameStats {
  accuracy: number;
  wpm: number;
  totalTime: number;
}

export interface SpeechSettings {
  voice: SpeechSynthesisVoice | null;
  speed: number;
}