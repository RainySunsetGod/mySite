import type { EnemyTemplate } from "./types";

export const BEASTS: EnemyTemplate[] = [
  {
    id: "wolf",
    name: "Hungry Wolf",
    resistances: { Fire: 150, Ice: 80 },
    levels: [
      { level: 5, stats: { STR: 6, DEX: 5, INT: 1, END: 4, CHA: 2, LUK: 2 }, gold: 10, experience: 15 },
      { level: 10, stats: { STR: 12, DEX: 9, INT: 2, END: 8, CHA: 3, LUK: 4 }, gold: 25, experience: 40 },
      { level: 18, stats: { STR: 20, DEX: 14, INT: 3, END: 12, CHA: 5, LUK: 5 }, gold: 50, experience: 80 },
      { level: 25, stats: { STR: 28, DEX: 18, INT: 4, END: 18, CHA: 6, LUK: 7 }, gold: 80, experience: 120 },
    ],
  },
];
