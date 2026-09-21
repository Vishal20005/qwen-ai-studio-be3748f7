import { useState } from "react";
import qwenMark from "@/assets/qwen-mark.png.asset.json";
import { Button } from "@/components/ui/button";
import {
  mockAssistantAnsweringMessage,
  mockAssistantDoneMessage,
  mockAssistantThinkingMessage,
} from "@/data/mock-chat";
import { ChatMessage, type Message, type MessageStage } from "./chat-message";

const previewStages: MessageStage[] = ["connecting", "thinking", "answering", "done"];

export function EmptyState() {
  const [previewStage, setPreviewStage] = useState<MessageStage | null>(null);
  const previewMessage: Message | null =
    previewStage === "connecting"
      ? { ...mockAssistantThinkingMessage, id: 901, stage: "connecting", thinking: "", content: "" }
      : previewStage === "thinking"
        ? mockAssistantThinkingMessage
        : previewStage === "answering"
          ? mockAssistantAnsweringMessage
          : previewStage === "done"
            ? mockAssistantDoneMessage
            : null;

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-44 pt-14 text-center sm:px-8">
      <div className="relative mb-7 grid size-20 place-items-center overflow-hidden rounded-3xl bg-code shadow-glow before:absolute before:inset-[-16px] before:-z-10 before:rounded-[2rem] before:bg-primary/10 before:blur-xl">
        <img src={qwenMark.url} alt="Qwen AI" className="size-full object-cover" />
      </div>
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">How can I help you?</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
        Ask questions, explore ideas, write code, or search the web.
      </p>
      {import.meta.env.DEV && (
        <div className="mt-7 w-full text-left">
          <div
            className="mb-4 flex flex-wrap items-center justify-center gap-1.5"
            aria-label="Preview stages"
          >
            <span className="mr-1 text-xs font-medium text-muted-foreground">Preview stages</span>
            {previewStages.map((stage) => (
              <Button
                key={stage}
                variant={previewStage === stage ? "soft" : "ghost"}
                size="sm"
                className="h-8 capitalize"
                onClick={() => setPreviewStage(stage)}
              >
                {stage}
              </Button>
            ))}
          </div>
          {previewMessage && (
            <div className="rounded-lg border border-border/70 bg-background/80 p-4 sm:p-5">
              <ChatMessage key={previewStage} message={previewMessage} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
