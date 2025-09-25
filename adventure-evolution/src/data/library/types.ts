// src/data/library/types.ts
import type { CoreStats } from "../../state/player";
import type { Element } from "../../modules/elements";

export type ContentType =
  | "Weapon"
  | "Armor"
  | "Shield"
  | "Pet"
  | "Spell"
  | "Misc"
  | "Skill"
  | "Guest";

export type Skill = {
  id: string;
  name: string;
  description?: string;
};

export type EvolutionRequirement =
  | { type: "level"; level: number }
  | { type: "merge"; count: number }
  | { type: "material"; itemId: string; amount: number }
  | { type: "usage"; uses: number };

export type DamageRange = {
  min: number;
  max: number;
};

export type ResourceCost = {
  type: "MP" | "SP" | "HP";
  amount: number;
};

export type ContentItem = {
  id: string;
  name: string;
  type: ContentType;

  description?: string;
  element?: Element; // elemental affinity
  power?: number; // spells/skills base power
  attackType?: "melee" | "ranged" | "magic";

  costs?: ResourceCost[]; // flexible cost system

  evolution?: {
    requirements: EvolutionRequirement[];
    next: string;
  };

  special?: string; // e.g. "summon:guest_knight"

  resistances?: Partial<Record<Element, number>>; // e.g. { Fire: 90, Ice: 110 }
  damage?: DamageRange;
  accuracy?: number;
  critBonus?: number;

  statModifiers?: Partial<CoreStats>;
  skills?: Skill[]; // e.g. special abilities granted by armor
  tags?: string[]; // e.g. ["starter", "class"]
};
