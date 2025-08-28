export type GearView = {
  Weapons: string[];
  Armor: string[];
  Shields: string[];
  Pet: string[];
  Spells: string[];
  Misc: string[];
};

export type CoreStats = {
  STR: number; // Strength
  DEX: number; // Dexterity
  INT: number; // Intelligence
  END: number; // Endurance
  CHA: number; // Charisma
  LUK: number; // Luck
};

export type Player = {
  level: number;

  // Current values
  currentHp: number;
  currentMp: number;
  currentSp: number;

  // Max values (derived from stats)
  maxHp: number;
  maxMp: number;
  maxSp: number;

  // Trainable stats
  stats: CoreStats;

  // Inventory system
  inventory: string[];
  gearView: GearView;

  // Evolution progression
  merges: Record<string, number>;
  usage: Record<string, number>;
  materials: Record<string, number>;
};

export const DEFAULT_PLAYER: Player = {
  level: 1,

  currentHp: 50,
  currentMp: 20,
  currentSp: 30,

  maxHp: 50,
  maxMp: 20,
  maxSp: 30,

  stats: {
    STR: 5,
    DEX: 5,
    INT: 5,
    END: 5,
    CHA: 5,
    LUK: 5,
  },

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
