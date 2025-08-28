import type { ContentItem } from "./types";

export const WEAPONS: ContentItem[] = [
  {
    id: "sword_iron",
    name: "Iron Sword",
    type: "Weapon",
    attackBoost: 5,
    evolution: {
      requirements: [{ type: "merge", count: 2 }],
      next: "sword_steel",
    },
  },
  {
    id: "sword_steel",
    name: "Steel Sword",
    type: "Weapon",
    attackBoost: 9,
    evolution: {
      requirements: [{ type: "material", itemId: "misc_fire_crystal", amount: 1 }],
      next: "sword_flame",
    },
  },
  {
    id: "sword_flame",
    name: "Flame Sword",
    type: "Weapon",
    attackBoost: 15,
  },
];
