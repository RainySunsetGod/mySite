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
  inventory: string[]; // all owned item IDs
  gearView: GearView;  // subset shown in combat
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
};
