import type { CoreStats } from "../utils/stats";
import type { Element } from "../modules/elements";

export type EnemyTemplate = {
  id: string;
  name: string;
  levels: number[]; // breakpoints
  gold?: number;
  experience?: number;
  stats: CoreStats;
  resistances?: Partial<Record<Element, number>>;
};

// ✅ note: NOT extending EnemyTemplate directly
export type CombatEnemy = {
  id: string;
  name: string;
  level: number; // actual chosen level
  stats: CoreStats;
  gold?: number;
  experience?: number;
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
    levels: [1, 8, 15, 20],
    gold: 5,
    experience: 10,
    stats: {
      STR: 3,
      DEX: 2,
      INT: 1,
      END: 0,
      CHA: 1,
      LUK: 1,
    },
  },
  {
    id: "wolf",
    name: "Hungry Wolf",
    levels: [5, 10, 18, 25],
    stats: {
      STR: 6,
      DEX: 5,
      INT: 1,
      END: 4,
      CHA: 2,
      LUK: 2,
    },
    resistances: { Fire: 150, Ice: 80 },
  },
  {
    id: "bandit",
    name: "Bandit",
    levels: [20, 28, 33, 38],
    stats: {
      STR: 8,
      DEX: 7,
      INT: 2,
      END: 6,
      CHA: 3,
      LUK: 3,
    },
  },
];
