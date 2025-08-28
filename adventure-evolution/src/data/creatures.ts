import type { ContentItem } from "./library/types";

export const PETS: ContentItem[] = [
    {
        id: "pet_fireling",
        name: "Fireling",
        type: "Pet",
        attackBoost: 3,
        evolvesAt: 5,
        nextEvolution: "pet_flametail",
    },
    {
        id: "pet_flametail",
        name: "Flametail",
        type: "Pet",
        attackBoost: 6,
        evolvesAt: 10,
        nextEvolution: "pet_infernodon",
    },
    {
        id: "pet_infernodon",
        name: "Infernodon",
        type: "Pet",
        attackBoost: 12,
        evolvesAt: null,
        nextEvolution: null,
    },
];
