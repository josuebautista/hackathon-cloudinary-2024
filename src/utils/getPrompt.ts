import { halloweenPrompts } from "../db/prompts";
import type { StoryPrompt } from "../models/types";

export const getPrompt = (): StoryPrompt => {
  const randomIndex = Math.floor(Math.random() * halloweenPrompts.length);
  return halloweenPrompts[randomIndex];
}