import { Check, Clipboard, RefreshCw, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sources } from "@/data/mock-chat";
import { SourceCard } from "./source-card";

export type Message = { id: number; role: "user" | "assistant"; content: string; sources?: boolean };

export function ChatMessage({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  if (message.role === "user") {
    return <div className="message-enter flex justify-end"><div className="max-w-[85%] rounded-2xl rounded-br-md bg-linear-to-br from-user-from to-user-to px-4 py-3 text-sm leading-6 text-primary-foreground sm:max-w-[70%]">{message.content}</div></div>;
  }

  return (
    <article className="message-enter flex gap-3 sm:gap-4">
      <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand-blue via-brand-violet to-brand-cyan text-primary-foreground shadow-glow"><Sparkles className="size-3.5" /></div>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-7 text-foreground sm:text-[15px]">Article 21 protects the <strong>right to life and personal liberty</strong>. It states that no person shall be deprived of life or personal liberty except according to procedure established by law.</p>
        <p className="mt-3 text-sm leading-7 text-foreground sm:text-[15px]">The Supreme Court has interpreted this broadly, extending it to dignity, privacy, clean environment, legal aid, and a fair trial.</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-border/70 bg-code">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs text-muted-foreground"><span>Article 21</span><Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => { navigator.clipboard?.writeText(message.content); setCopied(true); }}>{copied ? <Check /> : <Clipboard />}{copied ? "Copied" : "Copy"}</Button></div>
          <pre className="overflow-x-auto p-4 text-xs leading-6 text-code-foreground"><code>No person shall be deprived of his life or personal liberty<br />except according to procedure established by law.</code></pre>
        </div>
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