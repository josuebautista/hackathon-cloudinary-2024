import { halloweenPrompts } from "../db/prompts";

export const getPrompt = (): string => {
  const randomIndex = Math.floor(Math.random() * halloweenPrompts.length);
  return halloweenPrompts[randomIndex];
}