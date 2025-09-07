import type { EnemyTemplate } from "./types";

export const VAMPIRES: EnemyTemplate[] = [
    {
        id: "vampire_basic",
        name: "Vampire Fledgling",
        element: "Darkness",
        levels: [
            { level: 10, stats: { STR: 5, DEX: 5, INT: 20, END: 0, CHA: 20, LUK: 0 }, gold: 20, experience: 30 },
            { level: 14, stats: { STR: 10, DEX: 10, INT: 25, END: 0, CHA: 25, LUK: 0 }, gold: 40, experience: 60 },
            { level: 18, stats: { STR: 15, DEX: 15, INT: 30, END: 0, CHA: 30, LUK: 0 }, gold: 60, experience: 90 },
            { level: 22, stats: { STR: 20, DEX: 20, INT: 35, END: 0, CHA: 35, LUK: 0 }, gold: 80, experience: 120 },
        ],
    }
]