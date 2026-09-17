import { MessageSquare, Plus, Search, Settings2, SlidersHorizontal } from "lucide-react";
import { conversationGroups } from "@/data/mock-chat";
import { BrandMark } from "./brand-mark";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  onClose?: () => void;
  onSettings: () => void;
  onConversation: (title: string) => void;
};

export function Sidebar({ onClose, onSettings, onConversation }: SidebarProps) {
  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-border/60 bg-sidebar/90 p-3 backdrop-blur-xl lg:w-[260px]">
      <div className="px-2 pb-4 pt-2"><BrandMark /></div>
      <Button
        variant="premium"
        className="h-11 w-full justify-start rounded-xl px-3"
        onClick={() => { onConversation("New Conversation"); onClose?.(); }}
      >
        <Plus /> New Chat
      </Button>
      <Button variant="ghost" className="mt-2 h-10 w-full justify-start rounded-xl px-3 text-muted-foreground">
        <Search /> Search conversations
      </Button>

      <nav className="mt-5 min-h-0 flex-1 overflow-y-auto" aria-label="Conversation history">
        {conversationGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-1.5 px-3 text-[11px] font-medium uppercase text-muted-foreground">{group.label}</p>
            {group.items.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="h-9 w-full justify-start rounded-lg px-3 font-normal text-sidebar-foreground"
                onClick={() => { onConversation(item); onClose?.(); }}
              >
                <MessageSquare className="text-muted-foreground" />
                <span className="truncate">{item}</span>
              </Button>
            ))}
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border pt-3">
        <Button variant="ghost" className="h-9 w-full justify-start px-3" onClick={onSettings}>
          <Settings2 /> Settings
        </Button>
        <Button variant="ghost" className="h-9 w-full justify-start px-3">
          <SlidersHorizontal /> Model <span className="ml-auto text-xs text-muted-foreground">Qwen3 4B</span>
        </Button>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-status/20 bg-status/5 px-3 py-2.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-status shadow-status" />
          <span>Local Mode</span>
          <span className="ml-auto text-status">Active</span>
        </div>
      </div>
    </aside>
  );
}