import type { Player, CoreStats } from "../state/player";

/**
 * Allocate stat points for a player.
 */
export function allocatePlayerStats(
  player: Player,
  allocation: Partial<CoreStats>
): Player {
  const totalSpent = Object.values(allocation).reduce((sum, val) => sum + (val || 0), 0);

  if (totalSpent > player.unspentPoints) {
    throw new Error(`Trying to spend ${totalSpent}, but only ${player.unspentPoints} available`);
  }

  const newStats: CoreStats = {
    STR: player.stats.STR + (allocation.STR || 0),
    DEX: player.stats.DEX + (allocation.DEX || 0),
    INT: player.stats.INT + (allocation.INT || 0),
    END: player.stats.END + (allocation.END || 0),
    CHA: player.stats.CHA + (allocation.CHA || 0),
    LUK: player.stats.LUK + (allocation.LUK || 0),
  };

  return {
    ...player,
    stats: newStats,
    unspentPoints: player.unspentPoints - totalSpent,
  };
}

/**
 * Level up and grant 5 new stat points.
 */
export function levelUpPlayer(player: Player): Player {
  return {
    ...player,
    level: player.level + 1,
    unspentPoints: player.unspentPoints + 5,
  };
}
