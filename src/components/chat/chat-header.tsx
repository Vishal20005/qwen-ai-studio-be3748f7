import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModelSelector } from "./model-selector";

export function ChatHeader({ title, onMenu, sidebarOpen, onSidebarToggle }: { title: string; onMenu: () => void; sidebarOpen: boolean; onSidebarToggle: () => void }) {
  return (
    <header className="grid h-14 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-3 sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        <Button variant="ghost" size="icon" className="shrink-0 rounded-lg md:hidden" onClick={onMenu} aria-label="Open menu"><Menu /></Button>
        <Button variant="ghost" size="icon" className="hidden shrink-0 rounded-lg md:inline-flex" onClick={onSidebarToggle} aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"} title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}>
          {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
        </Button>
        <h1 className="font-display truncate text-sm font-medium">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <ModelSelector />
         <div className="hidden items-center gap-2 px-1.5 text-xs sm:flex">
           <span className="size-1.5 rounded-full bg-status" />
          <span className="text-muted-foreground">Running locally</span>
        </div>
      </div>
    </header>
  );
}