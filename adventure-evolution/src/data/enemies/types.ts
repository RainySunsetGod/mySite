// src/data/enemies/types.ts
import type { CoreStats } from "../../utils/stats";
import type { Element, ElementKey } from "../../modules/elements";

export type EnemyLevelData = {
  level: number;
  stats: CoreStats;
  gold: number;
  experience: number;
};

export type EnemyTemplate = {
  id: string;
  name: string;
  element?: Element; // ✅ default attack element
  attackType?: "melee" | "ranged" | "magic"; // ✅ attack style
  levels: EnemyLevelData[];
  resistances?: Partial<Record<ElementKey, number>>;
};

// ✅ CombatEnemy is now a snapshot, no `levels[]`
export type CombatEnemy = {
  id: string;
  name: string;
  element?: Element;
  attackType?: "melee" | "ranged" | "magic";
  level: number;
  stats: CoreStats;
  gold: number;
  experience: number;
  resistances?: Partial<Record<ElementKey, number>>;
  currentHp: number;
  currentMp: number;
  currentSp: number;
  maxHp: number;
  maxMp: number;
  maxSp: number;
};
