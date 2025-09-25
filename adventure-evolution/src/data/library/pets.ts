import type { ContentItem } from "./types";

export const PETS: ContentItem[] = [
  {
    id: "pet_wolf",
    name: "Wolf Pup",
    type: "Pet",
    damage: { min: 3, max: 6 },
    element: "Earth",
    description: "A loyal wolf pup that bites enemies every turn.",
  },
  {
    id: "pet_fairy",
    name: "Healing Fairy",
    type: "Pet",
    skills: [
      { id: "heal-small", name: "Minor Heal", description: "Heals the player slightly." },
    ],
    description: "A tiny fairy that heals you during combat.",
  },
];
