import type { Element } from "../modules/elements";


export type GearView = {
  Weapons: string[];
  Armor: string[];
  Shields: string[];
  Pet: string[];
  Spells: string[];
  Misc: string[];
};

export type CoreStats = {
  STR: number; // Strength
  DEX: number; // Dexterity
  INT: number; // Intelligence
  END: number; // Endurance
  CHA: number; // Charisma
  LUK: number; // Luck
};

export type Player = {
  name: string;
  level: number;
  gold: number;
  experience: number;

  // Current values
  currentHp: number;
  currentMp: number;
  currentSp: number;

  // Max values (derived from stats)
  maxHp: number;
  maxMp: number;
  maxSp: number;

  // Trainable stats
  stats: CoreStats;
  unspentPoints: number; // NEW: Track points awaiting allocation

  // Inventory system
  inventory: string[];
  gearView: GearView;

  // Evolution progression
  merges: Record<string, number>;
  usage: Record<string, number>;
  materials: Record<string, number>;

  resistances?: Partial<Record<Element, number>>;
};


export const DEFAULT_PLAYER: Player = {
  name: "Hero",
  level: 1,
  gold: 0,
  experience: 0,
  currentHp: 50,
  currentMp: 20,
  currentSp: 30,
  maxHp: 50,
  maxMp: 20,
  maxSp: 30,
  stats: {
    STR: 0,
    DEX: 0,
    INT: 0,
    END: 0,
    CHA: 0,
    LUK: 0,
  },
  unspentPoints: 5,
  inventory: ["sword_iron", "spell_fireball", "pet_fireling"],
  gearView: {
    Weapons: ["sword_iron"],
    Armor: [],
    Shields: [],
    Pet: ["pet_fireling"],
    Spells: ["spell_fireball"],
    Misc: [],
  },
  merges: {},
  usage: {},
  materials: {},

  // ✅ neutral by default, only overridden by gear/items
  resistances: {},
};


export function allocatePlayerStats(
  player: Player,
  allocation: Partial<CoreStats>
): Player {
  const pointsToSpend = Object.values(allocation).reduce((sum, val) => sum + (val || 0), 0);

  if (pointsToSpend > player.unspentPoints) {
    throw new Error(`Trying to spend ${pointsToSpend}, but only ${player.unspentPoints} available`);
  }

  const updatedStats: CoreStats = {
    STR: player.stats.STR + (allocation.STR || 0),
    DEX: player.stats.DEX + (allocation.DEX || 0),
    INT: player.stats.INT + (allocation.INT || 0),
    END: player.stats.END + (allocation.END || 0),
    CHA: player.stats.CHA + (allocation.CHA || 0),
    LUK: player.stats.LUK + (allocation.LUK || 0),
  };

  return {
    ...player,
    stats: updatedStats,
    unspentPoints: player.unspentPoints - pointsToSpend,
  };
}

export function levelUp(player: Player): Player {
  const newLevel = player.level + 1;

  return {
    ...player,
    level: newLevel,
    unspentPoints: player.unspentPoints + 5,
  };
}

export function resetPlayerStats(player: Player): Player {
  // Total points earned = (level - 1) * 5
  const totalEarned = player.level * 5;

  return {
    ...player,
    stats: {
      STR: 0,
      DEX: 0,
      INT: 0,
      END: 0,
      CHA: 0,
      LUK: 0,
    },
    unspentPoints: totalEarned,
  };
}
