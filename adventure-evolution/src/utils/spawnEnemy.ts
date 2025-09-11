import { ENEMIES } from "../data/enemies";
import type { EnemyTemplate, CombatEnemy } from "../data/enemies/types";
import { calculateStats } from "./stats";

/**
 * Spawn a combat-ready enemy from a template + player level.
 */
export function spawnEnemy(template: EnemyTemplate, playerLevel: number): CombatEnemy {
  // Pick the highest breakpoint <= playerLevel
  const chosen = template.levels.reduce((best, data) =>
    data.level <= playerLevel ? data : best,
    template.levels[0]
  );

  const derived = calculateStats({ level: chosen.level, stats: chosen.stats });

  return {
    id: `${template.id}_lv${chosen.level}`,
    name: template.name,
    element: template.element,
    level: chosen.level,
    stats: chosen.stats,
    gold: chosen.gold,
    experience: chosen.experience,
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
