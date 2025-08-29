export type EnemyTemplate = {
  id: string;
  name: string;
  maxHp: number;
  maxMp: number;
  maxSp: number;
  attack: number;
  defense: number;
};

export type CombatEnemy = EnemyTemplate & {
  currentHp: number;
  currentMp: number;
  currentSp: number;
};

export const ENEMIES: EnemyTemplate[] = [
  {
    id: "slime_green",
    name: "Green Slime",
    maxHp: 40,
    maxMp: 10,
    maxSp: 20,
    attack: 5,
    defense: 2,
  },
  {
    id: "wolf",
    name: "Hungry Wolf",
    maxHp: 60,
    maxMp: 15,
    maxSp: 30,
    attack: 8,
    defense: 3,
  },
  {
    id: "bandit",
    name: "Bandit",
    maxHp: 80,
    maxMp: 20,
    maxSp: 40,
    attack: 10,
    defense: 5,
  },
];
