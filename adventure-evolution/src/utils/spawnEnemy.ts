import { ENEMIES } from "../data/enemies";
import type { EnemyTemplate, CombatEnemy } from "../data/enemies/types";
import { calculateStats } from "./stats";

/**
 * Spawn a combat-ready enemy from a template + player level.
 */
export function spawnEnemy(template: EnemyTemplate, playerLevel: number): CombatEnemy {
  const MAX_LEVEL_DIFF = 5; // how far enemy level can be from player

  // First filter for breakpoints within range
  const candidates = template.levels.filter(lvlData =>
    Math.abs(lvlData.level - playerLevel) <= MAX_LEVEL_DIFF
  );

  // If no close candidates, fallback to the closest overall
  const chosen = (candidates.length > 0 ? candidates : template.levels).reduce(
    (best, data) =>
      Math.abs(data.level - playerLevel) < Math.abs(best.level - playerLevel) ? data : best,
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
  const MAX_LEVEL_DIFF = 5; // same tolerance as above

  // Only choose templates that have at least one eligible level
  const validTemplates = ENEMIES.filter(template =>
    template.levels.some(lvlData =>
      Math.abs(lvlData.level - playerLevel) <= MAX_LEVEL_DIFF
    )
  );

  // If none are valid, fallback to all enemies (prevents empty list)
  const pool = validTemplates.length > 0 ? validTemplates : ENEMIES;

  const template = pool[Math.floor(Math.random() * pool.length)];
  return spawnEnemy(template, playerLevel);
}
