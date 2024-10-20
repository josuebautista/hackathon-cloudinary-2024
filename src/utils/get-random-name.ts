import { commonNames } from "../db/names";

export const getRandomName = (): string => {
  const randomIndex = Math.floor(Math.random() * commonNames.length);
  return commonNames[randomIndex];
}