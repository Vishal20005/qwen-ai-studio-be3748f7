import { ExternalLink } from "lucide-react";

export function SourceCard({ source }: { source: { name: string; domain: string; description: string } }) {
  return (
    <a href={`https://${source.domain}`} target="_blank" rel="noreferrer" className="group flex min-w-[210px] flex-1 items-start gap-3 rounded-xl border border-border/70 bg-surface/60 p-3 transition-colors hover:border-primary/40 hover:bg-accent/60">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-xs font-semibold text-secondary-foreground">{source.name.charAt(0)}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">{source.name}<ExternalLink className="size-3 text-muted-foreground" /></span>
        <span className="mt-1 line-clamp-2 block text-[11px] leading-4 text-muted-foreground">{source.description}</span>
      </span>
    </a>
  );
}