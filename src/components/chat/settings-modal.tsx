import { useEffect, useState, type ReactNode } from "react";
import { Check, Cpu, Globe2, LockKeyhole, Palette, Settings2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const Row = ({ label, note, children }: { label: string; note?: string; children: ReactNode }) => <div className="flex items-center justify-between gap-4 py-3"><div className="min-w-0"><p className="text-sm font-medium">{label}</p>{note && <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>}</div><div className="shrink-0">{children}</div></div>;

const colorThemes = [
  { id: "ocean", label: "Ocean", swatch: "bg-theme-ocean" },
  { id: "emerald", label: "Emerald", swatch: "bg-theme-emerald" },
  { id: "rose", label: "Rose", swatch: "bg-theme-rose" },
  { id: "amber", label: "Amber", swatch: "bg-theme-amber" },
  { id: "graphite", label: "Graphite", swatch: "bg-theme-graphite" },
] as const;

type ColorTheme = (typeof colorThemes)[number]["id"];

export function SettingsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("ocean");
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("qwen-color-theme");
    if (colorThemes.some((item) => item.id === savedTheme)) setColorTheme(savedTheme as ColorTheme);
  }, []);
  useEffect(() => {
    const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset["palette"] = colorTheme;
    window.localStorage.setItem("qwen-color-theme", colorTheme);
  }, [colorTheme]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto rounded-2xl border-border/70 bg-background/95 p-0 shadow-composer backdrop-blur-xl">
        <DialogHeader className="border-b border-border/60 p-5 pr-12"><DialogTitle className="flex items-center gap-2"><Settings2 className="size-5 text-primary" />Settings</DialogTitle><DialogDescription>Personalize your Qwen AI experience.</DialogDescription></DialogHeader>
        <div className="grid gap-6 p-5 sm:grid-cols-2">
          <section><h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">General</h3><Row label="Appearance"><div className="flex rounded-lg bg-secondary p-1">{(["system", "light", "dark"] as const).map((item) => <Button key={item} variant="ghost" size="sm" onClick={() => setTheme(item)} className={`h-7 rounded-md px-2.5 text-xs capitalize ${theme === item ? "bg-background text-foreground shadow-xs hover:bg-background" : "text-muted-foreground"}`}>{item}</Button>)}</div></Row><Row label="Compact mode"><Switch /></Row><Row label="Enter to send"><Switch defaultChecked /></Row></section>
          <section><h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><Palette className="size-4" />Color theme</h3><div className="mt-3 grid grid-cols-5 gap-2">{colorThemes.map((item) => <Button key={item.id} variant="ghost" size="icon" title={item.label} aria-label={`Use ${item.label} color theme`} aria-pressed={colorTheme === item.id} onClick={() => setColorTheme(item.id)} className={`relative size-11 rounded-lg border transition-all ${colorTheme === item.id ? "border-primary bg-primary/10 shadow-sm" : "border-border/70 bg-secondary/50 hover:border-primary/40"}`}><span className={`size-5 rounded-full ${item.swatch}`} />{colorTheme === item.id && <Check className="absolute -right-1 -top-1 size-4 rounded-full bg-primary p-0.5 text-primary-foreground" />}</Button>)}</div><p className="mt-2 text-xs text-muted-foreground">{colorThemes.find((item) => item.id === colorTheme)?.label} accent</p></section>
          <section><h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><Cpu className="size-4" />AI</h3><Row label="Model"><span className="text-xs text-muted-foreground">Qwen3 4B</span></Row><div className="py-3"><div className="mb-3 flex justify-between text-sm"><span>Temperature</span><span className="text-muted-foreground">0.7</span></div><Slider defaultValue={[70]} max={100} step={1} /></div><Row label="Max response length"><span className="text-xs text-muted-foreground">2,048 tokens</span></Row></section>
          <section><h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><Globe2 className="size-4" />Search</h3><Row label="Web Search"><Switch /></Row><Row label="Show sources"><Switch defaultChecked /></Row></section>
          <section><h3 className="flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground"><LockKeyhole className="size-4" />Privacy</h3><div className="mt-3 rounded-xl border border-status/20 bg-status/5 p-3"><p className="text-sm font-medium text-status">Local Mode</p><p className="mt-1.5 text-xs leading-5 text-muted-foreground">Your conversations are processed locally when using the local model.</p></div></section>
        </div>
      </DialogContent>
    </Dialog>
  );
}