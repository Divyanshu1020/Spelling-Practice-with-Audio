"use client";

import { useEffect } from "react";
import { Keyboard } from "lucide-react";
import { GameHeader } from "@/components/game-header";
import { GamePlay } from "@/components/game-play";
import { useVoiceSettings } from "@/hooks/use-voice-settings";
import { useGameState } from "@/hooks/use-game-state";
import { GameComplete } from "@/components/game-complete";

const WORDS_PER_GAME = 10;

export default function Home() {
  const { gameState, initializeGame, handleInputChange, handleKeyPress, handleRevealWord, calculateStats } = useGameState(WORDS_PER_GAME);
  const { speechSettings, voices, setSpeechSettings, speakWord } = useVoiceSettings(gameState.currentWord);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);



  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Spelling Practice</h1>
          </div>
          
          <GameHeader 
            score={gameState.score} 
            showFeedback={gameState.showFeedback} 
            isCorrect={gameState.isCorrect} 
            speechSettings={speechSettings}
            voices={voices}
            setSpeechSettings={setSpeechSettings}
            speakWord={speakWord}
            currentWord={gameState.currentWord}
          />
        </div>

        <div className="space-y-8">
          {!gameState.gameComplete ? (
            <GamePlay 
              gameState={gameState}
              handleInputChange={handleInputChange}
              handleKeyPress={handleKeyPress}
              handleRevealWord={handleRevealWord}
              speakWord={speakWord}
            />
          ) : (
            <GameComplete 
              stats={calculateStats()} 
              score={gameState.score}
              onPlayAgain={initializeGame}
            />
          )}
        </div>
      </div>
    </main>
  );
}