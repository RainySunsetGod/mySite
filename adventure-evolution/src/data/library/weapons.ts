import type { ContentItem } from "./types";

export const WEAPONS: ContentItem[] = [
  { id: "sword_iron", name: "Iron Sword", type: "Weapon", attackBoost: 5, evolvesAt: 5, nextEvolution: "sword_steel" },
  { id: "sword_steel", name: "Steel Sword", type: "Weapon", attackBoost: 9, evolvesAt: 10, nextEvolution: "sword_flame" },
  { id: "sword_flame", name: "Flame Blade", type: "Weapon", attackBoost: 14, evolvesAt: null, nextEvolution: null },
];
