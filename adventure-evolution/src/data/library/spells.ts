import type { ContentItem } from "./types";

export const SPELLS: ContentItem[] = [
  {
    id: "spell_fireball",
    name: "Fireball",
    type: "Spell",
    power: 15,
    costs: [
      { type: "MP", amount: 5 }
    ],
    element: "Fire",
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
    costs: [
      { type: "MP", amount: 12 }
    ],
    element: "Fire",
    description: "Engulf the battlefield in flames.",
  },
];
