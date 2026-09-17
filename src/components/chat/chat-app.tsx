import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "./chat-header";
import { ChatMessage, type Message } from "./chat-message";
import { EmptyState } from "./empty-state";
import { MessageComposer } from "./message-composer";
import { SettingsModal } from "./settings-modal";
import { Sidebar } from "./sidebar";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";

const demoMessages: Message[] = [
  { id: 1, role: "user", content: "What is Article 21 of the Indian Constitution?" },
  { id: 2, role: "assistant", content: "Article 21 protects the right to life and personal liberty.", sources: true },
];

export function ChatApp() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [title, setTitle] = useState("New Conversation");
  const [messages, setMessages] = useState<Message[]>([]);
  const [webSearch, setWebSearch] = useState(false);
  const openConversation = (nextTitle: string) => { setTitle(nextTitle); setMessages(nextTitle === "New Conversation" ? [] : demoMessages); };
  const send = (text: string) => { setTitle(title === "New Conversation" ? text.slice(0, 38) : title); setMessages([{ id: Date.now(), role: "user", content: text }, { id: Date.now() + 1, role: "assistant", content: "Article 21 protects the right to life and personal liberty.", sources: webSearch }]); };
  return (
    <main className="relative flex h-dvh overflow-hidden bg-background text-foreground">
      <div className="hidden shrink-0 md:block"><Sidebar collapsed={!sidebarOpen} onToggle={() => setSidebarOpen((open) => !open)} onSettings={() => setSettingsOpen(true)} onConversation={openConversation} /></div>
      {mobileOpen && <div className="fixed inset-0 z-40 md:hidden"><Button variant="ghost" className="absolute inset-0 h-full w-full rounded-none bg-overlay backdrop-blur-sm hover:bg-overlay" aria-label="Close menu" onClick={() => setMobileOpen(false)} /><div className="relative h-full w-[min(85vw,300px)] animate-in slide-in-from-left duration-200"><Sidebar onClose={() => setMobileOpen(false)} onSettings={() => { setMobileOpen(false); setSettingsOpen(true); }} onConversation={openConversation} /><Button variant="soft" size="icon" className="absolute right-3 top-3 rounded-xl" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></Button></div></div>}
      <section className="relative flex min-w-0 flex-1 flex-col">
        <ChatHeader title={title} onMenu={() => setMobileOpen(true)} />
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <Conversation className="h-full">
            <ConversationContent className="min-h-full pb-56">
              {messages.length === 0 ? <EmptyState /> : <div className="mx-auto flex w-full max-w-3xl flex-col gap-9 px-0 pt-4 sm:px-4 sm:pt-8">{messages.map((message) => <ChatMessage key={message.id} message={message} />)}<div className="flex items-center gap-3 pl-11 text-xs text-muted-foreground"><span className="typing-dot" /><span className="typing-dot [animation-delay:150ms]" /><span className="typing-dot [animation-delay:300ms]" /></div></div>}
            </ConversationContent>
            <ConversationScrollButton className="bottom-44" />
          </Conversation>
          <MessageComposer webSearch={webSearch} onWebSearch={setWebSearch} onSend={send} />
        </div>
      </section>
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </main>
  );
}