import { useEffect, useState } from "react";
import { Brain, Check, Search, Sparkles } from "lucide-react";
import type { MessageStage } from "./chat-message";

const stageDetails = {
  connecting: { label: "Searching…", icon: Search },
  thinking: { label: "Thinking…", icon: Brain },
  answering: { label: "Generating…", icon: Sparkles },
  done: { label: "Complete", icon: Check },
} satisfies Record<MessageStage, { label: string; icon: typeof Brain }>;

export function ChatStageIndicator({ stage }: { stage: MessageStage }) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setVisible(true);
    setLeaving(false);
    if (stage !== "done") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeTimer = window.setTimeout(() => setLeaving(true), 1000);
    const hideTimer = window.setTimeout(() => setVisible(false), reduceMotion ? 1000 : 1220);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [stage]);

  if (!visible) return <div className="h-6" aria-hidden="true" />;

  const { label, icon: Icon } = stageDetails[stage];
  const active = stage !== "done";

  return (
    <div
      className={`chat-stage-row ${active ? "chat-stage-active" : ""} ${leaving ? "chat-stage-leaving" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="chat-stage-icon">
        <Icon
          className={`size-3.5 ${active ? "chat-stage-pulse" : ""}`}
        />
      </span>
      <span>{label}</span>
    </div>
  );
}
