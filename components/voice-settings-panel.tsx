import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { SpeechSettings } from "@/lib/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface VoiceSettingsPanelProps {
  speechSettings: SpeechSettings;
  voices: SpeechSynthesisVoice[];
  setSpeechSettings: React.Dispatch<React.SetStateAction<SpeechSettings>>;
  speakWord: () => void;
}

export function VoiceSettingsPanel({ 
  speechSettings, 
  voices, 
  setSpeechSettings, 
  speakWord 
}: VoiceSettingsPanelProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Voice Settings</SheetTitle>
          <SheetDescription>
            Customize the speech voice and speed
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Voice</label>
            <Select
              value={speechSettings.voice?.name}
              onValueChange={(value) => {
                const selectedVoice = voices.find(v => v.name === value);
                setSpeechSettings(prev => ({
                  ...prev,
                  voice: selectedVoice || null
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Speed: {speechSettings.speed}x</label>
            <Slider
              value={[speechSettings.speed]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={([value]) => {
                setSpeechSettings(prev => ({
                  ...prev,
                  speed: value
                }));
              }}
            />
          </div>
          <Button 
            className="w-full"
            onClick={speakWord}
          >
            Test Voice
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}