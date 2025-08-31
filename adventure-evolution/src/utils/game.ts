import type { Player } from "../state/player";
import { calculateStats } from "./stats";

export function fullHeal(player: Player): Player {
  const stats = calculateStats(player);
  return {
    ...player,
    currentHp: stats.hp,
    currentMp: stats.mp,
    // 🔹 SP NOT reset, stamina is an economy
  };
}

export function saveProgress(player: Player) {
  localStorage.setItem("playerData", JSON.stringify(player));
}

export function loadProgress(): Player | null {
  const data = localStorage.getItem("playerData");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}
