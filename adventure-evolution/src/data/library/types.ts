export type ContentType = "Weapon" | "Armor" | "Shield" | "Pet" | "Spell" | "Misc";

export type EvolutionRequirement =
  | { type: "level"; level: number }
  | { type: "merge"; count: number }
  | { type: "material"; itemId: string; amount: number }
  | { type: "usage"; uses: number };

export type ContentItem = {
  id: string;
  name: string;
  type: ContentType;
  attackBoost?: number;
  defenseBoost?: number;
  cost?: number;        // for spells
  description?: string; // for spells/misc
  power?: number;       // spells: positive = damage, negative = healing
  special?: string;
  evolution?: {
    requirements: EvolutionRequirement[];
    next: string; // id of evolved form
  };
};
