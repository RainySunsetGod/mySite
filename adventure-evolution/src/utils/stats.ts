export type AttackType = "melee" | "ranged" | "magic";

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
  meleeAttack: number;
  rangedAttack: number;
  magicAttack: number;
  critChance: number;
  petPower: number;
};

export function calculateStats(entity: { level: number; stats: CoreStats }): DerivedStats {
  const { STR, DEX, INT, END, CHA, LUK } = entity.stats;

  const hp = 50 + END * 10 + entity.level * 5;
  const mp = 20 + INT * 5 + entity.level * 2;
  const sp = 30 + DEX * 3 + entity.level * 2;

  const meleeAttack = STR * 1.5 + entity.level;
  const rangedAttack = DEX * 1.5 + entity.level;
  const magicAttack = INT * 1.5 + entity.level;

  const critChance = LUK * 0.5 + DEX * 0.2;
  const petPower = CHA * 2;

  return {
    hp,
    mp,
    sp,
    meleeAttack,
    rangedAttack,
    magicAttack,
    critChance,
    petPower,
  };
}

function getMainStatForType(type: AttackType, stats: CoreStats): number {
  switch (type) {
    case "melee": return stats.STR;
    case "ranged": return stats.DEX;
    case "magic": return stats.INT;
  }
}

function getResistanceByType(type: AttackType, stats: CoreStats): number {
  switch (type) {
    case "melee":
      return stats.STR;
    case "ranged":
      return stats.DEX;
    case "magic":
      return stats.INT;
  }
}

export function calculateDamageOutcome(
  attacker: { stats: CoreStats; level: number },
  defender: { stats: CoreStats; level: number },
  type: AttackType
): { hit: boolean; damage: number } {
  const { stats: atkStats, level: atkLevel } = attacker;
  const { stats: defStats, level: defLevel } = defender;

  const mainStat = getMainStatForType(type, atkStats);
  const accuracy = mainStat * 2 + atkStats.LUK + atkLevel;
  const resistance =
    getResistanceByType(type, defStats) * 2 + defStats.LUK + defLevel;

  const hitChance = accuracy - resistance + 50;
  const roll = Math.random() * 100;
  const hit = roll <= hitChance;

  if (!hit) return { hit: false, damage: 0 };

  let baseDamage = 0;
  switch (type) {
    case "melee":
      baseDamage = atkStats.STR * 1.5 + atkLevel;
      break;
    case "ranged":
      baseDamage = atkStats.DEX * 1.5 + atkLevel;
      break;
    case "magic":
      baseDamage = atkStats.INT * 1.5 + atkLevel;
      break;
  }

  const mitigation = defStats.END * 0.75;
  const finalDamage = Math.max(1, Math.round(baseDamage - mitigation));

  return { hit: true, damage: finalDamage };
}
