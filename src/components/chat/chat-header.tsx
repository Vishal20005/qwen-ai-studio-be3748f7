import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelSelector } from "./model-selector";

export function ChatHeader({ title, onMenu }: { title: string; onMenu: () => void }) {
  return (
    <header className="grid h-16 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <Button variant="ghost" size="icon" className="shrink-0 rounded-xl md:hidden" onClick={onMenu} aria-label="Open menu"><Menu /></Button>
        <h1 className="truncate text-sm font-semibold sm:text-base">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <ModelSelector />
        <div className="hidden items-center gap-2 rounded-xl border border-status/20 bg-status/5 px-3 py-2 text-xs sm:flex">
          <span className="size-2 rounded-full bg-status shadow-status" />
          <span className="text-muted-foreground">Running locally</span>
        </div>
      </div>
    </header>
  );
}