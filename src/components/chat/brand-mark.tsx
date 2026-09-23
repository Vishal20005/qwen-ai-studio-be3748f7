import qwenMark from "@/assets/qwen-mark.png.asset.json";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-code">
        <img src={qwenMark.url} alt="Qwen AI" className="size-full object-cover" />
      </div>
      {!compact && <span className="font-display truncate text-[15px] font-semibold text-foreground">Qwen AI</span>}
    </div>
  );
}