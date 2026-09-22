import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "./chat-header";
import { ChatMessage, type Message } from "./chat-message";
import { EmptyState } from "./empty-state";
import { MessageComposer } from "./message-composer";
import { SettingsModal } from "./settings-modal";
import { Sidebar } from "./sidebar";

const demoMessages: Message[] = [
  { id: 1, role: "user", content: "What is Article 21 of the Indian Constitution?" },
  { id: 2, role: "assistant", content: "Article 21 protects the right to life and personal liberty.", sources: true },
];

const streamedAnswer = "Article 21 protects the **right to life and personal liberty**. It ensures that no person may be deprived of life or personal liberty except according to a procedure established by law.";

export function ChatApp() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [title, setTitle] = useState("New Conversation");
  const [messages, setMessages] = useState<Message[]>([]);
  const [webSearch, setWebSearch] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<number[]>([]);
  const clearResponseTimers = () => {
    responseTimerRef.current.forEach((timer) => clearTimeout(timer));
    responseTimerRef.current = [];
  };
  const stopGenerating = () => {
    clearResponseTimers();
    setMessages((current) => current.map((message) =>
      message.role === "assistant" && message.streaming
        ? { ...message, stage: "done", streaming: false, content: message.content || "Generation stopped." }
        : message,
    ));
    setIsResponding(false);
  };
  const openConversation = (nextTitle: string) => { setTitle(nextTitle); setMessages(nextTitle === "New Conversation" ? [] : demoMessages); };
  const send = (text: string) => {
    const messageId = Date.now();
    setTitle(title === "New Conversation" ? text.slice(0, 38) : title);
    clearResponseTimers();
    setMessages((current) => [
      ...current,
      { id: messageId, role: "user", content: text },
      { id: messageId + 1, role: "assistant", content: "", stage: "connecting", streaming: true },
    ]);
    setIsResponding(true);
    const updateAssistant = (update: Partial<Message>) => {
      setMessages((current) => current.map((message) => message.id === messageId + 1 ? { ...message, ...update } : message));
    };
    responseTimerRef.current.push(window.setTimeout(() => updateAssistant({ stage: "thinking", thinking: "Understanding the question and identifying the relevant constitutional principle…" }), 420));
    responseTimerRef.current.push(window.setTimeout(() => updateAssistant({ stage: "answering" }), 920));
    const words = streamedAnswer.split(" ");
    words.forEach((_, index) => {
      responseTimerRef.current.push(window.setTimeout(() => {
        updateAssistant({ content: words.slice(0, index + 1).join(" ") });
      }, 1000 + index * 34));
    });
    responseTimerRef.current.push(window.setTimeout(() => {
      updateAssistant({ stage: "done", streaming: false, sources: webSearch });
      setIsResponding(false);
      responseTimerRef.current = [];
    }, 1100 + words.length * 34));
  };
  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isResponding]);
  useEffect(() => () => {
    clearResponseTimers();
  }, []);
  return (
    <main className="relative flex h-dvh overflow-hidden bg-background text-foreground">
      <div className={sidebarOpen ? "hidden md:block" : "hidden"}><Sidebar onSettings={() => setSettingsOpen(true)} onConversation={openConversation} /></div>
      {mobileOpen && <div className="fixed inset-0 z-40 md:hidden"><button className="absolute inset-0 bg-overlay backdrop-blur-sm" aria-label="Close menu" onClick={() => setMobileOpen(false)} /><div className="relative h-full w-[min(85vw,300px)] animate-in slide-in-from-left duration-200"><Sidebar onClose={() => setMobileOpen(false)} onSettings={() => { setMobileOpen(false); setSettingsOpen(true); }} onConversation={openConversation} /><Button variant="soft" size="icon" className="absolute right-3 top-3 rounded-xl" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></Button></div></div>}
      <section className="relative flex min-w-0 flex-1 flex-col">
        <ChatHeader title={title} onMenu={() => setMobileOpen(true)} sidebarOpen={sidebarOpen} onSidebarToggle={() => setSidebarOpen((open) => !open)} />
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div ref={scrollAreaRef} className="h-full overflow-y-auto scroll-smooth">
            {messages.length === 0 ? <EmptyState /> : <div className="mx-auto flex max-w-3xl flex-col gap-9 px-4 pb-56 pt-8 sm:px-8 sm:pt-12">{messages.map((message) => message.streaming ? <ChatMessage key={message.id} message={message} onStop={stopGenerating} /> : <ChatMessage key={message.id} message={message} />)}{isResponding && <div className="sr-only" aria-live="polite">Qwen is generating a response</div>}</div>}
          </div>
          <MessageComposer webSearch={webSearch} onWebSearch={setWebSearch} onSend={send} />
        </div>
      </section>
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </main>
  );
}