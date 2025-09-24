// src/utils/stats.ts
import type { ContentItem } from "../data/library/types";
import type { Element } from "../modules/elements";

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
    case "melee":
      return stats.STR;
    case "ranged":
      return stats.DEX;
    case "magic":
      return stats.INT;
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
  attacker: { stats: CoreStats; level: number; source?: ContentItem },
  defender: { stats: CoreStats; level: number; resistances?: Partial<Record<Element, number>> },
  type: AttackType,
  element?: Element
): {
  hit: boolean;
  damage: number;
  wasCrit: boolean;
  hitChance: number;
  roll: number;
  debug: string[];
} {
  const { stats: atkStats, level: atkLevel, source } = attacker;
  const { stats: defStats, level: defLevel, resistances } = defender;

  const debug: string[] = [];
  let baseDamage = 0;

  if (source?.type === "Weapon" && source.damage) {
    // Weapon with min–max
    const min = source.damage.min;
    const max = source.damage.max;
    baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
    debug.push(`Rolled weapon damage: ${baseDamage} (${min}-${max})`);
  } else if (source?.type === "Spell" && source.power !== undefined) {
    // Spell with random base power + INT scaling
    const min = Math.floor(source.power * 0.8 + atkStats.INT * 0.5);
    const max = Math.floor(source.power * 1.2 + atkStats.INT * 0.8);
    baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
    debug.push(
      `Spell damage roll: ${baseDamage} (range ${min}-${max}, base power ${source.power}, INT ${atkStats.INT})`
    );
  } else {
    // Stat-based fallback
    let min = 0;
    let max = 0;

    switch (type) {
      case "melee":
        min = Math.floor(atkStats.STR * 1.2 + atkLevel * 0.8);
        max = Math.floor(atkStats.STR * 1.8 + atkLevel * 1.2);
        break;
      case "ranged":
        min = Math.floor(atkStats.DEX * 1.2 + atkLevel * 0.8);
        max = Math.floor(atkStats.DEX * 1.8 + atkLevel * 1.2);
        break;
      case "magic":
        min = Math.floor(atkStats.INT * 1.2 + atkLevel * 0.8);
        max = Math.floor(atkStats.INT * 1.8 + atkLevel * 1.2);
        break;
    }

    baseDamage = Math.floor(Math.random() * (max - min + 1)) + min;
    debug.push(`Stat-based damage roll: ${baseDamage} (${min}-${max})`);
  }

  // Crit chance
  let critChance = 10 + atkStats.LUK * 0.5 + atkStats.DEX * 0.2;
  if (source?.critBonus !== undefined) {
    critChance += source.critBonus;
    debug.push(`Crit bonus applied: +${source.critBonus}`);
  }

  const critRoll = Math.random() * 100;
  const wasCrit = critRoll < critChance;

  if (wasCrit) {
    let finalDamage = Math.floor(baseDamage * 2);
    debug.push(`Critical hit! Roll: ${critRoll.toFixed(1)} < ${critChance.toFixed(1)}`);

    // Apply resistances
    if (element && resistances) {
      const res = resistances[element] ?? 100;
      const adjusted = Math.floor((finalDamage * res) / 100);
      debug.push(`Elemental check: ${element}, res ${res}%. Damage ${finalDamage} → ${adjusted}`);
      finalDamage = Math.max(1, adjusted);
    }

    return { hit: true, damage: finalDamage, wasCrit: true, hitChance: 100, roll: critRoll, debug };
  }

  // Accuracy
  const mainStat = getMainStatForType(type, atkStats);
  let accuracy = mainStat * 2 + atkStats.LUK + atkLevel;
  if (source?.accuracy !== undefined) {
    accuracy += source.accuracy;
    debug.push(`Accuracy bonus applied: +${source.accuracy}`);
  }

  const defenseStat = getResistanceByType(type, defStats);
  const resistanceVal = defenseStat * 2 + defStats.LUK + defLevel;

  const hitChance = accuracy - resistanceVal + 50;
  const roll = Math.random() * 100;
  const hit = roll <= hitChance;

  if (!hit) {
    return { hit: false, damage: 0, wasCrit: false, hitChance, roll, debug };
  }

  // Apply resistance
  let finalDamage = Math.max(1, Math.round(baseDamage));
  if (element && resistances) {
    const res = resistances[element] ?? 100;
    const adjusted = Math.floor((finalDamage * res) / 100);
    debug.push(`Elemental check: ${element}, res ${res}%. Damage ${finalDamage} → ${adjusted}`);
    finalDamage = Math.max(1, adjusted);
  }

  debug.push(`Final damage: ${finalDamage}`);
  return { hit: true, damage: finalDamage, wasCrit: false, hitChance, roll, debug };
}
