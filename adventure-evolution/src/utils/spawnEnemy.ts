import { ENEMIES, type EnemyTemplate, type CombatEnemy } from "../data/enemies";
import { calculateStats } from "./stats";

/**
 * Spawn a combat-ready enemy instance from a template.
 */
export function spawnEnemy(template: EnemyTemplate, playerLevel: number): CombatEnemy {
  // Pick the highest breakpoint <= playerLevel
  const level = template.levels.reduce((best: number, lv: number) => {
    return lv <= playerLevel ? lv : best;
  }, template.levels[0]);

  const derived = calculateStats({ level, stats: template.stats });

  return {
    id: `${template.id}_lv${level}`,
    name: template.name,
    level,
    stats: template.stats,
    gold: template.gold,
    experience: template.experience,
    resistances: template.resistances,
    currentHp: derived.hp,
    currentMp: derived.mp,
    currentSp: derived.sp,
    maxHp: derived.hp,
    maxMp: derived.mp,
    maxSp: derived.sp,
  };
}

/**
 * Spawn a random enemy for the given player level.
 */
export function spawnRandomEnemy(playerLevel: number): CombatEnemy {
  const template = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
  return spawnEnemy(template, playerLevel);
}
