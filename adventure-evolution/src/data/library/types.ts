import type { CoreStats } from "../../state/player";
import type { Element } from "../../modules/elements";

export type ContentType =
  | "Weapon"
  | "Armor"
  | "Shield"
  | "Pet"
  | "Spell"
  | "Misc";

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

export type ContentItem = {
  id: string;
  name: string;
  type: ContentType;

  description?: string;
  special?: string;

  evolution?: {
    requirements: EvolutionRequirement[];
    next: string;
  };

  // Offensive gear
  attackType?: "melee" | "ranged" | "magic";
  element?: Element;
  damage?: { min: number; max: number }; // ✅ Weapon/spell damage range
  accuracy?: number;  // bonus hit chance %
  critBonus?: number; // bonus crit chance %

  // Defensive gear
  resistances?: Partial<Record<Element, number>>; // e.g. { Fire: 90, Ice: 110 }

  // Spells
  power?: number; // positive = damage, negative = healing
  cost?: number;  // MP cost

  // Other
  statModifiers?: Partial<CoreStats>;
  skills?: Skill[];
  tags?: string[];
};
