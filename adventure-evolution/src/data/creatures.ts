export type Creature = {
  id: string;
  name: string;
  level: number;
  maxHP: number;
  attack: number;
  evolvesAt: number | null;
  nextEvolution: string | null;
};

// Example database of creatures
export const creatures: Record<string, Creature> = {
  // 🔥 Fire Line
  fireling: {
    id: "fireling",
    name: "Fireling",
    level: 1,
    maxHP: 20,
    attack: 5,
    evolvesAt: 5,
    nextEvolution: "flametail",
  },
  flametail: {
    id: "flametail",
    name: "Flametail",
    level: 5,
    maxHP: 40,
    attack: 10,
    evolvesAt: 10,
    nextEvolution: "infernodon",
  },
  infernodon: {
    id: "infernodon",
    name: "Infernodon",
    level: 10,
    maxHP: 80,
    attack: 20,
    evolvesAt: null,
    nextEvolution: null,
  },

  // 🌱 Grass Line
  sprouty: {
    id: "sprouty",
    name: "Sprouty",
    level: 1,
    maxHP: 18,
    attack: 4,
    evolvesAt: 4,
    nextEvolution: "leafara",
  },
  leafara: {
    id: "leafara",
    name: "Leafara",
    level: 4,
    maxHP: 35,
    attack: 9,
    evolvesAt: 8,
    nextEvolution: "verdantis",
  },
  verdantis: {
    id: "verdantis",
    name: "Verdantis",
    level: 8,
    maxHP: 70,
    attack: 18,
    evolvesAt: null,
    nextEvolution: null,
  },
};
