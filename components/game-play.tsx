// components/game-play.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Volume2, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState } from "@/lib/types";

const REVEAL_COST = 30;

interface GamePlayProps {
  gameState: GameState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, speakWord?: (word: string) => void) => void;
  handleRevealWord: () => void;
  speakWord: (word: string) => void;
}

export function GamePlay({ 
  gameState, 
  handleInputChange, 
  handleKeyPress, 
  handleRevealWord, 
  speakWord 
}: GamePlayProps) {
  return (
    <>
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Word {gameState.currentWordIndex + 1} of {gameState.totalWords}
        </p>
        <div className="relative">
          {gameState.isWordVisible ? (
            <div className="text-4xl font-bold mb-4">{gameState.currentWord}</div>
          ) : (
            <Button
              variant="outline"
              onClick={handleRevealWord}
              className="mx-auto mb-4"
            >
              <Eye className="h-4 w-4 mr-2" />
              Reveal Word (-{REVEAL_COST} points)
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => speakWord(gameState.currentWord)}
          className="mx-auto"
        >
          <Volume2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Input
          type="text"
          value={gameState.input}
          onChange={handleInputChange}
          onKeyPress={(e) => handleKeyPress(e, speakWord)}
          autoComplete="off"
          autoCapitalize="off"
          className={`text-center text-lg ${
            gameState.showFeedback
              ? gameState.isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-950"
                : "border-red-500 bg-red-50 dark:bg-red-950"
              : ""
          }`}
          placeholder="Type the word and press Enter..."
          autoFocus
        />
        <AnimatePresence>
          {gameState.showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`text-center font-bold ${
                gameState.isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {gameState.isCorrect ? "Correct! +10 points" : "Wrong! -10 points"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}