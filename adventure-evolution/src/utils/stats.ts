import type { Player } from "../state/player";

export type Stats = {
  hp: number; // max HP
  mp: number; // max MP
  sp: number; // max SP
  attack: number;
  defense: number;
  accuracy: number;
  critChance: number;
  petPower: number;
};

export function calculateStats(player: Player): Stats {
  const { STR, DEX, INT, END, CHA, LUK } = player.stats;
  const { level } = player;

  const hp = 50 + END * 5 + level * 2;
  const mp = 20 + INT * 3 + level;
  const sp = 30 + DEX * 2 + level;

  const attack = STR * 2 + DEX + Math.floor(level / 2);
  const defense = END * 2 + DEX;
  const accuracy = 75 + DEX + LUK * 0.5;
  const critChance = Math.min(25, LUK * 0.3); // cap at 25%
  const petPower = CHA * 2;

  return { hp, mp, sp, attack, defense, accuracy, critChance, petPower };
}
