import { ArrowUpRight } from "lucide-react";
import type { Suggestion } from "@/data/mock-chat";
import { Button } from "@/components/ui/button";

export function SuggestionCard({ suggestion, onSelect }: { suggestion: Suggestion; onSelect: (prompt: string) => void }) {
  const Icon = suggestion.icon;
  return (
    <Button variant="soft" className="group h-auto min-h-24 w-full items-start justify-between whitespace-normal rounded-2xl p-4 text-left" onClick={() => onSelect(suggestion.prompt)}>
      <span className="flex min-w-0 flex-col items-start gap-4">
        <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span>
        <span className="text-sm font-medium leading-snug">{suggestion.title}</span>
      </span>
      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Button>
  );
}