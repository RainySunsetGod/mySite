// guests.ts
import type { ContentItem } from "./types";

export const GUESTS: ContentItem[] = [
  {
    id: "guest_knight",
    name: "Knight of Dawn",
    type: "Guest",
    damage: { min: 12, max: 18 },
    element: "Light",
    costs: [
      { type: "SP", amount: 5 }
    ],
    description: "A knight ally that fights by your side until dismissed or resources run out.",
  },
];
