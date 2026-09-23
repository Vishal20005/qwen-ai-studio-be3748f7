import { ArrowUp, Globe2, Mic, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  PromptInput,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

type ComposerProps = { webSearch: boolean; onWebSearch: (value: boolean) => void; onSend: (text: string) => void; embedded?: boolean };

export function MessageComposer({ webSearch, onWebSearch, onSend, embedded = false }: ComposerProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const send = (text: string) => { const trimmed = text.trim(); if (!trimmed) return; onSend(trimmed); setValue(""); requestAnimationFrame(() => inputRef.current?.focus()); };
  return (
    <div className={embedded ? "w-full" : "pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-background/96 px-3 pb-3 pt-6 sm:px-6 sm:pb-5"}>
      <div className="pointer-events-auto mx-auto max-w-3xl">
        <PromptInput className="composer-shell" onSubmit={({ text }) => send(text)}>
          <PromptInputTextarea ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} rows={embedded ? 3 : 2} placeholder="Message Qwen…" className="max-h-40 min-h-14 px-4 text-[15px]" />
          <PromptInputFooter className="px-2 pb-2">
            <PromptInputTools>
              <PromptInputButton tooltip="Attach file" aria-label="Attach file"><Paperclip /></PromptInputButton>
              <PromptInputButton tooltip="Web search" variant={webSearch ? "secondary" : "ghost"} onClick={() => onWebSearch(!webSearch)} className={webSearch ? "text-primary" : ""}><Globe2 /><span className="hidden min-[380px]:inline">Search</span></PromptInputButton>
            </PromptInputTools>
            <PromptInputTools>
              <PromptInputButton tooltip="Voice input" aria-label="Use voice input"><Mic /></PromptInputButton>
              <PromptInputSubmit disabled={!value.trim()} className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"><ArrowUp /></PromptInputSubmit>
            </PromptInputTools>
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 hidden text-center text-[10px] text-muted-foreground sm:block">Qwen can make mistakes. Check important information.</p>
      </div>
    </div>
  );
}