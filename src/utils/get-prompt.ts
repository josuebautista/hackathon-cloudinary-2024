import type { Story } from "../models/types";
import { getFormatedStory } from "../db/stories";

export const getStory = (character: string): Story => {
  return getFormatedStory(character);
}