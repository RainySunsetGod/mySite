import type { Player } from "../state/player";
import { calculateStats } from "./stats";

export function fullHeal(player: Player): Player {
  const stats = calculateStats(player);
  return {
    ...player,
    currentHp: stats.hp,
    currentMp: stats.mp,
    // ❌ Do not reset SP here (keeps stamina economy intact)
  };
}

// Save player to localStorage
export function saveProgress(player: Player) {
  localStorage.setItem("playerData", JSON.stringify(player));
}

// Load player from localStorage
export function loadProgress(): Player | null {
  const data = localStorage.getItem("playerData");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
