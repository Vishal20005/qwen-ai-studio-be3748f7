import {
  Brain,
  Check,
  ChevronDown,
  Clipboard,
  RefreshCw,
  Square,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Message as AIMessage, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import qwenMark from "@/assets/qwen-mark.png.asset.json";
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

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[.9em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

function StreamingContent({ content, streaming }: { content: string; streaming?: boolean }) {
  return (
    <div className="text-sm leading-7 text-foreground sm:text-[15px]">
      <MessageResponse isAnimating={streaming === true}>{content}</MessageResponse>
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
    <div
      className={`thinking-panel mb-4 overflow-hidden rounded-lg border border-border/70 bg-muted/30 ${active ? "thinking-panel-active" : ""}`}
    >
      <Button
        type="button"
        variant="ghost"
        className="flex h-10 w-full justify-between rounded-none px-3 text-xs text-muted-foreground hover:bg-accent/50"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex items-center gap-2">
          <Brain className={`size-3.5 ${active ? "chat-stage-pulse text-primary" : ""}`} />
          {active ? "Thinking…" : "Thought process"}
        </span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </Button>
      <div className={`thinking-content-grid ${open ? "is-open" : ""}`}>
        <div className="min-h-0">
          <div className="thinking-scrollbar max-h-48 overflow-y-auto border-t border-border/60 px-3 py-3 font-mono text-xs italic leading-5 text-muted-foreground whitespace-pre-wrap break-words">
            {message.thinking}
            {active && message.streaming && <span className="streaming-caret" aria-hidden="true" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatMessage({ message, onStop }: { message: Message; onStop?: () => void }) {
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const copyResponse = () => {
    navigator.clipboard?.writeText(message.content).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const previewRegenerate = () => {
    setRegenerating(true);
    window.setTimeout(() => setRegenerating(false), 650);
  };
  if (message.role === "user") {
    return (
      <AIMessage from="user" className="message-enter-user max-w-full"><MessageContent className="max-w-[85%] rounded-xl border border-border bg-secondary px-4 py-3 leading-6 sm:max-w-[70%]">{message.content}</MessageContent></AIMessage>
    );
  }

  return (
    <AIMessage from="assistant" className="message-enter-assistant max-w-full flex-row gap-3 sm:gap-4">
      <div className={`assistant-avatar mt-0.5 grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-code ${message.streaming ? "is-generating" : ""}`}>
        <img src={qwenMark.url} alt="" className="size-full object-cover" />
      </div>
      <MessageContent className="assistant-reveal min-w-0 flex-1 overflow-visible">
        {message.stage && <ChatStageIndicator stage={message.stage} />}
        {message.stage && <ThinkingPanel message={message} />}
        {message.stage === "connecting" && !message.content ? (
          <div className="connecting-skeleton space-y-2.5" aria-label="Waiting for model response">
            <span className="block h-3 w-full rounded bg-muted" />
            <span className="block h-3 w-4/5 rounded bg-muted" />
            <span className="block h-3 w-3/5 rounded bg-muted" />
          </div>
        ) : message.stage ? (
          <StreamingContent content={message.content} streaming={message.streaming === true} />
        ) : (
          <Fragment>
            <p className="text-sm leading-7 text-foreground sm:text-[15px]">
              Article 21 protects the <strong>right to life and personal liberty</strong>. It states
              that no person shall be deprived of life or personal liberty except according to
              procedure established by law.
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground sm:text-[15px]">
              The Supreme Court has interpreted this broadly, extending it to dignity, privacy,
              clean environment, legal aid, and a fair trial.
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-border/70 bg-code">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
                <span>Article 21</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => {
                    copyResponse();
                  }}
                  aria-label={copied ? "Copied response" : "Copy code"}
                >
                  <span className={copied ? "copy-success" : ""}>{copied ? <Check /> : <Clipboard />}</span>
                  <span className={copied ? "copy-success" : ""}>{copied ? "Copied" : "Copy"}</span>
                </Button>
              </div>
              <pre className="overflow-x-auto p-4 text-xs leading-6 text-code-foreground">
                <code>
                  No person shall be deprived of his life or personal liberty
                  <br />
                  except according to procedure established by law.
                </code>
              </pre>
            </div>
          </Fragment>
        )}
        {message.sources && (
          <div className="mt-5">
            <h3 className="mb-2.5 text-xs font-semibold text-foreground">Sources</h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {sources.map((source) => (
                <SourceCard key={source.name} source={source} />
              ))}
            </div>
          </div>
        )}
        <div className="mt-3 flex min-h-8 flex-wrap items-center gap-1 text-muted-foreground">
          {message.streaming && onStop && (
            <Button
              variant="soft"
              size="sm"
              className="stop-generating mr-1 h-8"
              onClick={onStop}
            >
              <Square className="size-3 fill-current" />
              Stop generating
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg"
            aria-label="Copy response"
            onClick={copyResponse}
          >
            <span className={copied ? "copy-success text-primary" : ""}>{copied ? <Check /> : <Clipboard />}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg"
            aria-label="Regenerate response"
            onClick={previewRegenerate}
          >
            <RefreshCw className={regenerating ? "regenerate-spin" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`size-8 rounded-lg ${feedback === "up" ? "bg-primary/10 text-primary" : ""}`}
            aria-label="Like response"
            aria-pressed={feedback === "up"}
            onClick={() => setFeedback((current) => current === "up" ? null : "up")}
          >
            <ThumbsUp />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`size-8 rounded-lg ${feedback === "down" ? "bg-primary/10 text-primary" : ""}`}
            aria-label="Dislike response"
            aria-pressed={feedback === "down"}
            onClick={() => setFeedback((current) => current === "down" ? null : "down")}
          >
            <ThumbsDown />
          </Button>
        </div>
      </MessageContent>
    </AIMessage>
  );
}
