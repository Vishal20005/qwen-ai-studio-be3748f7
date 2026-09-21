import { BookOpenText, BriefcaseBusiness, Code2, Newspaper, type LucideIcon } from "lucide-react";

export type ConversationGroup = {
  label: string;
  items: string[];
};

export type Suggestion = {
  title: string;
  prompt: string;
  icon: LucideIcon;
};

export const conversationGroups: ConversationGroup[] = [
  { label: "Today", items: ["Indian Polity Questions", "Latest AI News"] },
  { label: "Yesterday", items: ["Python Help"] },
  { label: "Previous 7 Days", items: ["Business Research"] },
];

export const suggestions: Suggestion[] = [
  {
    title: "Explain Indian Constitution",
    prompt: "What is Article 21 of the Indian Constitution?",
    icon: BookOpenText,
  },
  {
    title: "Latest AI news",
    prompt: "What are the most important AI developments this week?",
    icon: Newspaper,
  },
  {
    title: "Help me write Python",
    prompt: "Help me write a clean Python data-processing script.",
    icon: Code2,
  },
  {
    title: "Research a business idea",
    prompt: "Research the market for an AI study assistant in India.",
    icon: BriefcaseBusiness,
  },
];

export const sources = [
  {
    name: "Government of India",
    domain: "legislative.gov.in",
    description: "The Constitution of India — official legislative text.",
  },
  {
    name: "Supreme Court of India",
    domain: "sci.gov.in",
    description: "Judgments interpreting the right to life and liberty.",
  },
  {
    name: "Wikipedia",
    domain: "wikipedia.org",
    description: "Overview and historical context for Article 21.",
  },
];

export const mockUserMessage = {
  id: 100,
  role: "user" as const,
  content: "Explain how React hooks work",
};

const realisticThinking = `We need explain React hooks clearly and briefly.
Cover state, effects, reuse through custom hooks, and the Rules of Hooks.
Include a compact example showing useState and useEffect together.`;

export const mockAssistantThinkingMessage = {
  id: 101,
  role: "assistant" as const,
  stage: "thinking" as const,
  streaming: true,
  thinking: realisticThinking,
  content: "",
};

export const mockAssistantAnsweringMessage = {
  id: 102,
  role: "assistant" as const,
  stage: "answering" as const,
  streaming: true,
  thinking: realisticThinking,
  content:
    "## React hooks\nHooks let function components use React features such as state and lifecycle behavior.\n- `useState` stores local values\n- `useEffect` synchronizes with external systems",
};

export const mockAssistantDoneMessage = {
  id: 103,
  role: "assistant" as const,
  stage: "done" as const,
  streaming: false,
  thinking: realisticThinking,
  content: `## React hooks
Hooks are functions that let components use state and other React features.
- **useState** stores local component state
- **useEffect** runs synchronization work after rendering
- **Custom hooks** package reusable stateful behavior

\`\`\`tsx
const [count, setCount] = useState(0)
useEffect(() => document.title = String(count), [count])
\`\`\``,
};
