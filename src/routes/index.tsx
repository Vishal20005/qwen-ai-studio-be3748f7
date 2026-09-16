import { createFileRoute } from "@tanstack/react-router";
import { ChatApp } from "@/components/chat/chat-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qwen AI — Local AI Chat" },
      { name: "description", content: "A private, responsive AI chat workspace powered by Qwen." },
      { property: "og:title", content: "Qwen AI — Local AI Chat" },
      { property: "og:description", content: "A private, responsive AI chat workspace powered by Qwen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ChatApp />;
}
