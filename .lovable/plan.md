# Refine Qwen AI workspace

## Changes
- Lock the interface to one polished dark theme and remove color/appearance choices.
- Rework the desktop sidebar into a smooth width-collapsing rail with its toggle inside the sidebar.
- Keep the Qwen logo visible when collapsed and reveal the open control when the logo is hovered or focused.
- Add compact Images, Models, and Tools shortcuts while preserving new chat, search, history, settings, and local status.
- Refine the header, messages, spacing, typography, hover feedback, borders, and restrained blue-purple-cyan accents.
- Add subtle motion to the Qwen mark and a low-intensity animated glow around the composer.
- Preserve the current mock interactions and mobile drawer behavior.

## Technical details
- Use semantic color tokens in the global dark design system.
- Compose the conversation, messages, and prompt area from AI Elements primitives while preserving the existing app behavior.
- Respect reduced-motion preferences and verify desktop collapsed/expanded states plus the mobile drawer.
