import type { ContentItem } from "./types";

export const WEAPONS: ContentItem[] = [
  {
    id: "sword_iron",
    name: "Iron Sword",
    type: "Weapon",
    attackType: "melee",
    accuracy: 95,
    evolution: {
      requirements: [{ type: "merge", count: 2 }],
      next: "sword_steel",
    },
  },
  {
    id: "sword_steel",
    name: "Steel Sword",
    type: "Weapon",
    attackType: "melee",
    evolution: {
      requirements: [{ type: "material", itemId: "misc_fire_crystal", amount: 1 }],
      next: "sword_flame",
    },
  },
  {
    id: "sword_flame",
    name: "Flame Sword",
    type: "Weapon",
    attackType: "melee",
    element: "Fire",
    accuracy: 95,
  },
];
