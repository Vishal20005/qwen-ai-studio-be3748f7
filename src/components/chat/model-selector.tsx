import { useState } from "react";
import { Check, ChevronDown, Cloud, Cpu, Image, Mic, Music4, Sparkles, Video, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const modelGroups = [
  {
    label: "Chat models",
    models: [
      { name: "Qwen3 4B", location: "Local", active: true, icon: Cpu },
      { name: "Qwen3 8B", location: "Cloud", active: false, icon: Cloud },
      { name: "Qwen3 30B", location: "Cloud", active: false, icon: Cloud },
    ],
  },
  {
    label: "Image generation",
    models: [
      { name: "Qwen Image", location: "Cloud", active: false, icon: Image },
      { name: "Qwen Image Edit", location: "Cloud", active: false, icon: Sparkles },
    ],
  },
  {
    label: "Voice & audio",
    models: [
      { name: "Qwen TTS", location: "Cloud", active: false, icon: Volume2 },
      { name: "Qwen ASR (speech-to-text)", location: "Cloud", active: false, icon: Mic },
      { name: "Qwen Music", location: "Cloud", active: false, icon: Music4 },
    ],
  },
  {
    label: "Video generation",
    models: [{ name: "Qwen Video", location: "Cloud", active: false, icon: Video }],
  },
];

export function ModelSelector() {
  const [selected, setSelected] = useState("Qwen3 4B");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="soft" className="h-9 rounded-xl px-3">
          <Cpu className="text-primary" /> <span className="hidden sm:inline">{selected}</span><ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-[70vh] w-72 overflow-y-auto rounded-xl border-border/70 bg-popover/95 p-2 backdrop-blur-xl">
        {modelGroups.map((group, groupIndex) => (
          <div key={group.label}>
            {groupIndex > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-xs text-muted-foreground">{group.label}</DropdownMenuLabel>
            {group.models.map((model) => {
              const Icon = model.icon;
              const isSelected = selected === model.name;
              return (
                <DropdownMenuItem
                  key={model.name}
                  disabled={!model.active}
                  onClick={() => model.active && setSelected(model.name)}
                  className="rounded-lg px-3 py-2.5"
                >
                  <Icon />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{model.name}</p>
                    <p className="text-xs text-muted-foreground">{model.active ? "Running locally" : `${model.location} · Not configured`}</p>
                  </div>
                  {isSelected && <Check className="text-status" />}
                </DropdownMenuItem>
              );
            })}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
