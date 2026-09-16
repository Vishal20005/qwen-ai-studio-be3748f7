import { Sparkles } from "lucide-react";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-blue via-brand-violet to-brand-cyan text-primary-foreground shadow-glow">
        <Sparkles className="size-4" />
      </div>
      {!compact && <span className="truncate text-base font-semibold text-foreground">Qwen AI</span>}
    </div>
  );
}