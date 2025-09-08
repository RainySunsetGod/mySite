import type { EnemyTemplate } from "./types";

export const CULT_OF_THE_SCALE: EnemyTemplate[] = [
    {
        id: "dragon_worshipper",
        name: "Dragon Worshipper",
        element: "Fire",
        levels: [
            { level: 12, stats: { STR: 4, DEX: 5, INT: 3, END: 4, CHA: 2, LUK: 2 }, gold: 10, experience: 20 },
            { level: 20, stats: { STR: 7, DEX: 7, INT: 4, END: 6, CHA: 3, LUK: 3 }, gold: 20, experience: 40 },
            { level: 35, stats: { STR: 12, DEX: 9, INT: 5, END: 9, CHA: 4, LUK: 4 }, gold: 35, experience: 70 },
        ],
    },
    {
        id: "dragon_cultist",
        name: "Dragon Cultist",
        element: "Fire",
        levels: [
            { level: 22, stats: { STR: 10, DEX: 7, INT: 6, END: 8, CHA: 4, LUK: 3 }, gold: 30, experience: 60 },
            { level: 40, stats: { STR: 16, DEX: 11, INT: 8, END: 12, CHA: 5, LUK: 4 }, gold: 60, experience: 120 },
            { level: 55, stats: { STR: 22, DEX: 15, INT: 10, END: 16, CHA: 6, LUK: 5 }, gold: 90, experience: 200 },
            { level: 70, stats: { STR: 28, DEX: 19, INT: 12, END: 20, CHA: 7, LUK: 6 }, gold: 140, experience: 300 },
        ],
    },
    {
        id: "dragon_adept",
        name: "Dragon Adept",
        element: "Fire",
        levels: [
            { level: 32, stats: { STR: 8, DEX: 9, INT: 14, END: 9, CHA: 8, LUK: 4 }, gold: 50, experience: 100 },
            { level: 50, stats: { STR: 12, DEX: 12, INT: 20, END: 12, CHA: 10, LUK: 6 }, gold: 90, experience: 180 },
            { level: 70, stats: { STR: 16, DEX: 14, INT: 28, END: 15, CHA: 12, LUK: 8 }, gold: 150, experience: 280 },
            { level: 100, stats: { STR: 22, DEX: 18, INT: 38, END: 20, CHA: 16, LUK: 10 }, gold: 250, experience: 450 },
        ],
    },
    {
        id: "dragon_priest",
        name: "Dragon Priest",
        element: "Fire",
        levels: [
            { level: 52, stats: { STR: 14, DEX: 12, INT: 24, END: 14, CHA: 12, LUK: 7 }, gold: 120, experience: 250 },
            { level: 80, stats: { STR: 20, DEX: 16, INT: 34, END: 20, CHA: 16, LUK: 10 }, gold: 200, experience: 400 },
            { level: 120, stats: { STR: 28, DEX: 22, INT: 46, END: 28, CHA: 20, LUK: 14 }, gold: 320, experience: 700 },
            { level: 150, stats: { STR: 34, DEX: 26, INT: 58, END: 34, CHA: 24, LUK: 16 }, gold: 450, experience: 1000 },
        ],
    },
    {
        id: "dragon_high_priest",
        name: "Dragon High Priest",
        element: "Fire",
        levels: [
            { level: 100, stats: { STR: 22, DEX: 18, INT: 40, END: 22, CHA: 18, LUK: 12 }, gold: 300, experience: 600 },
            { level: 140, stats: { STR: 34, DEX: 26, INT: 60, END: 32, CHA: 24, LUK: 16 }, gold: 500, experience: 1000 },
            { level: 180, stats: { STR: 46, DEX: 34, INT: 80, END: 42, CHA: 28, LUK: 20 }, gold: 750, experience: 1600 },
            { level: 200, stats: { STR: 55, DEX: 40, INT: 95, END: 50, CHA: 32, LUK: 24 }, gold: 1000, experience: 2200 },
        ],
    },
];
