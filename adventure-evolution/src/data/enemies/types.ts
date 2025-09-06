import type { CoreStats } from "../../utils/stats";
import type { Element } from "../../modules/elements";

export type EnemyLevelData = {
  level: number;
  stats: CoreStats;
  gold: number;
  experience: number;
};

export type EnemyTemplate = {
  id: string;
  name: string;
  levels: EnemyLevelData[]; // breakpoints
  resistances?: Partial<Record<Element, number>>;
};

export type CombatEnemy = {
  id: string;
  name: string;
  level: number; // chosen variant
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
