import qwenMark from "@/assets/qwen-mark.png.asset.json";

export function BrandMark({ compact = false, animated = true }: { compact?: boolean; animated?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className={`qwen-mark grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl bg-code ${animated ? "qwen-mark-animated" : ""}`}>
        <img src={qwenMark.url} alt="Qwen AI" className="size-full object-cover" />
      </div>
      {!compact && <span className="truncate text-base font-semibold text-foreground">Qwen AI</span>}
    </div>
  );
}