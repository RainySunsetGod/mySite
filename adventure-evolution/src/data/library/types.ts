import type { CoreStats } from "../../state/player";
import type { Element } from "../../modules/elements";

export type ContentType = "Weapon" | "Armor" | "Shield" | "Pet" | "Spell" | "Misc";

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

export type ContentItem = {
  id: string;
  name: string;
  type: ContentType;

  // Existing fields
  attackBoost?: number;
  defenseBoost?: number;
  cost?: number;        // for spells
  description?: string; // for spells/misc
  power?: number;       // spells: positive = damage, negative = healing
  special?: string;
  evolution?: {
    requirements: EvolutionRequirement[];
    next: string;
  };
  attackType?: "melee" | "ranged" | "magic";

  // ✅ NEW fields
  element?: Element; // e.g. "Fire" sword, "Ice" spell
  resistances?: Partial<Record<Element, number>>; // e.g. { Fire: 90, Ice: 110 }
  damage?: DamageRange; // weapons: {min, max}
  accuracy?: number; // flat accuracy bonus %
  critBonus?: number; // flat crit chance bonus %

  statModifiers?: Partial<CoreStats>; // e.g. { STR: 2, END: 1 }
  skills?: Skill[];                   // e.g. ["slash", "bash"]
  tags?: string[];                    // e.g. ["starter", "class"]
};
