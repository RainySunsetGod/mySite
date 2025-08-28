import type { ContentItem } from "./types";

export const SPELLS: ContentItem[] = [
  {
    id: "spell_fireball",
    name: "Fireball",
    type: "Spell",
    power: 15,
    cost: 5,
    description: "Hurl a blazing fireball.",
    evolution: {
      requirements: [{ type: "usage", uses: 30 }],
      next: "spell_firestorm",
    },
  },
  {
    id: "spell_firestorm",
    name: "Firestorm",
    type: "Spell",
    power: 35,
    cost: 12,
    description: "Engulf the battlefield in flames.",
  },
];
