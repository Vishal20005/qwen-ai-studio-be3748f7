import {
  BookOpenText,
  BriefcaseBusiness,
  Code2,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

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