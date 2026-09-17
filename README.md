# Qwen AI Studio

# Digieno AI Chat 




Build a modern, premium AI chatbot web application UI called Qwen AI.





IMPORTANT:





Build UI/UX only for now.





Do NOT implement the actual  model, API, database, authentication, web search backend, or other backend functionality.





Use realistic mock data so the interface looks fully functional.





Keep the implementation simple enough to work within the Lovable free plan.





Do not over-engineer the project.





Make the code clean, modular, responsive, and easy to connect to a Python/FastAPI backend later.





Design direction





Create a polished AI-chat interface inspired by modern products such as ChatGPT, Claude, Perplexity, and modern AI startups, but do NOT copy their exact UI.





Use a modern gradient-based visual identity:





Deep charcoal/near-black background





Subtle blue, purple, violet, and cyan gradients





Soft gradient borders





Glassmorphism used sparingly





Subtle background glow effects





Rounded cards and buttons





Clean typography





Excellent spacing





Minimal visual clutter





Premium SaaS appearance





The interface should look good in both dark mode and light mode.





Main layout





Create a responsive three-part application:





1. Left sidebar





Desktop:





Width around 260px





Slightly darker/glass background





Logo at the top:





"Qwen AI"





Small gradient AI icon





"New Chat" button with a plus icon





Search conversations button





Conversation history grouped by:





Today





Yesterday





Previous 7 Days





Example conversations:





Indian Polity Questions





Latest AI News





Python Help





Business Research





Bottom section:





Settings





Model





Local Mode indicator





Mobile:





Sidebar becomes a slide-out drawer





Include a hamburger menu button





2. Main chat area





Top navigation bar:





Left:





Mobile menu button





Conversation title: "New Conversation"





Center/right:





Model selector showing:


"Qwen3 4B"





Status indicator:


"Local"





Add a small green/blue status dot and label:





"Running locally"





Main empty-state screen:





Large gradient AI icon.





Heading:





"How can I help you?"





Subtitle:





"Ask questions, explore ideas, write code, or search the web."





Below it create four suggestion cards:





"Explain Indian Constitution"





"Latest AI news"





"Help me write Python"





"Research a business idea"





Each card should have a small icon and subtle gradient hover effect.





Chat messages





When a conversation exists, display:





User messages:





Right aligned





Rounded message bubble





Subtle gradient background





AI messages:





Left aligned





No heavy bubble





AI avatar/icon





Clean typography





Markdown-style formatting





Code blocks with syntax highlighting





Copy button





Regenerate button





Like/dislike buttons





Use realistic mock conversation data so the UI can be previewed immediately.





Example:





User:


"What is Article 21 of the Indian Constitution?"





AI:


"Article 21 protects the right to life and personal liberty. It states that no person shall be deprived of life or personal liberty except according to procedure established by law."





Web search mode





Above the message input, add a small toggle/button:





"Web Search"





When enabled, show:





"Web search enabled"





with a subtle gradient highlight.





Use mock search results in one example response.





Create a "Sources" section beneath the AI answer containing small source cards:





Government of India





Supreme Court of India





Wikipedia





Each source card should show:





favicon placeholder





source name





short description





external-link icon





Do NOT implement actual web search.





Message composer





Create a large modern input box fixed near the bottom.





Placeholder:





"Ask Qwen anything..."





Inside/around the composer:





Left:





Attachment button





Web Search toggle





Right:





Voice icon





Send button





The send button should have a blue-purple gradient.





Add keyboard hint:





"Press Enter to send · Shift + Enter for new line"





The composer should remain usable on mobile.





Model selector





Create a small dropdown that currently contains:





Qwen3 4B — Local





Qwen3 8B — Cloud





Qwen3 30B — Cloud





Only Qwen3 4B needs to appear as active.





The other models should visually indicate that they are unavailable/not configured.





Settings UI





Create a settings modal/drawer with:





General





Theme: System / Light / Dark





Compact mode toggle





Enter to send toggle





AI





Model: Qwen3 4B





Temperature slider





Max response length





Search





Web Search toggle





Show sources toggle





Privacy





Show:





"Local Mode"





"Your conversations are processed locally when using the local model."





These settings can be mock controls for now.





Visual effects





Use subtle animations only:





Message fade-in





Button hover





Gradient glow on active controls





Sidebar transition





Modal animation





Typing indicator





Avoid excessive animations.





Use gradients primarily for:





Logo





AI icon





Primary buttons





Active states





Small decorative elements





Do not make the entire interface neon.





Responsive design





Desktop:





Three-column/premium SaaS feel





Sidebar + main chat





Tablet:





Reduced sidebar width





Mobile:





Collapsible sidebar





Full-width chat





Bottom composer





Touch-friendly buttons





No horizontal scrolling





Technical requirements





Use:





React





Tailwind CSS





Lucide icons or another lightweight icon library





Components should be reusable





No unnecessary dependencies





No backend implementation





No external paid APIs





No authentication





No database





Create a clean component structure such as:





components/





Sidebar





ChatHeader





EmptyState





ChatMessage





SourceCard





MessageComposer





ModelSelector





SettingsModal





SuggestionCard





Use mock data in a simple local data file.





Make the final result feel like a real production AI product, not a generic dashboard.





Prioritize:





Beautiful visual hierarchy





Excellent chat experience





Responsive design





Clean modern gradients





Easy future integration with a FastAPI + Qwen backend





Do not add features that are not requested.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b44f3e0f-4d10-4ce5-ac20-7eec549390ff).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
