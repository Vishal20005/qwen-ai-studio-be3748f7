import qwenMark from "@/assets/qwen-mark.png.asset.json";

export function EmptyState() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-44 pt-14 text-center sm:px-8">
      <div className="relative mb-7 grid size-20 place-items-center overflow-hidden rounded-3xl bg-code shadow-glow before:absolute before:inset-[-16px] before:-z-10 before:rounded-[2rem] before:bg-primary/10 before:blur-xl">
        <img src={qwenMark.url} alt="Qwen AI" className="size-full object-cover" />
      </div>
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">How can I help you?</h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">Ask questions, explore ideas, write code, or search the web.</p>
    </section>
  );
}