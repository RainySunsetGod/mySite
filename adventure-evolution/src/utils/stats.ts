export type CoreStats = {
  STR: number;
  DEX: number;
  INT: number;
  END: number;
  CHA: number;
  LUK: number;
};

export type DerivedStats = {
  hp: number;
  mp: number;
  sp: number;
  attack: number;
  defense: number;
  accuracy: number;
  critChance: number;
  petPower: number;
};

export function calculateStats(entity: { level: number; stats: CoreStats }): DerivedStats {
  const { STR, DEX, INT, END, CHA, LUK } = entity.stats;

  const hp = 50 + END * 10 + entity.level * 5;
  const mp = 20 + INT * 5 + entity.level * 2;
  const sp = 30 + DEX * 3 + entity.level * 2;

  const attack = STR * 2 + DEX + entity.level;
  const defense = END * 2 + DEX + entity.level;
  const accuracy = 70 + DEX * 2 + LUK;
  const critChance = LUK * 0.5 + DEX * 0.2;
  const petPower = CHA * 2;

  return { hp, mp, sp, attack, defense, accuracy, critChance, petPower };
}
