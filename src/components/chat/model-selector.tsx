import { Check, ChevronDown, Cloud, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const models = [
  { name: "Qwen3 4B", location: "Local", active: true },
  { name: "Qwen3 8B", location: "Cloud", active: false },
  { name: "Qwen3 30B", location: "Cloud", active: false },
];

export function ModelSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="soft" className="h-9 rounded-xl px-3">
          <Cpu className="text-primary" /> <span className="hidden sm:inline">Qwen3 4B</span><ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl border-border/70 bg-popover/95 p-2 backdrop-blur-xl">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Choose a model</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {models.map((model) => (
          <DropdownMenuItem key={model.name} disabled={!model.active} className="rounded-lg px-3 py-2.5">
            {model.location === "Local" ? <Cpu /> : <Cloud />}
            <div className="min-w-0 flex-1">
              <p className="font-medium">{model.name}</p>
              <p className="text-xs text-muted-foreground">{model.active ? "Running locally" : `${model.location} · Not configured`}</p>
            </div>
            {model.active && <Check className="text-status" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}