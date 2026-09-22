import { ArrowUp, Globe2, Mic, Paperclip } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";

type ComposerProps = { webSearch: boolean; onWebSearch: (value: boolean) => void; onSend: (text: string) => void };

export function MessageComposer({ webSearch, onWebSearch, onSend }: ComposerProps) {
  const [value, setValue] = useState("");
  const send = () => { const text = value.trim(); if (!text) return; onSend(text); setValue(""); };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } };
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-background via-background/95 to-transparent px-3 pb-3 pt-12 sm:px-6 sm:pb-5">
      <div className="pointer-events-auto mx-auto max-w-3xl">
        {webSearch && <div className="mb-2 ml-1 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><span className="size-1.5 rounded-full bg-primary shadow-glow" />Web search enabled</div>}
        <div className="composer-shell rounded-2xl border border-border/80 bg-composer/90 p-2 shadow-composer backdrop-blur-xl">
          <textarea value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKeyDown} rows={2} placeholder="Ask Qwen anything..." className="max-h-36 min-h-12 w-full resize-none bg-transparent px-2 py-2 text-sm text-foreground outline-hidden placeholder:text-muted-foreground" />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Attach file"><Paperclip /></Button>
              <Button variant={webSearch ? "soft" : "ghost"} size="sm" className="rounded-xl px-2.5" onClick={() => onWebSearch(!webSearch)}><Globe2 /> <span className="hidden min-[380px]:inline">Web Search</span></Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Use voice input"><Mic /></Button>
              <Button variant="premium" size="icon" className="rounded-xl" onClick={send} disabled={!value.trim()} aria-label="Send message"><ArrowUp /></Button>
            </div>
          </div>
        </div>
        <p className="mt-2 hidden text-center text-[11px] text-muted-foreground sm:block">Press Enter to send · Shift + Enter for new line</p>
      </div>
    </div>
  );
}