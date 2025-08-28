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

  // Current values (shrink dynamically in bars)
  currentHp: number;
  currentMp: number;
  currentSp: number;

  // Max values (from stats calculation)
  maxHp: number;
  maxMp: number;
  maxSp: number;

  // Inventory system
  inventory: string[];
  gearView: GearView;

  // Tracks how many duplicates were merged into each item
  merges: Record<string, number>;

  // Tracks how many times each item/spell has been used
  usage: Record<string, number>;

  // Tracks material quantities (crafting mats)
  materials: Record<string, number>;
};

// Example starter player
export const DEFAULT_PLAYER: Player = {
  level: 1,

  // current values
  currentHp: 50,
  currentMp: 20,
  currentSp: 30,

  // max values (you can adjust these or let stats.ts calculate later)
  maxHp: 50,
  maxMp: 20,
  maxSp: 30,

  inventory: ["sword_iron", "spell_fireball", "pet_fireling"],

  gearView: {
    Weapons: ["sword_iron"],
    Armor: [],
    Shields: [],
    Pet: ["pet_fireling"],
    Spells: ["spell_fireball"],
    Misc: [],
  },

  merges: {},
  usage: {},
  materials: {},
};
