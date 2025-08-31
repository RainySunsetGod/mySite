import type { ContentItem } from "./types";

export const SHIELDS: ContentItem[] = [
  {
    id: "shield_wooden",
    name: "Wooden Shield",
    type: "Shield",
    defenseBoost: 2,
  },
  {
    id: "shield_fire",
    name: "Fire Shield",
    type: "Shield",
    defenseBoost: 4,
    special: "Blocks fire damage",
  },
];
