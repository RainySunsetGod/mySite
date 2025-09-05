import type { CoreStats } from "../utils/stats";
import type { Element } from "../modules/elements";

export type EnemyLevelData = {
  level: number;
  stats: CoreStats;
  gold: number;
  experience: number;
};

export type EnemyTemplate = {
  id: string;
  name: string;
  levels: EnemyLevelData[]; // ✅ now each level has its own stats + rewards
  resistances?: Partial<Record<Element, number>>;
};

export type CombatEnemy = {
  id: string;
  name: string;
  level: number;
  stats: CoreStats;
  gold: number;
  experience: number;
  resistances?: Partial<Record<Element, number>>;
  currentHp: number;
  currentMp: number;
  currentSp: number;
  maxHp: number;
  maxMp: number;
  maxSp: number;
};

export const ENEMIES: EnemyTemplate[] = [
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
    id: "wolf",
    name: "Hungry Wolf",
    levels: [
      { level: 5, stats: { STR: 4, DEX: 5, INT: 1, END: 3, CHA: 2, LUK: 2 }, gold: 10, experience: 15 },
      { level: 10, stats: { STR: 6, DEX: 7, INT: 2, END: 5, CHA: 3, LUK: 3 }, gold: 20, experience: 30 },
      { level: 18, stats: { STR: 8, DEX: 9, INT: 3, END: 7, CHA: 4, LUK: 4 }, gold: 35, experience: 60 },
      { level: 25, stats: { STR: 10, DEX: 11, INT: 4, END: 9, CHA: 5, LUK: 5 }, gold: 50, experience: 100 },
    ],
  },
  {
    id: "bandit",
    name: "Bandit",
    levels: [
      { level: 20, stats: { STR: 8, DEX: 7, INT: 2, END: 6, CHA: 3, LUK: 3 }, gold: 40, experience: 80 },
      { level: 28, stats: { STR: 10, DEX: 9, INT: 3, END: 8, CHA: 4, LUK: 4 }, gold: 60, experience: 120 },
      { level: 33, stats: { STR: 12, DEX: 11, INT: 4, END: 10, CHA: 5, LUK: 5 }, gold: 80, experience: 160 },
      { level: 38, stats: { STR: 14, DEX: 13, INT: 5, END: 12, CHA: 6, LUK: 6 }, gold: 100, experience: 200 },
    ],
  },
];
