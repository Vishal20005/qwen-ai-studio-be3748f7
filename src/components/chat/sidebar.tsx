import { Boxes, Image, MessageSquare, PanelLeftClose, PanelLeftOpen, Plus, Search, Settings2, SlidersHorizontal, Wrench } from "lucide-react";
import { conversationGroups } from "@/data/mock-chat";
import { BrandMark } from "./brand-mark";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  onClose?: () => void;
  onSettings: () => void;
  onConversation: (title: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
};

const workspaceTools = [
  { label: "Images", icon: Image },
  { label: "Models", icon: Boxes },
  { label: "Tools", icon: Wrench },
];

export function Sidebar({ onClose, onSettings, onConversation, collapsed = false, onToggle }: SidebarProps) {
  return (
    <aside className={`flex h-full shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar/95 p-3 backdrop-blur-xl transition-[width] duration-300 ease-out ${collapsed ? "w-[68px]" : "w-[280px] lg:w-[260px]"}`}>
      <div className={`group/brand flex h-11 shrink-0 items-center ${collapsed ? "justify-center" : "justify-between px-1"}`}>
        <div className={collapsed ? "group-hover/brand:hidden group-focus-within/brand:hidden" : ""}><BrandMark compact={collapsed} /></div>
        {onToggle && <Button variant="ghost" size="icon" className={`${collapsed ? "hidden group-hover/brand:inline-flex group-focus-within/brand:inline-flex" : ""} rounded-xl text-muted-foreground hover:text-foreground`} onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>{collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}</Button>}
      </div>
      <Button
        variant="premium"
        className={`mt-3 h-10 w-full rounded-xl ${collapsed ? "px-0" : "justify-start px-3"}`}
        onClick={() => { onConversation("New Conversation"); onClose?.(); }}
        title={collapsed ? "New chat" : undefined}
      >
        <Plus /> {!collapsed && <span>New Chat</span>}
      </Button>
      <Button variant="ghost" className={`mt-1.5 h-10 w-full rounded-xl text-muted-foreground ${collapsed ? "px-0" : "justify-start px-3"}`} title={collapsed ? "Search conversations" : undefined}>
        <Search /> {!collapsed && <span>Search conversations</span>}
      </Button>

      <div className="mt-4 border-y border-sidebar-border py-2">
        {workspaceTools.map((item) => <Button key={item.label} variant="ghost" className={`h-9 w-full rounded-lg text-muted-foreground hover:text-foreground ${collapsed ? "px-0" : "justify-start px-3"}`} title={collapsed ? item.label : undefined}><item.icon />{!collapsed && <span>{item.label}</span>}</Button>)}
      </div>

      <nav className={`mt-5 min-h-0 flex-1 overflow-y-auto transition-opacity duration-200 ${collapsed ? "pointer-events-none opacity-0" : "opacity-100"}`} aria-label="Conversation history">
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
        <Button variant="ghost" className={`h-9 w-full ${collapsed ? "px-0" : "justify-start px-3"}`} onClick={onSettings} title={collapsed ? "Settings" : undefined}>
          <Settings2 /> {!collapsed && <span>Settings</span>}
        </Button>
        <Button variant="ghost" className={`h-9 w-full ${collapsed ? "px-0" : "justify-start px-3"}`} title={collapsed ? "Qwen3 4B model" : undefined}>
          <SlidersHorizontal /> {!collapsed && <><span>Model</span><span className="ml-auto text-xs text-muted-foreground">Qwen3 4B</span></>}
        </Button>
        <div className={`mt-2 flex items-center rounded-xl border border-status/20 bg-status/5 text-xs text-muted-foreground ${collapsed ? "justify-center px-0 py-3" : "gap-2 px-3 py-2.5"}`} title={collapsed ? "Local mode active" : undefined}>
          <span className="size-2 rounded-full bg-status shadow-status" />
          {!collapsed && <><span>Local Mode</span><span className="ml-auto text-status">Active</span></>}
        </div>
      </div>
    </aside>
  );
}