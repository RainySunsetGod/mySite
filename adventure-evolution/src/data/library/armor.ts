import type { ContentItem } from "./types";

export const ARMORS: ContentItem[] = [
  {
    id: "armor_leather",
    name: "Leather Armor",
    type: "Armor",
    defenseBoost: 3,
  },
  {
    id: "armor_mage",
    name: "Mage Robes",
    type: "Armor",
    defenseBoost: 1,
    special: "Reduce spell cost",
  },
];
