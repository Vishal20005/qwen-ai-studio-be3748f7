# Chat animations

## What will change
- Animate new user and assistant messages into view with a short, soft stagger.
- Reveal assistant text smoothly so replies feel active without slowing reading.
- Refine the typing indicator and automatically scroll new messages into view.
- Keep all motion subtle and disable it for people who prefer reduced motion.

## Technical details
- Update the chat message presentation and chat container state only.
- Extend the existing CSS animation utilities using semantic design tokens.
- Keep the app UI-only; no AI endpoint or backend will be added.
- Verify sending a message on desktop and mobile without horizontal overflow or browser errors.
