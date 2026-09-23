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
    <aside className="flex h-full w-[272px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-3 lg:w-[248px]">
      <div className="px-2 pb-5 pt-1.5"><BrandMark /></div>
      <Button
        variant="premium"
        className="h-10 w-full justify-start rounded-lg px-3"
        onClick={() => { onConversation("New Conversation"); onClose?.(); }}
      >
        <Plus /> New Chat
      </Button>
      <Button variant="ghost" className="mt-1 h-9 w-full justify-start rounded-lg px-3 text-muted-foreground">
        <Search /> Search conversations
      </Button>

      <nav className="mt-6 min-h-0 flex-1 overflow-y-auto" aria-label="Conversation history">
        {conversationGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase text-muted-foreground">{group.label}</p>
            {group.items.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="h-8 w-full justify-start rounded-md px-3 font-normal text-sidebar-foreground"
                onClick={() => { onConversation(item); onClose?.(); }}
              >
                <MessageSquare className="size-3.5 text-muted-foreground" />
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
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-status" />
          <span>Local Mode</span>
          <span className="ml-auto text-status">Active</span>
        </div>
      </div>
    </aside>
  );
}