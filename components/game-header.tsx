// components/game-header.tsx
import { motion } from "framer-motion";
import { SpeechSettings } from "@/lib/types";
import { VoiceSettingsPanel } from "@/components/voice-settings-panel";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface GameHeaderProps {
  score: number;
  showFeedback: boolean;
  isCorrect: boolean | null;
  speechSettings: SpeechSettings;
  voices: SpeechSynthesisVoice[];
  setSpeechSettings: React.Dispatch<React.SetStateAction<SpeechSettings>>;
  speakWord: (word: string) => void;
  currentWord: string;
}

export function GameHeader({ 
  score, 
  showFeedback, 
  isCorrect, 
  speechSettings, 
  voices, 
  setSpeechSettings, 
  speakWord, 
  currentWord 
}: GameHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        className="text-xl font-bold"
        animate={{
          scale: showFeedback ? 1.2 : 1,
          color: isCorrect ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)",
        }}
      >
        Score: {score}
      </motion.div>
      <div className="flex items-center gap-2">
        <VoiceSettingsPanel
          speechSettings={speechSettings}
          voices={voices}
          setSpeechSettings={setSpeechSettings}
          speakWord={() => speakWord(currentWord)}
        />
        <ThemeToggle />
      </div>
    </div>
  );
}