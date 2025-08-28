import type { Player } from "../state/player";
import { getContent } from "../data/library";
import type { ContentItem } from "../data/library/types";

export type Stats = {
  hp: number; // max HP
  mp: number; // max MP
  sp: number; // max SP
  attack: number;
  defense: number;
};

function baseStats(level: number): Stats {
  return {
    hp: 50 + level * 10,
    mp: 20 + level * 5,
    sp: 30 + level * 5,
    attack: 5 + level * 2,
    defense: 2 + level * 2,
  };
}


/**
 * Compute total stats for a player, including gear bonuses.
 */
export function calculateStats(player: Player): Stats {
  const stats = baseStats(player.level); // ✅ const instead of let

  const applyGear = (id: string | null) => {
    if (!id) return;
    const item: ContentItem | undefined = getContent(id);
    if (!item) return;

    if (item.attackBoost) stats.attack += item.attackBoost;
    if (item.defenseBoost) stats.defense += item.defenseBoost;

    // Example: pets give bonus attack
    if (item.type === "Pet" && item.attackBoost) {
      stats.attack += item.attackBoost;
    }
  };

  // ✅ Use gearView instead of equipped
  player.gearView.Weapons.forEach(applyGear);
  player.gearView.Armor.forEach(applyGear);
  player.gearView.Shields.forEach(applyGear);
  player.gearView.Pet.forEach(applyGear);

  return stats;
}
