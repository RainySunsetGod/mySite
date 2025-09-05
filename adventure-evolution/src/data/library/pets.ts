import type { ContentItem } from "./types";

export const PETS: ContentItem[] = [
  {
    id: "pet_fireling",
    name: "Fireling",
    type: "Pet",
    evolution: {
      requirements: [{ type: "level", level: 5 }],
      next: "pet_flametail",
    },
  },
  {
    id: "pet_flametail",
    name: "Flametail",
    type: "Pet",
    evolution: {
      requirements: [{ type: "level", level: 10 }],
      next: "pet_infernodon",
    },
  },
  {
    id: "pet_infernodon",
    name: "Infernodon",
    type: "Pet",
  },
];
