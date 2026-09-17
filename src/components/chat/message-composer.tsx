import { ArrowUp, Globe2, Mic, Paperclip } from "lucide-react";
import { useState } from "react";
import { PromptInput, PromptInputButton, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";

type ComposerProps = { webSearch: boolean; onWebSearch: (value: boolean) => void; onSend: (text: string) => void };

export function MessageComposer({ webSearch, onWebSearch, onSend }: ComposerProps) {
  const [value, setValue] = useState("");
  const send = (text: string) => { const clean = text.trim(); if (!clean) return; onSend(clean); setValue(""); };
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-background via-background/95 to-transparent px-3 pb-3 pt-12 sm:px-6 sm:pb-5">
      <div className="pointer-events-auto mx-auto max-w-3xl">
        {webSearch && <div className="mb-2 ml-1 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><span className="size-1.5 rounded-full bg-primary shadow-glow" />Web search enabled</div>}
        <div className="composer-aura rounded-2xl">
          <PromptInput onSubmit={(message) => send(message.text)} className="[&_[data-slot=input-group]]:rounded-2xl [&_[data-slot=input-group]]:border-border/80 [&_[data-slot=input-group]]:bg-composer/95 [&_[data-slot=input-group]]:p-2 [&_[data-slot=input-group]]:shadow-composer [&_[data-slot=input-group]]:backdrop-blur-xl [&_[data-slot=input-group]]:focus-within:border-primary/45">
            <PromptInputTextarea value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ask Qwen anything..." className="min-h-12 px-2 py-2 text-sm" />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton tooltip="Attach file" className="rounded-xl"><Paperclip /></PromptInputButton>
                <PromptInputButton tooltip="Web search" onClick={() => onWebSearch(!webSearch)} className={`rounded-xl px-2.5 ${webSearch ? "bg-primary/12 text-primary" : ""}`}><Globe2 /><span className="hidden min-[380px]:inline">Web Search</span></PromptInputButton>
              </PromptInputTools>
              <PromptInputTools>
                <PromptInputButton tooltip="Voice input" className="rounded-xl"><Mic /></PromptInputButton>
                <PromptInputSubmit disabled={!value.trim()} className="size-9 rounded-xl bg-linear-to-br from-brand-blue via-brand-violet to-brand-cyan text-primary-foreground shadow-glow hover:brightness-110"><ArrowUp /></PromptInputSubmit>
              </PromptInputTools>
            </PromptInputFooter>
          </PromptInput>
        </div>
        <p className="mt-2 hidden text-center text-[11px] text-muted-foreground sm:block">Press Enter to send · Shift + Enter for new line</p>
      </div>
    </div>
  );
}