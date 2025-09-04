// utils/stats.ts
import type { ContentItem } from "../data/library/types";

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

  const meleeAttack = STR * 2 + entity.level;
  const rangedAttack = DEX * 1.5 + entity.level;
  const magicAttack = INT * 1.2 + entity.level;

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
    case "melee": return stats.STR;
    case "ranged": return stats.DEX;
    case "magic": return stats.INT;
  }
}

export function calculateDamageOutcome(
  attacker: { stats: CoreStats; level: number; weapon?: ContentItem },
  defender: { stats: CoreStats; level: number },
  type: AttackType
): {
  hit: boolean;
  damage: number;
  wasCrit: boolean;
  hitChance: number;
  roll: number;
  debug: string[];
} {
  const { stats: atkStats, level: atkLevel, weapon } = attacker;
  const { stats: defStats, level: defLevel } = defender;

  const debug: string[] = [];

  // === Accuracy Calculation ===
  const mainStat = getMainStatForType(type, atkStats);
  let accuracy = mainStat * 2 + atkStats.LUK + atkLevel;

  if (weapon?.accuracy !== undefined) {
    accuracy += weapon.accuracy; // ✅ Apply weapon bonus
    debug.push(`Weapon accuracy bonus applied: +${weapon.accuracy}`);
  }

  const defenseStat = getResistanceByType(type, defStats);
  const resistance = defenseStat * 2 + defStats.LUK + defLevel;

  const hitChance = accuracy - resistance + 50;
  const roll = Math.random() * 100;
  const hit = roll <= hitChance;

  debug.push(`Final hit chance: ${hitChance.toFixed(1)}%, roll: ${roll.toFixed(1)}`);

  if (!hit) {
    return {
      hit: false,
      damage: 0,
      wasCrit: false,
      hitChance,
      roll,
      debug,
    };
  }

  // === Damage Calculation ===
  let baseDamage = 0;
  if (weapon?.damage) {
    const min = weapon.damage.min;
    const max = weapon.damage.max;
    baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
    debug.push(`Rolled weapon damage: ${baseDamage} (${min}-${max})`);
  } else {
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
    debug.push(`Base stat damage: ${baseDamage}`);
  }

  // === Critical Check ===
  let critChance = atkStats.LUK * 0.5 + atkStats.DEX * 0.2;
  if (weapon?.critBonus !== undefined) {
    critChance += weapon.critBonus; // ✅ Apply weapon crit bonus
    debug.push(`Weapon crit bonus applied: +${weapon.critBonus}`);
  }

  const critRoll = Math.random() * 100;
  const wasCrit = critRoll < critChance;

  if (wasCrit) {
    baseDamage = Math.floor(baseDamage * 1.5);
    debug.push(`Critical hit! Roll: ${critRoll.toFixed(1)} < ${critChance.toFixed(1)}`);
  } else {
    debug.push(`No crit. Roll: ${critRoll.toFixed(1)} vs ${critChance.toFixed(1)}`);
  }

  const finalDamage = Math.max(1, Math.round(baseDamage));

  debug.push(`Final damage dealt: ${finalDamage}`);

  return {
    hit: true,
    damage: finalDamage,
    wasCrit,
    hitChance,
    roll,
    debug,
  };
}
