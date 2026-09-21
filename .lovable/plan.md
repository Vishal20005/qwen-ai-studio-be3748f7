# Streaming message experience

## What will change
- Add a compact assistant status row for connecting, reasoning, composing, and completion states, with the completed state disappearing after one second.
- Add a collapsible thought-process panel that opens while connecting or reasoning and closes when answering, while still allowing manual review.
- Show a blinking caret during streamed answers and shimmering placeholder lines before content arrives.
- Add thin themed scrollbars to the main chat area and thought panel, with reduced-motion fallbacks.
- Add a development-only “Preview stages” control on the empty screen for reviewing thinking, answering, and completed examples.

## Compatibility
- Extend the existing message type with optional `stage`, `thinking`, and `streaming` fields so current messages and the existing ChatApp flow continue to work unchanged.
- Keep the preview entirely inside the development-only empty state; it will not alter production message flow or require ChatApp changes.
- Preserve the current source cards and response action controls.

## Files
- Update `src/components/chat/chat-message.tsx` for staged assistant rendering, thought disclosure, caret, and skeleton.
- Add `src/components/chat/chat-stage-indicator.tsx` for isolated stage presentation and the timed completion fade.
- Update `src/components/chat/empty-state.tsx` with the development-only stage preview.
- Extend `src/data/mock-chat.ts` with typed preview messages while retaining existing mock conversations and sources.
- Append animation and scrollbar utilities to `src/styles.css`.

## Verification
- Check each preview stage on desktop and mobile, including collapse behavior and long-line wrapping.
- Confirm legacy chat messages still send and render, the main layout is unchanged, no horizontal overflow appears, and reduced-motion styles disable nonessential animation.
