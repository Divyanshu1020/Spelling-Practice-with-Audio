// components/game-complete.tsx
import { Button } from "@/components/ui/button";
import { GameStats } from "@/components/game-stats";
import { GameStats as GameStatsType } from "@/lib/types";

interface GameCompleteProps {
  stats: GameStatsType;
  score: number;
  onPlayAgain: () => void;
}

export function GameComplete({ stats, score, onPlayAgain }: GameCompleteProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center">Game Complete!</h2>
      <GameStats stats={stats} />
      <div className="text-center text-xl font-bold mb-4">
        Final Score: {score}
      </div>
      <Button 
        className="w-full"
        onClick={onPlayAgain}
      >
        Play Again
      </Button>
    </div>
  );
}