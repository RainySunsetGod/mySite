import type { EnemyTemplate } from "./types";

export const SLIMES: EnemyTemplate[] = [
  {
    id: "slime_green",
    name: "Green Slime",
    levels: [
      { level: 1, stats: { STR: 3, DEX: 2, INT: 1, END: 0, CHA: 1, LUK: 1 }, gold: 5, experience: 10 },
      { level: 8, stats: { STR: 6, DEX: 4, INT: 2, END: 3, CHA: 2, LUK: 2 }, gold: 15, experience: 25 },
      { level: 15, stats: { STR: 10, DEX: 7, INT: 3, END: 6, CHA: 3, LUK: 3 }, gold: 30, experience: 50 },
      { level: 20, stats: { STR: 14, DEX: 9, INT: 4, END: 8, CHA: 4, LUK: 4 }, gold: 50, experience: 80 },
    ],
  },
  {
    id: "slime_blue",
    name: "Blue Slime",
    levels: [
      { level: 5, stats: { STR: 5, DEX: 3, INT: 2, END: 2, CHA: 1, LUK: 2 }, gold: 8, experience: 12 },
      { level: 12, stats: { STR: 9, DEX: 6, INT: 3, END: 5, CHA: 2, LUK: 3 }, gold: 20, experience: 35 },
      { level: 18, stats: { STR: 14, DEX: 9, INT: 4, END: 7, CHA: 3, LUK: 4 }, gold: 35, experience: 60 },
    ],
  },
];
