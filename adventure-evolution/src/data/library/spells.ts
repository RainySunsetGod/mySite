import type { ContentItem } from "./types";

export const SPELLS: ContentItem[] = [
  { id: "spell_fireball", name: "Fireball", type: "Spell", cost: 5, description: "Hurl a blazing fireball.", power: 15, evolvesAt: 10, nextEvolution: "spell_firestorm" },
  { id: "spell_firestorm", name: "Firestorm", type: "Spell", cost: 12, description: "Engulf battlefield in flames.", power: 35, evolvesAt: null, nextEvolution: null },
  { id: "spell_heal", name: "Heal", type: "Spell", cost: 8, description: "Restore 20 HP.", power: -20, evolvesAt: 12, nextEvolution: "spell_greater_heal" },
  { id: "spell_greater_heal", name: "Greater Heal", type: "Spell", cost: 16, description: "Restore 50 HP.", power: -50, evolvesAt: null, nextEvolution: null },
];
