export type GearView = {
  Weapons: string[];
  Armor: string[];
  Shields: string[];
  Pet: string[];
  Spells: string[];
  Misc: string[];
};

export type Player = {
  level: number;
  hp: number;

  // All owned items (IDs, like "sword_iron", "misc_potion")
  inventory: string[];

  // Quick access loadout shown in combat
  gearView: GearView;

  // Tracks how many duplicates were merged into each item
  merges: Record<string, number>;

  // Tracks how many times each item/spell has been used
  usage: Record<string, number>;

  // Tracks material quantities (like crafting mats)
  materials: Record<string, number>;
};

// Example starter player
export const DEFAULT_PLAYER: Player = {
  level: 1,
  hp: 100,
  inventory: ["sword_iron", "spell_fireball", "pet_fireling"],
  gearView: {
    Weapons: ["sword_iron"],
    Armor: [],
    Shields: [],
    Pet: ["pet_fireling"],
    Spells: ["spell_fireball"],
    Misc: [],
  },
  merges: {
    // e.g., "sword_iron": 0
  },
  usage: {
    // e.g., "spell_fireball": 0
  },
  materials: {
    // e.g., "misc_fire_crystal": 1
  },
};
