import type { CoreStats } from "../../state/player"; // Make sure this import is valid

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
  
  // ✅ NEW fields (optional, won’t break existing items)
  statModifiers?: Partial<CoreStats>; // e.g. { STR: 2, END: 1 }
  skills?: Skill[];                  // e.g. ["slash", "bash"]
  tags?: string[];                    // e.g. ["starter", "class"]
};
