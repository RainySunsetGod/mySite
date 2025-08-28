export type ContentType = "Weapon" | "Armor" | "Shield" | "Pet" | "Spell" | "Misc";

export type ContentItem = {
  id: string;
  name: string;
  type: ContentType;
  attackBoost?: number;
  defenseBoost?: number;
  cost?: number; // for spells
  description?: string;
  power?: number; // positive = damage, negative = healing
  evolvesAt?: number | null;
  nextEvolution?: string | null;
  special?: string;
};
