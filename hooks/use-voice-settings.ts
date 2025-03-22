// hooks/use-voice-settings.ts
import { useState, useEffect, useCallback } from "react";
import { SpeechSettings } from "@/lib/types";

export function useVoiceSettings(currentWord: string) {
  const [speechSettings, setSpeechSettings] = useState<SpeechSettings>({
    voice: null,
    speed: 0.8,
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      console.log("Available Voices:", availableVoices);
  
      if (availableVoices.length === 0) {
        // Voices might not be loaded immediately, try again
        setTimeout(loadVoices, 100);
        return;
      }
  
      setVoices(availableVoices);
  
      // Prioritize Hindi voice first, then Indian English
      const hindiVoice = availableVoices.find(v => v.lang === "hi-IN");
      const indianEnglishVoice = availableVoices.find(v => v.lang === "en-IN");
      const defaultVoice = hindiVoice || indianEnglishVoice || availableVoices[0];
  
      setSpeechSettings(prev => ({
        ...prev,
        voice: defaultVoice,
      }));
    };
  
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  
    loadVoices();
  }, []);

  // Function to speak a word
  const speakWord = useCallback((word: string) => {
    if ('speechSynthesis' in window && speechSettings.voice) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = speechSettings.speed;
      utterance.voice = speechSettings.voice;
      window.speechSynthesis.speak(utterance);
    }
  }, [speechSettings]);

  return {
    speechSettings,
    setSpeechSettings,
    voices,
    speakWord
  };
}