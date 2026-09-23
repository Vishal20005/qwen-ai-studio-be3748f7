import type { ReactNode } from "react";
import qwenMark from "@/assets/qwen-mark.png.asset.json";
export function EmptyState({ composer }: { composer: ReactNode }) {

  return (
    <section className="mx-auto flex size-full max-w-3xl flex-col items-center justify-center px-4 pb-20 text-center sm:px-8">
      <div className="mb-6 grid size-12 place-items-center overflow-hidden rounded-xl border border-border bg-code">
        <img src={qwenMark.url} alt="Qwen AI" className="size-full object-cover" />
      </div>
      <h2 className="font-display text-2xl font-medium text-foreground sm:text-3xl">What’s on your mind?</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Ask a question, explore an idea, or work through a problem.</p>
      <div className="mt-8 w-full">{composer}</div>
    </section>
  );
}
