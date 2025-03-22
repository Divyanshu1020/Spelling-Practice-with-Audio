"use client";

import { GameComplete } from "@/components/game-complete";
import { GameHeader } from "@/components/game-header";
import { GamePlay } from "@/components/game-play";
import { Card, CardContent } from "@/components/ui/card";
import { useGameState } from "@/hooks/use-game-state";
import { useVoiceSettings } from "@/hooks/use-voice-settings";
import { Keyboard, Volume2 } from "lucide-react";
import { useEffect } from "react";

const WORDS_PER_GAME = 10;

export default function Home() {
  const {
    gameState,
    initializeGame,
    handleInputChange,
    handleKeyPress,
    handleRevealWord,
    calculateStats,
  } = useGameState(WORDS_PER_GAME);
  const { speechSettings, voices, setSpeechSettings, speakWord } =
    useVoiceSettings(gameState.currentWord);

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

        <Card className="mt-8">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-xl font-bold">How to Play</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Click the <Volume2 className="inline h-4 w-4" /> button to listen to the word.</li>
              <li>Type the word correctly to earn points. Incorrect spelling reduces your score.</li>
              <li>Click the "Reveal Word" button to see the answer (costs points).</li>
              <li>After revealing, typing the word correctly won't affect the score.</li>
              <li>Change the accent in the settings (top right corner).</li>
              <li>You must type the correct word to proceed to the next one.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
