import { Sparkles } from "lucide-react";
import { suggestions } from "@/data/mock-chat";
import { SuggestionCard } from "./suggestion-card";

export function EmptyState({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-44 pt-14 text-center sm:px-8">
      <div className="relative mb-7 grid size-20 place-items-center rounded-3xl bg-linear-to-br from-brand-blue via-brand-violet to-brand-cyan text-primary-foreground shadow-glow before:absolute before:inset-[-16px] before:-z-10 before:rounded-[2rem] before:bg-primary/10 before:blur-xl">
        <Sparkles className="size-8" />
      </div>
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">How can I help you?</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Ask questions, explore ideas, write code, or search the web.</p>
      <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion) => <SuggestionCard key={suggestion.title} suggestion={suggestion} onSelect={onSelect} />)}
      </div>
    </section>
  );
}