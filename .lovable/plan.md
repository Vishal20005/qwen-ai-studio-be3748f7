# Premium chat motion upgrade

## What will change
- Refine message entrances, streamed text, and the assistant avatar with subtle generation motion.
- Expand the existing response stages into polished Searching, Thinking, and Generating feedback while preserving the current chat flow.
- Add a compact Stop Generating control shown only while a mock response is active.
- Improve source-card hover/expand behavior, copy confirmation, response actions, and composer focus glow.
- Keep the current layout, controls, mock-only functionality, themes, and mobile behavior unchanged.

## Technical details
- Reuse the existing message, stage, typing, and timer state rather than adding services or changing data flow.
- Keep motion CSS-only where practical, add small local React state only for streaming presentation and control feedback.
- Respect reduced-motion preferences and avoid animations that change element dimensions unexpectedly.
- Preserve all existing response controls and make their feedback visually clear without adding new product features.

## Verification
- Send a message and confirm staged generation, progressive text, Stop Generating, and automatic scrolling work.
- Check copy, regenerate, feedback, source interactions, and composer focus on desktop and mobile.
- Confirm no horizontal overflow, layout shifts, or browser errors.
