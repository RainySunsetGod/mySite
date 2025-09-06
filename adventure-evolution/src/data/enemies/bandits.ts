import type { EnemyTemplate } from "./types";

export const BANDITS: EnemyTemplate[] = [
    {
        id: "bandit",
        name: "Bandit",
        element: "Earth",
        levels: [
            { level: 20, stats: { STR: 8, DEX: 7, INT: 2, END: 6, CHA: 3, LUK: 3 }, gold: 30, experience: 50 },
            { level: 28, stats: { STR: 12, DEX: 10, INT: 3, END: 9, CHA: 4, LUK: 5 }, gold: 50, experience: 90 },
            { level: 33, stats: { STR: 16, DEX: 13, INT: 4, END: 12, CHA: 5, LUK: 6 }, gold: 80, experience: 150 },
            { level: 38, stats: { STR: 20, DEX: 16, INT: 5, END: 15, CHA: 6, LUK: 7 }, gold: 120, experience: 200 },
        ],
    },
    {
        id: "bandit2",
        name: "Bandit Leader",
        element: "Earth",
        levels: [
            { level: 40, stats: { STR: 8, DEX: 7, INT: 2, END: 6, CHA: 3, LUK: 3 }, gold: 30, experience: 50 },
            { level: 48, stats: { STR: 12, DEX: 10, INT: 3, END: 9, CHA: 4, LUK: 5 }, gold: 50, experience: 90 },
            { level: 53, stats: { STR: 16, DEX: 13, INT: 4, END: 12, CHA: 5, LUK: 6 }, gold: 80, experience: 150 },
        ],
    },
    {
        id: "bandit3",
        name: "Bandit Squad",
        element: "Earth",
        levels: [
            { level: 30, stats: { STR: 8, DEX: 7, INT: 2, END: 6, CHA: 3, LUK: 3 }, gold: 30, experience: 50 },
            { level: 38, stats: { STR: 12, DEX: 10, INT: 3, END: 9, CHA: 4, LUK: 5 }, gold: 50, experience: 90 },
            { level: 43, stats: { STR: 16, DEX: 13, INT: 4, END: 12, CHA: 5, LUK: 6 }, gold: 80, experience: 150 },
        ],
    },
];
