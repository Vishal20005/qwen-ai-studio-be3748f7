import { Brain, Check, ChevronDown, Clipboard, RefreshCw, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { sources } from "@/data/mock-chat";
import { ChatStageIndicator } from "./chat-stage-indicator";
import { SourceCard } from "./source-card";

export type MessageStage = "connecting" | "thinking" | "answering" | "done";
export type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: boolean;
  stage?: MessageStage;
  thinking?: string;
  streaming?: boolean;
};

function StreamingContent({ content, streaming }: { content: string; streaming?: boolean }) {
  const blocks = content.split("```");
  return (
    <div className="space-y-3 text-sm leading-7 text-foreground sm:text-[15px]">
      {blocks.map((block, blockIndex) => {
        if (blockIndex % 2 === 1) {
          const [language, ...codeLines] = block.replace(/^\n/, "").split("\n");
          return <pre key={`${language}-${blockIndex}`} className="stream-scrollbar overflow-x-auto rounded-lg border border-border/70 bg-code p-4 text-xs leading-6 text-code-foreground"><code>{codeLines.join("\n")}</code></pre>;
        }
        return block.split("\n").map((line, lineIndex) => {
          if (!line) return null;
          if (line.startsWith("## ")) return <h3 key={`${line}-${lineIndex}`} className="pt-1 text-base font-semibold">{line.slice(3)}</h3>;
          if (line.startsWith("# ")) return <h2 key={`${line}-${lineIndex}`} className="pt-1 text-lg font-semibold">{line.slice(2)}</h2>;
          if (line.startsWith("- ")) return <div key={`${line}-${lineIndex}`} className="flex gap-2 pl-1"><span className="text-primary">•</span><span>{line.slice(2)}</span></div>;
          return <p key={`${line}-${lineIndex}`}>{line}</p>;
        });
      })}
      {streaming && <span className="streaming-caret" aria-hidden="true" />}
    </div>
  );
}

function ThinkingPanel({ message }: { message: Message }) {
  const shouldExpand = message.stage === "connecting" || message.stage === "thinking";
  const [open, setOpen] = useState(shouldExpand);

  useEffect(() => setOpen(shouldExpand), [shouldExpand, message.stage]);
  if (!message.thinking) return null;

  const active = message.stage === "connecting" || message.stage === "thinking";
  return (
    <div className={`thinking-panel mb-4 overflow-hidden rounded-lg border border-border/70 bg-muted/30 ${active ? "thinking-panel-active" : ""}`}>
      <Button
        type="button"
        variant="ghost"
        className="flex h-10 w-full justify-between rounded-none px-3 text-xs text-muted-foreground hover:bg-accent/50"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex items-center gap-2"><Brain className={`size-3.5 ${active ? "chat-stage-pulse text-primary" : ""}`} />{active ? "Thinking…" : "Thought process"}</span>
        <ChevronDown className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Button>
      <div className={`thinking-content-grid ${open ? "is-open" : ""}`}>
        <div className="min-h-0">
          <div className="thinking-scrollbar max-h-48 overflow-y-auto border-t border-border/60 px-3 py-3 font-mono text-xs italic leading-5 text-muted-foreground whitespace-pre-wrap break-words">
            {message.thinking}{active && message.streaming && <span className="streaming-caret" aria-hidden="true" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  if (message.role === "user") {
    return <div className="message-enter-user flex justify-end"><div className="max-w-[85%] rounded-2xl rounded-br-md bg-linear-to-br from-user-from to-user-to px-4 py-3 text-sm leading-6 text-primary-foreground shadow-sm sm:max-w-[70%]">{message.content}</div></div>;
  }

  return (
    <article className="message-enter-assistant flex gap-3 sm:gap-4">
      <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-blue via-brand-violet to-brand-cyan text-primary-foreground shadow-glow"><Sparkles className="size-3.5" /></div>
      <div className="assistant-reveal min-w-0 flex-1">
        {message.stage && <ChatStageIndicator stage={message.stage} />}
        {message.stage && <ThinkingPanel message={message} />}
        {message.stage === "connecting" && !message.content ? <div className="connecting-skeleton space-y-2.5" aria-label="Waiting for model response"><span className="block h-3 w-full rounded bg-muted" /><span className="block h-3 w-4/5 rounded bg-muted" /><span className="block h-3 w-3/5 rounded bg-muted" /></div> : message.stage ? <StreamingContent content={message.content} streaming={message.streaming} /> : <Fragment><p className="text-sm leading-7 text-foreground sm:text-[15px]">Article 21 protects the <strong>right to life and personal liberty</strong>. It states that no person shall be deprived of life or personal liberty except according to procedure established by law.</p><p className="mt-3 text-sm leading-7 text-foreground sm:text-[15px]">The Supreme Court has interpreted this broadly, extending it to dignity, privacy, clean environment, legal aid, and a fair trial.</p><div className="mt-4 overflow-hidden rounded-xl border border-border/70 bg-code"><div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs text-muted-foreground"><span>Article 21</span><Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => { navigator.clipboard?.writeText(message.content); setCopied(true); }}>{copied ? <Check /> : <Clipboard />}{copied ? "Copied" : "Copy"}</Button></div><pre className="overflow-x-auto p-4 text-xs leading-6 text-code-foreground"><code>No person shall be deprived of his life or personal liberty<br />except according to procedure established by law.</code></pre></div></Fragment>}
        {message.sources && <div className="mt-5"><h3 className="mb-2.5 text-xs font-semibold text-foreground">Sources</h3><div className="flex gap-2 overflow-x-auto pb-1">{sources.map((source) => <SourceCard key={source.name} source={source} />)}</div></div>}
        <div className="mt-3 flex items-center gap-1 text-muted-foreground">
          <Button variant="ghost" size="icon" className="size-8 rounded-lg" aria-label="Copy response" onClick={() => navigator.clipboard?.writeText(message.content)}><Clipboard /></Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-lg" aria-label="Regenerate response"><RefreshCw /></Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-lg" aria-label="Like response"><ThumbsUp /></Button>
          <Button variant="ghost" size="icon" className="size-8 rounded-lg" aria-label="Dislike response"><ThumbsDown /></Button>
        </div>
      </div>
    </article>
  );
}