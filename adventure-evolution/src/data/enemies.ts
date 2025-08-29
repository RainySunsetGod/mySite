import type { CoreStats } from "../utils/stats";

export type EnemyTemplate = {
  id: string;
  name: string;
  level: number;
  stats: CoreStats; // same as player
};

export type CombatEnemy = EnemyTemplate & {
  currentHp: number;
  currentMp: number;
  currentSp: number;
};

export const ENEMIES: EnemyTemplate[] = [
  {
    id: "slime_green",
    name: "Green Slime",
    level: 1,
    stats: {
      STR: 3,
      DEX: 2,
      INT: 1,
      END: 2,
      CHA: 1,
      LUK: 1,
    },
  },
  {
    id: "wolf",
    name: "Hungry Wolf",
    level: 3,
    stats: {
      STR: 6,
      DEX: 5,
      INT: 1,
      END: 4,
      CHA: 2,
      LUK: 2,
    },
  },
  {
    id: "bandit",
    name: "Bandit",
    level: 5,
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
