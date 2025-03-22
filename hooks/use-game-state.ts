import { useState, useCallback } from "react";
import { GameState, GameStats } from "@/lib/types";
import wordData from "@/data/words.json";

const POINTS_PER_WORD = 10;
const REVEAL_COST = 30;

export function useGameState(wordsPerGame: number) {
  const [gameState, setGameState] = useState<GameState>({
    currentWordIndex: 0,
    totalWords: wordsPerGame,
    currentWord: "",
    input: "",
    isCorrect: null,
    startTime: null,
    endTime: null,
    correctWords: 0,
    mistakes: 0,
    gameComplete: false,
    words: [],
    score: 0,
    showFeedback: false,
    isWordVisible: false,
  });

  const initializeGame = useCallback(() => {
    const shuffled = [...wordData.words].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, wordsPerGame);
    
    setGameState({
      currentWordIndex: 0,
      totalWords: wordsPerGame,
      currentWord: selectedWords[0],
      input: "",
      isCorrect: null,
      startTime: null,
      endTime: null,
      correctWords: 0,
      mistakes: 0,
      gameComplete: false,
      words: selectedWords,
      score: 0,
      showFeedback: false,
      isWordVisible: false,
    });
  }, [wordsPerGame]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, speakWord?: (word: string) => void) => {
    if (e.key === 'Enter') {
      const input = gameState.input;
      const isCorrect = input === gameState.currentWord;
      const scoreChange = isCorrect ? POINTS_PER_WORD : -POINTS_PER_WORD;
      
      setGameState(prev => ({
        ...prev,
        isCorrect,
        showFeedback: true,
        score: prev.score + scoreChange,
      }));

      setTimeout(() => {
        if (isCorrect) {
          const isLastWord = gameState.currentWordIndex === gameState.totalWords - 1;
          
          if (isLastWord) {
            setGameState(prev => ({
              ...prev,
              input: "",
              endTime: Date.now(),
              correctWords: prev.correctWords + 1,
              gameComplete: true,
              showFeedback: false,
              isWordVisible: false,
            }));
          } else {
            const nextIndex = gameState.currentWordIndex + 1;
            const nextWord = gameState.words[nextIndex];
            
            setGameState(prev => ({
              ...prev,
              currentWordIndex: nextIndex,
              currentWord: nextWord,
              input: "",
              correctWords: prev.correctWords + 1,
              showFeedback: false,
              isWordVisible: false,
            }));
            
            if (speakWord) {
              speakWord(nextWord);
            }
          }
        } else {
          setGameState(prev => ({
            ...prev,
            input: "",
            mistakes: prev.mistakes + 1,
            showFeedback: false,
          }));
        }
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    if (!gameState.startTime) {
      setGameState(prev => ({ ...prev, startTime: Date.now() }));
    }

    setGameState(prev => ({
      ...prev,
      input,
      isCorrect: null,
      showFeedback: false,
    }));
  };

  const handleRevealWord = () => {
    setGameState(prev => ({
      ...prev,
      score: prev.score - REVEAL_COST,
      isWordVisible: true,
    }));
  };

  const calculateStats = (): GameStats => {
    if (!gameState.startTime || !gameState.endTime) return { accuracy: 0, wpm: 0, totalTime: 0 };
    
    const totalTime = (gameState.endTime - gameState.startTime) / 1000;
    const totalWords = gameState.totalWords;
    const accuracy = ((totalWords - gameState.mistakes) / totalWords) * 100;
    const wpm = (gameState.correctWords / totalTime) * 60;
    
    return {
      accuracy: Math.max(0, accuracy),
      wpm,
      totalTime,
    };
  };

  return {
    gameState,
    setGameState,
    initializeGame,
    handleKeyPress,
    handleInputChange,
    handleRevealWord,
    calculateStats
  };
}